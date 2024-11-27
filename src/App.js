import { useCallback, useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import createTheme from "@mui/material/styles/createTheme";
import Footer from "./components/Footer/Footer";
import JobList from "./components/JobList/JobList";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

if (!localStorage.getItem("userUUID")) {
  localStorage.setItem("userUUID", crypto.randomUUID());
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3391ff",
    },
  },
});

const JOBS_API_URL = "https://jobs.davidlwatsonjr.com/jobs";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [shouldListReload, setShouldListReload] = useState(false);
  const [jobList, setJobList] = useState(
    localStorage.getItem("jobList")
      ? JSON.parse(localStorage.getItem("jobList"))
      : [],
  );

  const [highPriorityJobs, setHighPriorityJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [uninterestedJobs, setUninterestedJobs] = useState([]);

  const loadList = useCallback(async () => {
    const response = await fetch(JOBS_API_URL, {
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
    setHighPriorityJobs(
      jobList.filter((job) => job.isHighPriority && job.interested !== false),
    );
    setAppliedJobs(
      jobList.filter((job) => job.applied && job.interested !== false),
    );
    setUninterestedJobs(jobList.filter((job) => job.interested === false));
  }, [jobList]);

  useEffect(() => {
    setShouldListReload(true);
  }, []);

  const updateJobInJobList = (job) => {
    const newJobList = jobList.map((j) =>
      j.fullLinkMD5 === job.fullLinkMD5 ? { ...j, ...job } : j,
    );
    setJobList(newJobList);
  };

  const persistJobProperties = async (job, properties) => {
    const response = await fetch(`${JOBS_API_URL}/${job.fullLinkMD5}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-useruuid": localStorage.getItem("userUUID"),
      },
      body: JSON.stringify(properties),
    });
    if (!response.ok) {
      throw new Error("Failed to update job");
    }
    return await response.json();
  };

  const updateJob = async (job, properties) => {
    updateJobInJobList({ ...job, ...properties });
    try {
      const persistedJob = await persistJobProperties(job, properties);
      updateJobInJobList(persistedJob);
    } catch (e) {
      console.error(`Reloading job list because of error ${e}`);
      setShouldListReload(true);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline enableColorScheme />
      {isLoading && (
        <Box position="fixed" top={0} left={0} right={0}>
          <LinearProgress />
        </Box>
      )}
      <Container maxWidth="md" sx={{ textAlign: "center" }}>
        <Typography component="h1" variant="h4" padding={2}>
          Job List
        </Typography>
        {highPriorityJobs.length > 0 && (
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              High Priority Jobs ({highPriorityJobs.length})
            </AccordionSummary>
            <AccordionDetails>
              <JobList jobList={highPriorityJobs} updateJob={updateJob} />
            </AccordionDetails>
          </Accordion>
        )}
        {appliedJobs.length > 0 && (
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              Applied Jobs ({appliedJobs.length})
            </AccordionSummary>
            <AccordionDetails>
              <JobList jobList={appliedJobs} updateJob={updateJob} />
            </AccordionDetails>
          </Accordion>
        )}
        <JobList
          jobList={jobList.filter(
            (job) => !job.applied && job.interested !== false,
          )}
          updateJob={updateJob}
        />
        {uninterestedJobs.length > 0 && (
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              Uninterested Jobs ({uninterestedJobs.length})
            </AccordionSummary>
            <AccordionDetails>
              <JobList jobList={uninterestedJobs} updateJob={updateJob} />
            </AccordionDetails>
          </Accordion>
        )}
        <Footer />
      </Container>
    </ThemeProvider>
  );
}

export default App;
