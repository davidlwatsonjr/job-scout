import { useEffect, useState } from "react";
import "./JobList.css";
import { LinearProgress } from "@mui/material";

function JobList() {
  const todayDate = new Date().toLocaleDateString();
  const [isLoadingJobs, setIsLoadingJobs] = useState(true);
  const [jobList, setJobList] = useState(
    localStorage.getItem("jobList")
      ? JSON.parse(localStorage.getItem("jobList"))
      : [],
  );

  useEffect(() => {
    (async () => {
      setIsLoadingJobs(true);
      const response = await fetch("https://jobs.davidlwatsonjr.com/jobs");
      const { jobs } = await response.json();
      localStorage.setItem("jobList", JSON.stringify(jobs));
      setJobList(jobs);
      setIsLoadingJobs(false);
    })();
  }, []);

  return (
    <div data-testid="job-list">
      <div className="JobsLoadingBar">
        {isLoadingJobs && <LinearProgress />}
      </div>
      <h1>Job List</h1>
      <ul data-testid="job-list-ul" className="JobList">
        {jobList?.map?.((job) => (
          <li key={job.fullLinkMD5}>
            {job.createdDate === todayDate && <span>🌟</span>}
            <a href={job.fullLink} title={job.createdDate}>
              {job.title}
            </a>
            {job.createdDate === todayDate && <span>🌟</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JobList;
