import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
const CitizenProtectedRoute = () => {
  const [isAuth, setIsAuth] = useState(null);
  useEffect(() => {
    const role = window.sessionStorage.getItem("role");
    const isLoggedIn = window.sessionStorage.getItem("isLoggedIn");
    setIsAuth(role === "citizen" && isLoggedIn=== "true");
  }, []);
    if (isAuth === null) return null;
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default CitizenProtectedRoute;
