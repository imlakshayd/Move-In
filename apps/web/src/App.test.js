import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Sign In link", () => {
  render(<App />);
  const signInLink = screen.getByRole("link", { name: /sign in/i });
  expect(signInLink).toBeInTheDocument();
});
