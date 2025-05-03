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

// ------------------
// USER CONTEXT TYPES
// ------------------
interface User {
  _id: string;
  name: string;
  email: string;
  isVerified: boolean;
  role: string; // "guest", "client", "admin", etc.
  address: string;
  serviceAddress: string;
  phone: string;
}

interface UserContextProps {
  user: User;
  setUser: (user: User) => void;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
}

// Usuario inicial guest
const initialGuestUser: User = {
  _id: "",
  name: "",
  email: "",
  isVerified: false,
  role: "guest",
  address: "",
  serviceAddress: "",
  phone: "",
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
  // Estados del usuario
  const [user, setUser] = useState<User>(initialGuestUser);
  // Estado para almacenar los calendarios por año (clave: año)
  const [calendars, setCalendars] = useState<{ [year: number]: CalendarData }>(
    {}
  );
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );

  // Función para refrescar los datos del usuario
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

  // Función para fetch del calendario en un año específico, usando el rol del usuario
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

  // Al montar el proveedor se refresca el usuario y se carga el calendario del año actual
  useEffect(() => {
    refreshUser();
    fetchCalendar(currentYear);
  }, [refreshUser, fetchCalendar, currentYear]);

  // Función de logout que reinicia el usuario a guest
  const logout = async () => {
    try {
      await api.post("/api/users/logout");
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setUser(initialGuestUser);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, refreshUser, logout }}>
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
