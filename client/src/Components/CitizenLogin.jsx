import { useNavigate } from "react-router-dom";
import { House, LogIn, UserRoundSearch } from "lucide-react";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Alert from "@mui/material/Alert";
const CitizenLogin = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [err, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      await axios.post(
        "https://georesolve.onrender.com/login/citizen",
        {
          username,
          password,
        }
      );
      window.sessionStorage.setItem("isLoggedIn", "true");
      window.sessionStorage.setItem("role", "citizen");
      setError(false);
      navigate("/dashboard/citizen");
      setSuccess(true);
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Internal Server Error";
      setError(true);
      setSuccess(false);
      setErrorMessage(message);
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
        </div>
      </nav>
      <div
        id="remainingDiv"
        className="h-dvh flex flex-col items-center justify-center"
      >
        <div className="border border-indigo-600 h-1/2 w-1/3 flex flex-col items-center justify-evenly">
          <TextField
            label="Username"
            value={username}
            required
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <TextField
            label="Password"
            value={password}
            required
            inputProps={{ type: "password" }}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button variant="contained" color="secondary" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
        {err && <Alert severity="error">{errMessage}</Alert>}
        {success && <Alert severity="success">Login Successful</Alert>}
      </div>
    </div>
  );
};

export default CitizenLogin;
