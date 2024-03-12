import { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import LinearProgress from "@mui/material/LinearProgress";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import JobList from "./components/JobList/JobList";
import Footer from "./components/Footer/Footer";

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

  const updateJob = (job, properties) => {
    fetch(`https://jobs.davidlwatsonjr.com/jobs/${job.fullLinkMD5}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": localStorage.getItem("footerValue"),
      },
      body: JSON.stringify(properties),
    });
    const newJobList = jobList.map((j) =>
      j.fullLinkMD5 === job.fullLinkMD5 ? { ...j, ...properties } : j,
    );
    setJobList(newJobList);
    localStorage.setItem("jobList", JSON.stringify(newJobList));
  };

  return (
    <div className="App">
      <CssBaseline />
      <div className="LoadingBar">{isLoading && <LinearProgress />}</div>
      <h1>Job List</h1>
      <JobList
        jobList={jobList.filter(
          (job) => !job.applied && job.interested !== false,
        )}
        updateJob={updateJob}
      />
      <h1>Applied Jobs</h1>
      <JobList
        jobList={jobList.filter((job) => job.applied)}
        updateJob={updateJob}
      />
      <h1>Uninterested Jobs</h1>
      <JobList
        jobList={jobList.filter((job) => job.interested === false)}
        updateJob={updateJob}
      />
      <Footer />
    </div>
  );
}

export default App;
