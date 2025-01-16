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
      setUser(response.data); 
    } catch (error: any) {
      setUser(null); 
    }
  };

  const logout = () => {
    setUser(null);
    api.post("/api/users/login"); 
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
    throw new Error("useUser must be used on the UserProvider");
  }
  return context;
};