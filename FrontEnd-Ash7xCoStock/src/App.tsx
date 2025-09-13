// src/App.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import styles from "./pages/Login.module.scss";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { Toasts } from "./components/Toast/Toast.tsx";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import COGSReport from "./pages/COGSReport";
// import AdminLogs from "./pages/AdminLogs";


const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      } />

      <Route path="/cogs-report" element={<COGSReport />} />

      {/* <Route path="/admin-logs" element={<AdminLogs />} /> */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
};

export default App;
