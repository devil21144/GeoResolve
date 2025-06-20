import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
const AuthorityProtectedRoute = () => {
  const isLoggedIn = window.sessionStorage.getItem('isLoggedIn');
  const role = window.sessionStorage.getItem('role');
  const isAuth=role==='authority' && isLoggedIn==='true'
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthorityProtectedRoute;
