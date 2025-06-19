import { House, LogIn, UserRoundSearch } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
const Register = () => {
  const navigate = useNavigate();
  return (
    <div className="h-dvh w-dvw">
      <nav
        className={`h-16 bg-indigo-600 flex flex-row justify-between items-center`}
      >
        <div>
          <p className="text-white font-medium text-xl ml-4">GeoResolve</p>
        </div>
        <div
          id="buttonsDiv"
          className="text-white w-64 me-4 flex justify-evenly"
        >
          <Tooltip title="Home" placement="bottom">
            <button
              onClick={() => {
                navigate("/");
              }}
              className="cursor-pointer"
            >
              <House />
            </button>
          </Tooltip>
          <Tooltip title="Login" placement="bottom">
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="cursor-pointer"
            >
              <LogIn />
            </button>
          </Tooltip>
          <Tooltip title="Search Authority" placement="bottom">
            <button
              onClick={() => {
                navigate("/searchauthority");
              }}
              className="cursor-pointer"
            >
              <UserRoundSearch />
            </button>
          </Tooltip>
        </div>
      </nav>
      <div id="remainingDiv" className="h-dvh flex items-center justify-center">
        <div className="border border-indigo-600 h-1/2 w-1/2 flex flex-col justify-evenly items-center">
          <Button color="secondary" variant="contained" onClick={() => { navigate('/register/authority') }}>Authority</Button>
          <Button color="secondary" variant="contained" onClick={()=>{navigate('/register/citizen')}}>Citizen</Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
