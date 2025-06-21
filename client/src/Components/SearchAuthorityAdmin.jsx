import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { Search } from "lucide-react";
import { useState } from "react";
const SearchAuthorityAdmin = () => {
  const [role, setRole] = useState("");
  const [district, setDistrict] = useState("");
  const [village, setVillage] = useState("");
  const [username, setUsername] = useState("");
  const [err, setError] = useState(false);
  const [errMessage, setErrorMessage] = useState("");
  const reqArray = {
    district: district,
    village: village,
  };
  const handleSubmit = async () => {
    try {
      if (role === "" && district === "" && village === "" && username === "") {
        const err = new Error("Enter atleast one field");
        throw err;
      }
      const results = await axios.post(
        "http://localhost:5001/admin/searchauthority",
        reqArray
      );
    } catch (err) {
      setError(true);
      const message =
        err.response?.data?.message || err.message || "Internal Server Error";
      setErrorMessage(message);
    }
  };
  return (
    <div className="h-dvh w-dvw">
      <div id="seperateDiv">
        <TextField
          id="outlined-basic"
          label="District"
          required
          variant="outlined"
          onChange={(e) => {
            setDistrict(e.target.value);
          }}
          value={district}
        />
        <TextField
          id="outlined-basic"
          label="Village"
          required
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
      <div id="searchDiv"></div>
      {err && <Alert severity="error">{errMessage}</Alert>}
    </div>
  );
};

export default SearchAuthorityAdmin;
