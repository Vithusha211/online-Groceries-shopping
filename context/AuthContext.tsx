import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getStoredToken, setStoredToken } from '../services/api';
import {
  fetchMe,
  loginRequest,
  signupRequest,
  updateLocationRequest,
} from '../services/authService';
import type { ApiUser } from '../services/types';

type AuthContextValue = {
  user: ApiUser | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<ApiUser>;
  signup: (
    username: string,
    email: string,
    password: string,
  ) => Promise<ApiUser>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  saveLocation: (zone: string, area: string) => Promise<ApiUser>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<ApiUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    const stored = await getStoredToken();
    if (!stored) {
      setToken(null);
      setUser(null);
      return;
    }
    setToken(stored);
    const me = await fetchMe();
    setUser(me);
  }, []);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        await refreshUser();
      } catch {
        await setStoredToken(null);
        if (active) {
          setToken(null);
          setUser(null);
        }
      } finally {
        if (active) setIsLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [refreshUser]);

  const login = useCallback(async (email: string, password: string) => {
    const data = await loginRequest(email, password);
    setToken(data.token);
    setUser(data.user);
    return data.user;
  }, []);

  const signup = useCallback(
    async (username: string, email: string, password: string) => {
      const data = await signupRequest(username, email, password);
      setToken(data.token);
      setUser(data.user);
      return data.user;
    },
    [],
  );

  const logout = useCallback(async () => {
    await setStoredToken(null);
    setToken(null);
    setUser(null);
  }, []);

  const saveLocation = useCallback(async (zone: string, area: string) => {
    const updated = await updateLocationRequest(zone, area);
    setUser(updated);
    return updated;
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      isLoading,
      isAuthenticated: Boolean(token && user),
      login,
      signup,
      logout,
      refreshUser,
      saveLocation,
    }),
    [
      user,
      token,
      isLoading,
      login,
      signup,
      logout,
      refreshUser,
      saveLocation,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
