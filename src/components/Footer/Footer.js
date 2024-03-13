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
        <TextField
          size="small"
          fullWidth
          defaultValue={localStorage.getItem("userUUID")}
          onChange={handleUserUUIDChange}
        />
        <IconButton title="Refresh" onClick={() => window.location.reload()}>
          <RefreshIcon />
        </IconButton>
      </div>
      <p>
        A <a href="https://davidlwatsonjr.com">davidlwatsonjr</a> production.
      </p>
    </footer>
  );
}

export default Footer;
