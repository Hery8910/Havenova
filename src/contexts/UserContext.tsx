"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import api from "../services/api";
import { v4 as uuidv4 } from "uuid";
import { logoutUser } from "../services/userService";
import { ServiceRequestItem } from "../types/services";
import { User } from "../types/User";
import { getCalendarAdmin, getCalendarGuest } from "../services/calendar";
import { useClient } from "./ClientContext";

const USER_KEY = "havenova_user";

function getRandomAvatarPath(): string {
  const number = Math.floor(Math.random() * 10) + 1;
  return `/avatars/avatar-${number}.svg`;
}

function getPersistentGuestAvatar(): string {
  if (typeof window === "undefined") return "/avatars/avatar-1.svg";
  const key = "guest_avatar";
  let avatar = localStorage.getItem(key);
  if (!avatar) {
    avatar = getRandomAvatarPath();
    localStorage.setItem(key, avatar);
  }
  return avatar;
}

function saveUserToStorage(user: User) {
  const userToSave = { ...user, isFromBackend: user.isFromBackend ?? false };
  localStorage.setItem(USER_KEY, JSON.stringify(userToSave));
}

function getUserFromStorage(): User | null {
  const data = localStorage.getItem(USER_KEY);
  if (data) {
    try {
      const user = JSON.parse(data);
      if (user && user.createdAt) {
        user.createdAt = new Date(user.createdAt);
      }
      return user;
    } catch {
      return null;
    }
  }
  return null;
}

function clearUserFromStorage() {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem("guest_avatar");
}

export const initialGuestUser: User = {
  _id: "",
  name: "",
  email: "",
  isVerified: false,
  role: "guest",
  address: "",
  phone: "",
  profileImage: "",
  requests: [],
  createdAt: new Date(),
  isFromBackend: false,
};

interface UserContextProps {
  user: User;
  setUser: (user: User) => void;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
  addRequestToUser: (newRequest: ServiceRequestItem) => void;
  removeRequestFromUser: (id: string) => void;
  clearAllRequests: () => void;
}

interface CalendarData {
  year: number;
  months: any[];
}

interface CalendarContextProps {
  calendars: { [year: number]: CalendarData };
  currentYear: number;
  setCurrentYear: (year: number) => void;
  fetchCalendar: (year: number) => Promise<void>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);
const CalendarContext = createContext<CalendarContextProps | undefined>(
  undefined
);

interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardProvider = ({ children }: DashboardProviderProps) => {
  const { client } = useClient();
  const clientId = client?._id;
  const [user, setUser] = useState<User>(() => {
    if (typeof window !== "undefined") {
      return (
        getUserFromStorage() || {
          ...initialGuestUser,
          isFromBackend: false,
          profileImage: getPersistentGuestAvatar(),
        }
      );
    }
    return initialGuestUser;
  });

  const [calendars, setCalendars] = useState<{ [year: number]: CalendarData }>(
    {}
  );
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );

  const refreshUser = useCallback(async () => {
    try {
      const response = await api.get("/api/users/profile");
      if (response.data) {
        const backendUser = { ...response.data, isFromBackend: true };
        setUser(backendUser);
        saveUserToStorage(backendUser);
      } else {
        const fallback = getUserFromStorage() || {
          ...initialGuestUser,
          profileImage: getPersistentGuestAvatar(),
          isFromBackend: false,
        };
        setUser(fallback);
        saveUserToStorage(fallback);
      }
    } catch {
      const fallback = getUserFromStorage() || {
        ...initialGuestUser,
        profileImage: getPersistentGuestAvatar(),
        isFromBackend: false,
      };
      setUser(fallback);
      saveUserToStorage(fallback);
    }
  }, []);

  const fetchCalendar = useCallback(
    async (year: number) => {
      if (clientId)
        try {
          let data;
          if (user.role === "admin") {
            data = await getCalendarAdmin(year, clientId);
          } else {
            data = await getCalendarGuest(year, clientId);
          }
          setCalendars((prev) => ({ ...prev, [year]: data }));
        } catch (error) {
          console.error("Error fetching calendar:", error);
        }
    },
    [user.role, clientId]
  );

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  useEffect(() => {
    if (user) fetchCalendar(currentYear);
  }, [user, currentYear, fetchCalendar]);

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      console.log("Clearing storage and setting guest user...");
      clearUserFromStorage();

      const guestUser = {
        ...initialGuestUser,
        profileImage: getPersistentGuestAvatar(),
        isFromBackend: false,
      };

      setUser(guestUser);
      saveUserToStorage(guestUser);

      console.log("User set to guest:", guestUser);
      console.log("LocalStorage now:", localStorage.getItem("havenova_user"));
    }
  };

  const addRequestToUser = (newRequest: ServiceRequestItem) => {
    const requestWithId = { ...newRequest, id: uuidv4() };
    setUser((prev) => {
      const updated = {
        ...prev,
        requests: [...(prev.requests || []), requestWithId],
      };
      saveUserToStorage(updated);
      return updated;
    });
  };

  const removeRequestFromUser = (id: string) => {
    setUser((prev) => {
      const updated = {
        ...prev,
        requests: prev.requests.filter(
          (req: ServiceRequestItem) => req.id !== id
        ),
      };
      saveUserToStorage(updated);
      return updated;
    });
  };

  const clearAllRequests = () => {
    setUser((prev) => {
      const updated = { ...prev, requests: [] };
      saveUserToStorage(updated);
      return updated;
    });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        refreshUser,
        logout,
        addRequestToUser,
        removeRequestFromUser,
        clearAllRequests,
      }}
    >
      <CalendarContext.Provider
        value={{ calendars, currentYear, setCurrentYear, fetchCalendar }}
      >
        {children}
      </CalendarContext.Provider>
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a DashboardProvider");
  }
  return context;
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error("useCalendar must be used within a DashboardProvider");
  }
  return context;
};
