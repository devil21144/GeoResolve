import React, { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import { CheckIcon } from "lucide-react";
import { House, LogIn, UserRoundSearch } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import axios from "axios";
const AuthorityRegister = () => {
  const [role, setRole] = useState();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState();
  const [phoneno, setPhno] = useState();
  const [errr, setErr] = useState(false);
  const [errmessage, setErrMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [district, setDistrict] = useState();
  const [village, setVillage] = useState();
  const handleSubmit = async () => {
    window.sessionStorage.setItem("username", username);
    try {
      const results = await axios.post(
        "http://localhost:5001/register/authority",
        {
          username,
          age,
          password,
          email,
          phoneno,
          district,
          village,
          role,
        }
      );
      console.log(results.request);
      setSuccess(true);
      setErr(false);
      navigate("/otp");
    } catch (err) {
      const message =
        err.response?.message || err.message || "Internal Server error";
      const code = err.response?.status || err.statusCode || 500;
      setErr(true);
      setSuccess(false);
      console.log(message);
      setErrMessage(message);
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
      <div id="remainingDiv" className="h-dvh flex items-center justify-center">
        <div
          id="subDiv"
          className="h-full w-full border border-indigo-600 flex flex-col justify-evenly items-center"
        >
          <h1 className="text-3xl">Authorities' Registration</h1>
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
          <TextField
            id="demo-helper-text-misaligned-no-helper"
            label="District"
            value={district}
            required
            onChange={(e) => {
              setDistrict(e.target.value);
            }}
          />
          <TextField
            id="demo-helper-text-misaligned-no-helper"
            label="VIllage"
            value={village}
            required
            onChange={(e) => {
              setVillage(e.target.value);
            }}
          />
          <TextField
            id="demo-helper-text-misaligned-no-helper"
            label="Role"
            value={role}
            required
            onChange={(e) => {
              setRole(e.target.value);
            }}
          />
          {errr && <Alert severity="error">{errmessage}</Alert>}
          {success && (
            <Alert severity="success">
              Registration Successful <br />Please wait till an admin accepts your request.
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

export default AuthorityRegister;
