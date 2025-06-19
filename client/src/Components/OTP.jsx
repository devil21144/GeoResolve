import React, { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { House, LogIn, UserRoundSearch } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
const OTP = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState();
  const [err, setError] = useState();
  const [success, setSuccess] = useState();
  const [errMessage, setErrorMessage] = useState();
  const handleSubmit = async () => {
    const username = window.sessionStorage.getItem("username");
    try {
      const results = await axios.post("http://localhost:5001/otp", {
        otp,
        username,
      });
      setError(false);
      setSuccess(true);
      if (results.statusText == "OK") {
        navigate("/login");
      }
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Internal Server Error";
      setError(true);
      setErrorMessage(message);
      setSuccess(false);
      console.log(err.response);
    }
  };
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
          <Tooltip title="Main Register Page" placement="bottom">
            <button
              onClick={() => {
                navigate("/register");
              }}
              className="font-bold"
            >
              R
            </button>
          </Tooltip>
        </div>
      </nav>
      <div
        id="subDiv"
        className="h-full w-full flex items-center justify-center"
      >
        <div
          id="subDiv"
          className="h-1/2 w-1/2 border border-indigo-600 flex  flex-col items-center justify-evenly"
        >
          <h1>OTP Verification</h1>
          <TextField
            inputProps={{ type: "number" }}
            value={otp}
            label="OTP"
            required
            onChange={(e) => {
              setOtp(e.target.value);
            }}
          />
          {err && <Alert severity="error">{errMessage}</Alert>}
          {success && (
            <Alert severity="success">
              Registration Successful <br />
              Please proceed to the login page
            </Alert>
          )}
          <Button variant="contained" color="secondary" onClick={handleSubmit}>
            Verify
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OTP;
