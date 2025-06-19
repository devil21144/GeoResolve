import React, { useState } from "react";
import {
  Menu,
  LogIn,
  X,
  House,
  UserRound,
  UserSearch,
} from "lucide-react";
const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="h-dvh w-dvw">
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
            <a href="#">{sidebarOpen ? "Home" : <House />}</a>
            <br />
            <a href="/login">{sidebarOpen ? "Login" : <LogIn />}</a>
            <br />
            <a href="/register">{sidebarOpen ? "Register" : "R"}</a>
            <br />
            <a href="#">{sidebarOpen ? "About Us" : <UserRound />}</a>
            <br />
            <a href="#">{sidebarOpen ? "Search Authority" : <UserSearch />}</a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Home;
