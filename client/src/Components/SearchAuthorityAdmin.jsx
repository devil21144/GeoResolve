import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { House, LogIn, LogOut, UserRoundSearch } from "lucide-react";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const SearchAuthorityAdmin = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [district, setDistrict] = useState("");
  const [village, setVillage] = useState("");
  const [err, setError] = useState(false);
  const [results, setResults] = useState([]);
  const [errMessage, setErrorMessage] = useState("");
  const reqArray = {
    district: district,
    role: role,
    village: village,
  };
  const handleSubmit = async () => {
    try {
      if (role === "" && district === "" && village === "") {
        const err = new Error("Enter atleast one field");
        throw err;
      }
      const response1 = await axios.post(
        "https://georesolve.onrender.com/admin/searchauthority",
        reqArray
      );
      setResults(response1.data);
      console.log(results);
    } catch (err) {
      setError(true);
      const message =
        err.response?.data?.message || err.message || "Internal Server Error";
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
                navigate("/dashboard/admin");
              }}
              className="cursor-pointer"
            >
              <House />
            </button>
          </Tooltip>
          <Tooltip title="Logout" placement="bottom">
            <button
              onClick={() => {
                window.sessionStorage.clear();
                navigate("/login");
              }}
              className="cursor-pointer"
            >
              <LogOut />
            </button>
          </Tooltip>
        </div>
      </nav>
      <div className="flex flex-col items-center h-full">
        <div id="seperateDiv" className="flex justify-evenly mt-2 w-full">
          <TextField
            label="Role"
            variant="outlined"
            onChange={(e) => {
              setRole(e.target.value);
            }}
            value={role}
          />
          <TextField
            id="outlined-basic"
            label="District"
            variant="outlined"
            onChange={(e) => {
              setDistrict(e.target.value);
            }}
            value={district}
          />
          <TextField
            id="outlined-basic"
            label="Village"
            variant="outlined"
            onChange={(e) => {
              setVillage(e.target.value);
            }}
            value={village}
          />
          <Button onClick={handleSubmit} variant="contained" color="secondary">
            <Search />
          </Button>
        </div>
        <div
          id="searchDiv"
          className="h-9/10 border border-indigo-500 mt-2 w-9/10"
        >
          {results.length > 0 && (
            <div style={{ marginTop: "1rem", padding: "1rem" }}>
              {results.map((item, index) => (
                <Paper
                  key={index}
                  elevation={3}
                  style={{ marginBottom: "1rem", padding: "1rem" }}
                >
                  <Typography>
                    <strong>Username:</strong> {item.username}
                  </Typography>
                  <Typography>
                    <strong>Age:</strong> {item.age}
                  </Typography>
                  <Typography>
                    <strong>Email:</strong> {item.email}
                  </Typography>
                  <Typography>
                    <strong>Phone No:</strong> {item.phoneno}
                  </Typography>
                  <Typography>
                    <strong>Role:</strong> {item.role}
                  </Typography>
                </Paper>
              ))}
            </div>
          )}
        </div>
      </div>
      {err && <Alert severity="error">{errMessage}</Alert>}
    </div>
  );
};

export default SearchAuthorityAdmin;
