import React from "react";
import Avatar from "@mui/material/Avatar";
const AdminDashboard = () => {
  const username = window.sessionStorage.getItem("username");
  const startingLetter = username.at(0);
  return (
    <div>
      <Avatar>{startingLetter}</Avatar>
    </div>
  );
};

export default AdminDashboard;
