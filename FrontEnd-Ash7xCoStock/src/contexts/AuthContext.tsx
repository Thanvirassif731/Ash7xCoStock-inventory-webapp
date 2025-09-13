import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import * as authService from "../api/authService";
import type { User } from "../types";
import { useNavigate } from "react-router-dom";

type ToastItem = {
  id: string;
  type: "success" | "error" | "info";
  message: string;
};

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  toasts: ToastItem[];
  pushToast: (t: Omit<ToastItem, "id">) => void;
  removeToast: (id: string) => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    // attempt to bootstrap from token - mock scenario: if token exists, set basic user
    const token = localStorage.getItem("token");
    return token ? { email: localStorage.getItem("email") || "unknown@local" } : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const navigate = useNavigate();

  // Add toast helper
  const pushToast = useCallback((t: Omit<ToastItem, "id">) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    setToasts((s) => [...s, { id, ...t }]);
    // auto-remove after 4000ms
    setTimeout(() => setToasts((s) => s.filter((x) => x.id !== id)), 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((s) => s.filter((t) => t.id !== id));
  }, []);

  // login wrapper
  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await authService.login({ email, password });
      // store user info and token
      setUser({ email: res.user.email });
      localStorage.setItem("token", res.accessToken);
      localStorage.setItem("email", res.user.email);
      pushToast({ type: "success", message: "Login successful" });
    } catch (err: any) {
      setError(err?.message || "Login failed");
      pushToast({ type: "error", message: err?.message || "Login failed" });
      throw err;
    } finally {
      setLoading(false);
    }
  }, [pushToast]);

  // register wrapper
  const register = useCallback(async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await authService.register({ name, email, password });
      setUser({ email: res.user.email });
      localStorage.setItem("token", res.accessToken);
      localStorage.setItem("email", res.user.email);
      pushToast({ type: "success", message: "Account created and signed in" });
    } catch (err: any) {
      setError(err?.message || "Registration failed");
      pushToast({ type: "error", message: err?.message || "Registration failed" });
      throw err;
    } finally {
      setLoading(false);
    }
  }, [pushToast]);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    localStorage.removeItem("email");
    pushToast({ type: "info", message: "Signed out" });
    navigate("/", { replace: true });
  }, [navigate, pushToast]);

  // Optional: Try to fetch current user if real API exists
  useEffect(() => {
    // placeholder for future: call user info endpoint if token present
  }, []);

  const value: AuthContextValue = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    toasts,
    pushToast,
    removeToast,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
}
