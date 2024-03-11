import { render, screen } from "@testing-library/react";
import JobList from "./JobList";

test("JobList renders job-list element", () => {
  render(<JobList />);
  const jobListElement = screen.getByTestId("job-list");
  expect(jobListElement).toBeInTheDocument();
});
