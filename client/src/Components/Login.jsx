import React, { useState } from "react";
import { Menu, X, House, UserSearch } from "lucide-react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [sidebarOpen, setSidebarOpen] = useState();
  const navigate = useNavigate();
  return (
    <div className="w-dvw h-dvh flex flex-row">
      <div
        id="sidebarNav"
        className={`bg-indigo-600 transition-all duration-500 ease-out-in ${
          sidebarOpen ? "w-40" : "w-16"
        } h-screen flex-col text-center`}
      >
        <div>
          <button
            onClick={() => {
              setSidebarOpen(!sidebarOpen);
            }}
            className="self-start mt-2 text-white"
          >
            {sidebarOpen ? <X /> : <Menu />}
          </button>
        </div>
        <span className="text-white underline decoration-solid">
          {sidebarOpen ? "Menu" : ""}
        </span>
        <div className="flex-col items-center">
          <nav className="text-white mt-6 flex flex-col items-center">
            <a href="/">{sidebarOpen ? "Home" : <House />}</a>
            <br />
            <a href="/register">{sidebarOpen ? "Register" : "R"}</a>
            <br />
            <a href="#">{sidebarOpen ? "Search Authority" : <UserSearch />}</a>
          </nav>
        </div>
      </div>
      <div id="subDiv" className="w-full flex items-center justify-center">
        <div id="login" className="border border-indigo-600 w-1/2 h-1/2 flex flex-col justify-evenly items-center">
          <Button color="secondary" variant="contained" onClick={() => { navigate('/login/authority') }}>Authority</Button>
          <Button color="secondary" variant="contained" onClick={() => { navigate('/login/citizen') }}>Citizen</Button>
          <Button color="secondary" variant="contained" onClick={() => { navigate('/login/admin') }}>Admin</Button>
          
        </div>
      </div>
    </div>
  );
};

export default Login;
