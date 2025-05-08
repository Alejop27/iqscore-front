import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirige a /Iniciar y guarda la ruta original para posible redirect post-login
    return <Navigate to="/Iniciar" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;