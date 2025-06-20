import { Navigate, Outlet } from "react-router-dom";
const CitizenProtectedRoute = () => {
  const role = window.sessionStorage.getItem("role");
  const isLoggedIn = window.sessionStorage.getItem("isLoggedIn");
  const isAuth = role === "citizen" && isLoggedIn === "true";
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default CitizenProtectedRoute;
