import PropTypes from "prop-types";
import "./JobList.css";

function JobList({ jobList }) {
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
};

export default JobList;
