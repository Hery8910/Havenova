"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { ServiceRequestItem } from "../types/services";
import { User } from "../types/User";

// Helpers para localStorage
const USER_KEY = "havenova_user";

function saveUserToStorage(user: User) {
  if (typeof window !== "undefined") {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
}
function getUserFromStorage(): User | null {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem(USER_KEY);
  if (!data) return null;
  try {
    const user = JSON.parse(data);
    if (user && user.createdAt) user.createdAt = new Date(user.createdAt);
    return user;
  } catch {
    return null;
  }
}
function clearUserFromStorage() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem("guest_avatar");
  }
}
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
  language: "de",
  theme: "light",
};

interface UserContextProps {
  user: User;
  setUser: (user: User) => void;
  updatePreferences: (prefs: { language?: string; theme?: string }) => void;
  logout: () => void;
  addRequestToUser: (newRequest: ServiceRequestItem) => void;
  removeRequestFromUser: (id: string) => void;
  clearAllRequests: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface DashboardProviderProps {
  children: ReactNode;
  initialUser: User;
}

export const DashboardProvider = ({
  children,
  initialUser,
}: DashboardProviderProps) => {
  // Usa localStorage si existe, si no, usa initialUser recibido del SSR/layout
  const [user, setUser] = useState<User>(() => {
    if (typeof window !== "undefined") {
      return (
        getUserFromStorage() || {
          ...initialUser,
          profileImage: initialUser.profileImage || getPersistentGuestAvatar(),
        }
      );
    }
    return {
      ...initialUser,
      profileImage: initialUser.profileImage || "/avatars/avatar-1.svg",
    };
  });

  // Siempre que cambia el usuario, guarda en localStorage
  useEffect(() => {
    if (user) saveUserToStorage(user);
  }, [user]);

  // Cambia preferencias (idioma/tema)
  const updatePreferences = useCallback(
    (prefs: { language?: string; theme?: string }) => {
      setUser((prev) => {
        const updated = {
          ...prev,
          ...prefs,
        };
        saveUserToStorage(updated);
        // (Opcional) Puedes hacer PATCH al backend aquí si quieres persistirlo globalmente
        return updated;
      });
    },
    []
  );

  const logout = useCallback(() => {
    clearUserFromStorage();
    setUser({
      ...initialGuestUser,
      profileImage: getPersistentGuestAvatar(),
    });
  }, []);

  const addRequestToUser = useCallback(
    (newRequest: ServiceRequestItem) => {
      const requestWithId = { ...newRequest, id: uuidv4() };
      setUser((prev) => {
        const updated = {
          ...prev,
          requests: [...(prev.requests || []), requestWithId],
        };
        saveUserToStorage(updated);
        return updated;
      });
    },
    []
  );

  const removeRequestFromUser = useCallback((id: string) => {
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
  }, []);

  const clearAllRequests = useCallback(() => {
    setUser((prev) => {
      const updated = { ...prev, requests: [] };
      saveUserToStorage(updated);
      return updated;
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        updatePreferences,
        logout,
        addRequestToUser,
        removeRequestFromUser,
        clearAllRequests,
      }}
    >
      {children}
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
