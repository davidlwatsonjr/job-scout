import { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import LinearProgress from "@mui/material/LinearProgress";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import JobList from "./components/JobList/JobList";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [jobList, setJobList] = useState(
    localStorage.getItem("jobList")
      ? JSON.parse(localStorage.getItem("jobList"))
      : [],
  );

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await fetch("https://jobs.davidlwatsonjr.com/jobs");
      const { jobs } = await response.json();
      setJobList(jobs);
      setIsLoading(false);
      localStorage.setItem("jobList", JSON.stringify(jobs));
    })();
  }, []);

  return (
    <div className="App">
      <CssBaseline />
      <div className="LoadingBar">{isLoading && <LinearProgress />}</div>
      <h1>Job List</h1>
      <JobList jobList={jobList} />
    </div>
  );
}

export default App;
