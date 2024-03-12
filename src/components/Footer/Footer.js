function Footer() {
  const handleFooterValueChange = (e) => {
    localStorage.setItem("footerValue", e.target.value);
  };

  return (
    <footer>
      <p>
        A <a href="https://davidlwatsonjr.com">davidlwatsonjr</a> production.
      </p>
      <p>
        <input type="text" onChange={handleFooterValueChange} />
      </p>
    </footer>
  );
}

export default Footer;
