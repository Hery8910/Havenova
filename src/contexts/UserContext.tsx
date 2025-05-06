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
import { getCalendarAdmin, getCalendarGuest } from "../services/dashboard";
import {
  addRequest,
  clearRequests,
  removeRequest,
  updateRequest,
} from "../services/serviceOrder";
import { logoutUser } from "../services/userService";
import { FurnitureAssemblyData, ServiceOrder, ServiceRequestItem } from "../types/services";
import { User } from "../types/User";
import { addItem, clearAllRequestItemsFromStorage, clearItems, removeItem, removeRequestItemFromStorage, saveRequestItemToStorage } from "../utils/serviceRequest";


interface UserContextProps {
  user: User;
  setUser: (user: User) => void;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
  addRequestToUser: (newRequest: ServiceRequestItem) => void;
  removeRequestFromUser: (index: number) => void;
  clearAllRequests: () => void;
}

// Usuario inicial guest
export const initialGuestUser: User = {
  _id: "",
  name: "",
  email: "",
  isVerified: false,
  role: "guest",
  address: "",
  phone: "",
  requests: [], // inicializar vacío
};

// ---------------------
// CALENDAR CONTEXT TYPES
// ---------------------
interface CalendarData {
  year: number;
  months: any[]; // Aquí deberías definir un tipo más específico según tu modelo
}

interface CalendarContextProps {
  calendars: { [year: number]: CalendarData };
  currentYear: number;
  setCurrentYear: (year: number) => void;
  fetchCalendar: (year: number) => Promise<void>;
}

// ------------------
// CREACIÓN DE CONTEXTOS
// ------------------
const UserContext = createContext<UserContextProps | undefined>(undefined);
const CalendarContext = createContext<CalendarContextProps | undefined>(
  undefined
);

// ----------------------
// PROVEEDOR COMBINADO
// ----------------------
interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardProvider = ({ children }: DashboardProviderProps) => {
  const [user, setUser] = useState<User>(initialGuestUser);
  const [calendars, setCalendars] = useState<{ [year: number]: CalendarData }>(
    {}
  );
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );

  useEffect(() => {
    const stored = localStorage.getItem("user_service_requests");
    if (stored) {
      try {
        const parsed: ServiceRequestItem[] = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setUser((prev) => ({
            ...prev,
            requests: parsed,
          }));
        }
      } catch (err) {
        console.error("Error parsing saved requests:", err);
      }
    }
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const response = await api.get("/api/users/profile");
      if (response.data) {
        setUser(response.data);
      } else {
        setUser(initialGuestUser);
      }
    } catch (error: any) {
      setUser(initialGuestUser);
    }
  }, []);

  useEffect(() => {
    if (user.requests.length > 0) {
      localStorage.setItem(
        "user_service_requests",
        JSON.stringify(user.requests)
      );
    } else {
      localStorage.removeItem("user_service_requests");
    }
  }, [user.requests]);

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
      await logoutUser(); // llamada a la API
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setUser(initialGuestUser); // limpia el estado
    }
  };

  const addRequestToUser = (newRequest: ServiceRequestItem) => {
    saveRequestItemToStorage(newRequest); // 🔐 localStorage
    setUser((prev) => ({
      ...prev,
      requests: addItem(prev.requests, newRequest), // 🧠 memoria
    }));
  };
  
  const removeRequestFromUser = (index: number) => {
    removeRequestItemFromStorage(index); // 🔐 localStorage
    setUser((prev) => ({
      ...prev,
      requests: removeItem(prev.requests, index),
    }));
  };
  
  const clearAllRequests = () => {
    clearAllRequestItemsFromStorage(); // 🔐 localStorage
    setUser((prev) => ({
      ...prev,
      requests: clearItems(),
    }));
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

// Hooks para consumir los contextos
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
