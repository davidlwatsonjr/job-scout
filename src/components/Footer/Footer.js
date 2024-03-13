import RefreshIcon from "@mui/icons-material/Refresh";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import "./Footer.css";

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
          sx={{ maxWidth: "38ch" }}
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
