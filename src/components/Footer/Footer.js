function Footer() {
  const handleUserUUIDChange = (e) => {
    localStorage.setItem("userUUID", e.target.value);
  };

  return (
    <footer>
      <p>
        A <a href="https://davidlwatsonjr.com">davidlwatsonjr</a> production.
      </p>
      <input
        type="text"
        defaultValue={localStorage.getItem("userUUID")}
        size={36}
        onChange={handleUserUUIDChange}
      />
      <button onClick={() => window.location.reload()}>Refresh</button>
    </footer>
  );
}

export default Footer;
