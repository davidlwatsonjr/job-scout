import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import JobList from "./components/JobList/JobList";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <JobList />
    </div>
  );
}

export default App;
