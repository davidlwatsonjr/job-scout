import RefreshIcon from "@mui/icons-material/Refresh";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

function Footer() {
  const handleUserUUIDChange = (e) => {
    localStorage.setItem("userUUID", e.target.value);
  };

  return (
    <Box component="footer">
      <Stack direction="row" justifyContent="center" margin={2} spacing={2}>
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
      </Stack>
      A{" "}
      <Link
        underline="hover"
        href="https://davidlwatsonjr.com"
        target="_blank"
        rel="noreferrer"
      >
        davidlwatsonjr
      </Link>{" "}
      production.
    </Box>
  );
}

export default Footer;
