import { useState } from "react";
import { Menu, X, UserSearch, UserX } from "lucide-react";
const AdminDashboard = () => {
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
            <a href="/admin/searchauthority">
              {sidebarOpen ? "Search Authority" : <UserSearch />}
            </a><br />
            <a href="/admin/deleteauthority">
              {sidebarOpen ? "Delete Authority" : <UserX />}
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
