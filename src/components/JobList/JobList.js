import { useEffect, useState } from "react";
import "./JobList.css";

function JobList() {
  const [jobList, setJobList] = useState(localStorage.getItem("jobList") ? JSON.parse(localStorage.getItem("jobList")) : []);

  useEffect(() => {
    (async () => {
      const response = await fetch("https://jobs.davidlwatsonjr.com/jobs");
      const { jobs } = await response.json();
      localStorage.setItem("jobList", JSON.stringify(jobs));
      setJobList(jobs);
    })();
  }, []);

  return (
    <div data-testid="job-list">
      <h1>Job List</h1>
      <ul data-testid="job-list-ul" className="JobList">
        {jobList?.map?.((job) => (
          <li key={job.fullLinkMD5}>
            <a href={job.fullLink} title={job.createdDate}>
              {job.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JobList;
