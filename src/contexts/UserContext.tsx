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
import { getCalendarAdmin, getCalendarGuest } from "../services/dashboard";
import { logoutUser } from "../services/userService";
import { ServiceRequestItem } from "../types/services";
import { User } from "../types/User";

// ---- Utilidades para localStorage ----
const USER_KEY = "havenova_user";

function getRandomAvatarNumber(): number {
  return Math.floor(Math.random() * 10) + 1;
}
function getRandomAvatarPath(): string {
  const number = getRandomAvatarNumber();
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
  localStorage.setItem(USER_KEY, JSON.stringify(user));
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

// ---- Usuario inicial guest ----
export const initialGuestUser: User = {
  _id: "",
  name: "Guest",
  email: "",
  isVerified: false,
  role: "guest",
  address: "",
  phone: "",
  profileImage:
    typeof window !== "undefined"
      ? getPersistentGuestAvatar()
      : "/avatars/avatar-1.svg",
  requests: [],
  createdAt: new Date(),
};

// ---- Context Types ----
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
  months: any[]; // Mejor definir tu tipo de calendario
}
interface CalendarContextProps {
  calendars: { [year: number]: CalendarData };
  currentYear: number;
  setCurrentYear: (year: number) => void;
  fetchCalendar: (year: number) => Promise<void>;
}

// ---- CREACIÓN DE CONTEXTOS ----
const UserContext = createContext<UserContextProps | undefined>(undefined);
const CalendarContext = createContext<CalendarContextProps | undefined>(
  undefined
);

// ---- PROVEEDOR COMBINADO ----
interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardProvider = ({ children }: DashboardProviderProps) => {
  // ---- Inicializa el usuario desde localStorage o como guest ----
  const [user, setUser] = useState<User>(() => {
    if (typeof window !== "undefined") {
      return getUserFromStorage() || initialGuestUser;
    }
    return initialGuestUser;
  });

  const [calendars, setCalendars] = useState<{ [year: number]: CalendarData }>(
    {}
  );
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );

  // ---- Sincroniza siempre el usuario guest en localStorage ----
  useEffect(() => {
    if (typeof window !== "undefined" && user.role === "guest") {
      saveUserToStorage(user);
    }
  }, [user]);

  const refreshUser = useCallback(async () => {
    try {
      const response = await api.get("/api/users/profile");
      if (response.data) {
        setUser(response.data); // usuario logeado: sin modificar
      } else {
        // usuario guest
        setUser(getUserFromStorage() || initialGuestUser);
      }
    } catch (error: any) {
      // también es guest si hay error
      setUser(getUserFromStorage() || initialGuestUser);
    }
  }, []);

  const fetchCalendar = useCallback(
    async (year: number) => {
      try {
        let data;
        if (user.role === "admin") {
          data = await getCalendarAdmin(year);
        } else {
          data = await getCalendarGuest(year);
        }
        setCalendars((prev) => ({ ...prev, [year]: data }));
      } catch (error) {
        console.error("Error fetching calendar:", error);
      }
    },
    [user.role]
  );

  useEffect(() => {
    refreshUser();
    fetchCalendar(currentYear);
  }, [refreshUser, fetchCalendar, currentYear]);

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      clearUserFromStorage();
      setUser(initialGuestUser); // limpia el estado
    }
  };

  // ---- Solicitudes: solo se actualiza el user y se guarda ----
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

// ---- Hooks para consumir los contextos ----
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
