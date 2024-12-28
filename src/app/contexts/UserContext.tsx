"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import api from "../../services/api";
interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  refreshUser: () => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  
  const refreshUser = async () => {
    try {
      const response = await api.get("/api/users/profile");
      setUser(response.data); // Actualiza el estado del usuario
    } catch (error: any) {
      setUser(null); // Limpia el estado si falla la solicitud
    }
  };

  const logout = () => {
    setUser(null);
    api.post("/api/users/login"); // Endpoint para cerrar sesión
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe ser usado dentro de un UserProvider");
  }
  return context;
};