import { useCallback, useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import LinearProgress from "@mui/material/LinearProgress";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import JobList from "./components/JobList/JobList";
import Footer from "./components/Footer/Footer";

if (!localStorage.getItem("userUUID")) {
  localStorage.setItem("userUUID", crypto.randomUUID());
}

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [shouldListReload, setShouldListReload] = useState(false);
  const [jobList, setJobList] = useState(
    localStorage.getItem("jobList")
      ? JSON.parse(localStorage.getItem("jobList"))
      : [],
  );

  const loadList = useCallback(async () => {
    const response = await fetch("https://jobs.davidlwatsonjr.com/jobs", {
      headers: { "x-useruuid": localStorage.getItem("userUUID") },
    });
    const { jobs } = await response.json();
    setJobList(jobs);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (shouldListReload && !isLoading) {
      setIsLoading(true);
      setShouldListReload(false);
      loadList();
    }
  }, [shouldListReload, isLoading, loadList]);

  useEffect(() => {
    localStorage.setItem("jobList", JSON.stringify(jobList));
  }, [jobList]);

  useEffect(() => {
    setShouldListReload(true);
  }, []);

  const updateJobInJobList = (job) => {
    const newJobList = jobList.map((j) =>
      j.fullLinkMD5 === job.fullLinkMD5 ? job : j,
    );
    setJobList(newJobList);
  };

  const persistJobProperties = async (job, properties) => {
    const response = await fetch(
      `https://jobs.davidlwatsonjr.com/jobs/${job.fullLinkMD5}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-useruuid": localStorage.getItem("userUUID"),
        },
        body: JSON.stringify(properties),
      },
    );
    if (!response.ok) {
      throw new Error("Failed to update job");
    }
    const persistedJob = await response.json();
    return persistedJob?.job;
  };

  const updateJob = async (job, properties) => {
    updateJobInJobList({ ...job, ...properties });
    try {
      const persistedJob = await persistJobProperties(job, properties);
      updateJobInJobList(persistedJob);
    } catch (e) {
      setShouldListReload(true);
    }
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
