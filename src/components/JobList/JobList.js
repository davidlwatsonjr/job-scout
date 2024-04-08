import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import PropTypes from "prop-types";

function JobList({ jobList, updateJob }) {
  const todayDate = new Date().toLocaleDateString();
  return (
    <List>
      {jobList?.map?.((job) => (
        <ListItem key={job.fullLinkMD5}>
          <ListItemText
            primary={
              <>
                <Link
                  href={job.fullLink}
                  underline="hover"
                  target="_blank"
                  rel="noopener noreferrer"
                  title={job.createdDate}
                >
                  {job.title}
                </Link>
                {job.createdDate === todayDate && "🌟"}
              </>
            }
            secondary={new URL(job.fullLink).hostname}
          />
          {!job.applied ? (
            <IconButton
              title="Mark as applied"
              onClick={() => updateJob(job, { applied: true })}
            >
              <CheckBoxOutlineBlankIcon />
            </IconButton>
          ) : (
            <IconButton
              title="Unmark as applied"
              onClick={() => updateJob(job, { applied: false })}
            >
              <CheckBoxIcon />
            </IconButton>
          )}
          {job.interested !== false ? (
            <IconButton
              title="Mark as uninterested"
              onClick={() => updateJob(job, { interested: false })}
            >
              <DeleteOutlineIcon />
            </IconButton>
          ) : (
            <IconButton
              title="Mark as interested"
              onClick={() => updateJob(job, { interested: true })}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </ListItem>
      ))}
    </List>
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
