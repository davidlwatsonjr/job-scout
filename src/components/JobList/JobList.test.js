import { render, screen } from "@testing-library/react";
import JobList from "./JobList";

test("JobList renders JobList ul", () => {
  render(<JobList />);
  const jobListElement = screen.getByTestId("job-list-ul");
  expect(jobListElement).toBeInTheDocument();
});
