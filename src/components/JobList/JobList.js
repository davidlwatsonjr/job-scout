import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import IconButton from "@mui/material/IconButton";
import PropTypes from "prop-types";
import "./JobList.css";

function JobList({ jobList, updateJob }) {
  const todayDate = new Date().toLocaleDateString();
  return (
    <ul data-testid="job-list" className="JobList">
      {jobList?.map?.((job) => (
        <li className="JobListItem" key={job.fullLinkMD5}>
          <div className="JobListItemInfo">
            <a
              href={job.fullLink}
              target="_blank"
              rel="noopener noreferrer"
              title={job.createdDate}
            >
              {job.title}
            </a>
            {job.createdDate === todayDate && "🌟"}
          </div>
          <div className="JobListItemActions">
            {!job.applied && job.interested !== false && (
              <>
                <IconButton
                  title="Mark as applied"
                  onClick={() => updateJob(job, { applied: true })}
                >
                  <CheckBoxOutlineBlankIcon />
                </IconButton>
                <IconButton
                  title="Mark as uninterested"
                  onClick={() => updateJob(job, { interested: false })}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </>
            )}
            {job.applied && (
              <IconButton
                title="Unmark as applied"
                onClick={() => updateJob(job, { applied: false })}
              >
                <CheckBoxIcon />
              </IconButton>
            )}
            {job.interested === false && (
              <IconButton
                title="Mark as interested"
                onClick={() => updateJob(job, { interested: true })}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </div>
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
