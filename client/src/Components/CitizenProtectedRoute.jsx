import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
const CitizenProtectedRoute = () => {
  const role = window.localStorage.getItem("role");
  const isLoggedIn = window.localStorage.getItem("isLoggedIn");
  const isAuth = role === "citizen" && isLoggedIn === "true";
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default CitizenProtectedRoute;
