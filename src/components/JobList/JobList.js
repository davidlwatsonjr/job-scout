import PropTypes from "prop-types";
import "./JobList.css";

function JobList({ jobList, updateJob }) {
  const todayDate = new Date().toLocaleDateString();
  return (
    <ul data-testid="job-list" className="JobList">
      {jobList?.map?.((job) => (
        <li className="JobListItem" key={job.fullLinkMD5}>
          {job.createdDate === todayDate && "🌟"}
          <a
            href={job.fullLink}
            target="_blank"
            rel="noopener noreferrer"
            title={job.createdDate}
          >
            {job.title}
          </a>
          {job.createdDate === todayDate && "🌟"}
          {!job.applied ? (
            <button onClick={() => updateJob(job, { applied: true })}>
              Mark as applied
            </button>
          ) : (
            <button onClick={() => updateJob(job, { applied: false })}>
              Unmark as applied
            </button>
          )}
          {job.interested !== false ? (
            <button onClick={() => updateJob(job, { interested: false })}>
              Mark as not interested
            </button>
          ) : (
            <button onClick={() => updateJob(job, { interested: true })}>
              Mark as interested
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}

JobList.propTypes = {
  jobList: PropTypes.arrayOf(
    PropTypes.shape({
      fullLinkMD5: PropTypes.string,
      fullLink: PropTypes.string,
      title: PropTypes.string,
      createdDate: PropTypes.string,
    }),
  ),
  updateJob: PropTypes.func,
};

export default JobList;
