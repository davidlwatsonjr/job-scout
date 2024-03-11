import { render, screen } from '@testing-library/react';
import App from './App';

test("App renders JobList", () => {
  render(<App />);
  const jobListElement = screen.getByTestId("job-list");
  expect(jobListElement).toBeInTheDocument();
});
