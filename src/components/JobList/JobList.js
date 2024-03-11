import "./JobList.css";

function JobList({ jobList }) {
  const todayDate = new Date().toLocaleDateString();
  return (
    <ul data-testid="job-list" className="JobList">
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
  );
}

export default JobList;
