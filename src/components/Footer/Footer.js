import RefreshIcon from "@mui/icons-material/Refresh";
import "./Footer.css";
import { IconButton, TextField } from "@mui/material";

function Footer() {
  const handleUserUUIDChange = (e) => {
    localStorage.setItem("userUUID", e.target.value);
  };

  return (
    <footer className="Footer">
      <div>
        A <a href="https://davidlwatsonjr.com">davidlwatsonjr</a> production.
      </div>
      <div>
        <TextField
          size="small"
          defaultValue={localStorage.getItem("userUUID")}
          onChange={handleUserUUIDChange}
          sx={{ width: "38ch" }}
        />
        <IconButton title="Refresh" onClick={() => window.location.reload()}>
          <RefreshIcon />
        </IconButton>
      </div>
    </footer>
  );
}

export default Footer;
