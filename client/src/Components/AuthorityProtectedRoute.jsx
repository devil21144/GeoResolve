import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
const AuthorityProtectedRoute = () => {
  const [isAuth, setIsAuth] = useState(null);
  useEffect(() => {
    const role = window.sessionStorage.getItem("role");
    const isLoggedIn = window.sessionStorage.getItem("isLoggedIn");
      setIsAuth(isLoggedIn && role === "authority");
  }, []);
  if (isAuth === null) return null;
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthorityProtectedRoute;
