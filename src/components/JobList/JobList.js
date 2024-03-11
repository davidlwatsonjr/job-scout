import { useEffect, useState } from "react";
import "./JobList.css";
import { LinearProgress } from "@mui/material";

function JobList() {
  const todayDate = new Date().toLocaleDateString();
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
    <div data-testid="job-list">
      <div className="LoadingBar">{isLoading && <LinearProgress />}</div>
      <ul data-testid="job-list-ul" className="JobList">
        {jobList?.map?.((job) => (
          <li key={job.fullLinkMD5}>
            <a
              href={job.fullLink}
              target="_blank"
              rel="noopener noreferrer"
              title={job.createdDate}
            >
              {job.createdDate === todayDate && <span>🌟</span>}
              {job.title}
              {job.createdDate === todayDate && <span>🌟</span>}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JobList;
