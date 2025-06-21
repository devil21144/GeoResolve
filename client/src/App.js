import React from "react";
import "./output.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import AuthorityRegister from "./Components/AuthorityRegister";
import CitizenRegistration from "./Components/CitizenRegistration";
import OTP from "./Components/OTP";
import AdminDashboard from "./Components/AdminDashboard";
import CitizenLogin from "./Components/CitizenLogin";
import { Analytics } from "@vercel/analytics/react";
import AuthorityLogin from "./Components/AuthorityLogin";
import AdminLogin from "./Components/AdminLogin";
import CitizenDashboard from "./Components/CitizenDashboard";
import AuthorityDashboard from "./Components/AuthorityDashboard";
import AdminProtectedRoute from "./Components/AdminProtectedRoute";
import AuthorityProtectedRoute from "./Components/AuthorityProtectedRoute";
import CitizenProtectedRoute from "./Components/CitizenProtectedRoute";
import SearchAuthorityAdmin from "./Components/SearchAuthorityAdmin";
import DeleteAuthorityAdmin from "./Components/DeleteAuthorityAdmin";
import SearchProblemsAdmin from "./Components/SearchProblemsAdmin";
import ViewAdminBelowClearance from "./Components/ViewAdminBelowClearance";

const App = () => {
  return (
    <div>
      <Routes>
        <Route element={<Home />} path="/"></Route>
        <Route element={<Login />} path="/login"></Route>
        <Route element={<Register />} path="/register"></Route>
        <Route
          element={<AuthorityRegister />}
          path="/register/authority"
        ></Route>
        <Route element={<CitizenRegistration />} path="/register/citizen">
          {" "}
        </Route>
        <Route element={<OTP />} path="/otp"></Route>
        <Route path="/login/citizen" element={<CitizenLogin />}></Route>
        <Route path="/login/authority" element={<AuthorityLogin />}></Route>
        <Route path="/login/admin" element={<AdminLogin />}></Route>
        <Route element={<AdminProtectedRoute />}>
          <Route path="/dashboard/admin" element={<AdminDashboard />}></Route>
          <Route
            path="/admin/searchauthority"
            element={<SearchAuthorityAdmin />}
          ></Route>
          <Route
            path="/admin/searchcitizen"
            element={<DeleteAuthorityAdmin />}
          ></Route>
          <Route
            path="/admin/searchproblems"
            element={<SearchProblemsAdmin />}
          ></Route>
          <Route
            path="/admin/deleteauthority"
            element={<DeleteAuthorityAdmin />}
          ></Route>
          <Route path="/admin/viewadmin" element={<ViewAdminBelowClearance/>}></Route>
        </Route>
        <Route element={<CitizenProtectedRoute />}>
          <Route
            path="/dashboard/citizen"
            element={<CitizenDashboard />}
          ></Route>
        </Route>
        <Route element={<AuthorityProtectedRoute />}>
          <Route
            path="/dashboard/authority"
            element={<AuthorityDashboard />}
          ></Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
