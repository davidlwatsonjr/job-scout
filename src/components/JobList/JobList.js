import { useEffect, useState } from "react";
import "./JobList.css";

function JobList() {
  const [jobList, setJobList] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch("https://jobs.davidlwatsonjr.com/jobs");
      const { jobs } = await response.json();
      setJobList(jobs);
    })();
  }, []);

  return (
    <div data-testid="job-list">
      <h1>Job List</h1>
      <ul data-testid="job-list-ul" className="JobList">
        {jobList?.map?.((job) => (
          <li key={job.fullLink}>
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
