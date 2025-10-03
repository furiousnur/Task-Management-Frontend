import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import api from "../api/axios";

const PrivateRoute = () => {
  const [isValidToken, setIsValidToken] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsValidToken(false);
        return;
      }

      try {
        await api.get("/auth/verify-token");
        setIsValidToken(true);
      } catch (error) {
        localStorage.removeItem("token");
        setIsValidToken(false);
      }
    };

    validateToken();
  }, [token]);

  if (isValidToken === null) {
    return <div>Loading...</div>;
  }
  return isValidToken ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;