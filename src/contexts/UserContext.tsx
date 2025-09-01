'use client';
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ServiceRequestItem } from '../types/services';
import { User } from '../types/User';
import { useClient } from './ClientContext';
import api from '../services/api';
import { getUser, updateUser } from '../services/userService';

// --- Utilidades Local Storage ---
const USER_KEY = 'havenova_user';

function getPersistentGuestAvatar(): string {
  if (typeof window === 'undefined') return '/svg/user.svg';
  const key = 'guest_avatar';
  let avatar = localStorage.getItem(key);
  if (!avatar) {
    avatar = '/svg/user.svg';
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
      if (user && user.createdAt) user.createdAt = new Date(user.createdAt);
      return user;
    } catch {
      return null;
    }
  }
  return null;
}

function clearUserFromStorage() {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem('guest_avatar');
}

export const initialGuestUser: User = {
  _id: '',
  name: '',
  email: '',
  password: '',
  address: '',
  profileImage: '',
  phone: '',
  isVerified: false,
  role: 'guest',
  language: 'de',
  theme: 'light',
  requests: [],
  createdAt: new Date(),
  clientId: '',
};

interface UserContextProps {
  user: User | null;
  loading: boolean;
  setUser: (user: User) => void;
  refreshUser: (onSessionExpired?: () => void) => Promise<void>;
  logout: () => void;
  addRequestToUser: (newRequest: ServiceRequestItem) => void;
  removeRequestFromUser: (id: string) => void;
  clearAllRequests: () => void;
  updateUserLanguage: (lang: string) => Promise<void>;
  updateUserTheme: (lang: 'light' | 'dark') => Promise<void>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardProvider = ({ children }: DashboardProviderProps) => {
  const { client } = useClient();
  const clientId = client?._id || '';

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    refreshUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user) saveUserToStorage(user);
  }, [user]);

  // --- REFRESH USER: Trae perfil actualizado desde el backend SOLO SI usuario registrado ---
  const refreshUser = useCallback(
    async (onSessionExpired?: () => void) => {
      const localUser = getUserFromStorage();

      try {
        const response = await getUser(clientId);
        const user = response.data;
        if (user) {
          setUser(user);
          saveUserToStorage(user);
        }
      } catch (error: any) {
        clearUserFromStorage();
        setUser({
          ...initialGuestUser,
          clientId: clientId || '',
          profileImage: getPersistentGuestAvatar(),
        });

        const wasLoggedIn = !!localUser && localUser.role !== 'guest';

        if (wasLoggedIn && (error?.response?.status === 401 || error?.response?.status === 403)) {
          onSessionExpired?.();
        }
      } finally {
        setLoading(false);
      }
    },
    [clientId]
  );

  const updateUserLanguage = useCallback(
    async (newLang: string) => {
      if (user?.role === 'guest') {
        setUser((prev) => (prev ? { ...prev, language: newLang } : initialGuestUser));
        saveUserToStorage(user ? { ...user, language: newLang } : initialGuestUser);
        return;
      }
      const payload = {
        clientId,
        email: user?.email,
        language: newLang,
      };
      try {
        const response = await updateUser(payload);
        if (response.data) {
          setUser(response.data);
          saveUserToStorage(response.data);
        } else {
          setUser(initialGuestUser);
        }
      } catch (err) {
        console.error('Failed to update user language:', err);
      }
    },
    [user, clientId]
  );

  const updateUserTheme = useCallback(
    async (newTheme: 'light' | 'dark') => {
      if (user?.role === 'guest') {
        setUser((prev) => (prev ? { ...prev, theme: newTheme } : initialGuestUser));
        saveUserToStorage(user ? { ...user, theme: newTheme } : initialGuestUser);
        return;
      }
      const payload = {
        clientId,
        email: user?.email,
        theme: newTheme,
      };
      try {
        const response = await updateUser(payload);
        if (response.data) {
          setUser(response.data);
          saveUserToStorage(response.data);
        } else {
          setUser(initialGuestUser);
        }
      } catch (err) {
        console.error('Failed to update user theme:', err);
      }
    },
    [user, clientId]
  );

  const logout = useCallback(() => {
    clearUserFromStorage();
    setUser({
      ...initialGuestUser,
      clientId,
      profileImage: getPersistentGuestAvatar(),
    });
  }, [clientId]);

  const addRequestToUser = useCallback((newRequest: ServiceRequestItem) => {
    const requestWithId = { ...newRequest, id: uuidv4() };

    setUser((prev) => {
      if (!prev) return initialGuestUser;
      const updated = {
        ...prev,
        requests: [...(prev.requests || []), requestWithId],
      };
      saveUserToStorage(updated);
      return updated;
    });
  }, []);

  const removeRequestFromUser = useCallback((id: string) => {
    setUser((prev) => {
      const updated = {
        ...prev,
        requests: prev.requests.filter((req: ServiceRequestItem) => req.id !== id),
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

  if (loading) return null;

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        setUser,
        refreshUser,
        logout,
        addRequestToUser,
        removeRequestFromUser,
        clearAllRequests,
        updateUserLanguage,
        updateUserTheme,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook para consumir contexto
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a DashboardProvider');
  }
  return context;
};
