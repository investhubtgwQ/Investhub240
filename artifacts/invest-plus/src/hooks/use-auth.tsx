import { createContext, useContext, useEffect, ReactNode, useState } from "react";
import { useGetMe, User } from "@workspace/api-client-react";
import { getAuthToken, removeAuthToken } from "../lib/auth";
import { useLocation } from "wouter";
import { useQueryClient } from "@tanstack/react-query";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const [tokenPresent, setTokenPresent] = useState<boolean>(!!getAuthToken());

  // Watch for token changes (if done outside React)
  useEffect(() => {
    const handleStorageChange = () => {
      setTokenPresent(!!getAuthToken());
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const { data: user, isLoading, error } = useGetMe({
    query: {
      queryKey: ["auth", "me"],
      enabled: tokenPresent,
      retry: false,
    }
  });

  const isAuthenticated = !!user;

  // Clear token if me endpoint returns 401
  useEffect(() => {
    if (error && (error as any)?.status === 401) {
      removeAuthToken();
      setTokenPresent(false);
    }
  }, [error]);

  const logout = () => {
    removeAuthToken();
    setTokenPresent(false);
    queryClient.clear();
    setLocation("/");
  };

  return (
    <AuthContext.Provider value={{ user: user || null, isLoading, isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
