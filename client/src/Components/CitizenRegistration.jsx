import React, { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { House, LogIn, UserRoundSearch } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
const CitizenRegistration = () => {
  const [username, setUsername] = useState();
  const [age, setAge] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [phoneno, setPhno] = useState();
  const [errr, setErr] = useState(false);
  const [errmessage, setErrMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const handleSubmit = async () => {
    window.sessionStorage.setItem("username", username);
    try {
      await axios.post(
        "http://localhost:5001/register/citizen",
        {
          username,
          age,
          password,
          email,
          phoneno,
        }
      );
      setSuccess(true);
      setErr(false);
      navigate('/otp');
    } catch (err) {
      const message =
        err.response?.message || err.message || "Internal Server error";
      setErr(true);
      setSuccess(false);
      console.log(message);
      setErrMessage(message);
    }
  };
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
      <div id="remainingDiv" className="h-dvh flex items-center justify-center">
        <div
          id="subDiv"
          className="h-full w-full border border-indigo-600 flex flex-col justify-evenly items-center"
        >
          <h1 className="text-3xl">Citizens' Registration</h1>
          <TextField
            id="demo-helper-text-misaligned-no-helper"
            label="Username"
            value={username}
            required
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <TextField
            id="demo-helper-text-misaligned-no-helper"
            label="Password"
            inputProps={{ type: "password" }}
            value={password}
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <TextField
            inputProps={{ type: "number" }}
            label="Age"
            required
            onChange={(e) => {
              setAge(e.target.value);
            }}
          />
          <TextField
            id="demo-helper-text-misaligned-no-helper"
            label="Email"
            value={email}
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            id="demo-helper-text-misaligned-no-helper"
            label="Phone Number"
            value={phoneno}
            required
            onChange={(e) => {
              setPhno(e.target.value);
            }}
          />
          {errr && <Alert severity="error">{errmessage}</Alert>}
          {success && (
            <Alert severity="success">
              Registration Successful
            </Alert>
          )}
          <Button onClick={handleSubmit} variant="contained" color="secondary">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CitizenRegistration;
