// src/components/PrivateRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuthContext();

  // while loading, show a minimal loader (prevents immediate redirect)
  if (auth.loading) return <div style={{ padding: 40, color: "#fff" }}>Loading...</div>;

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  if (auth.user || token) return children;

  return <Navigate to="/" replace />;
};

export default PrivateRoute;
