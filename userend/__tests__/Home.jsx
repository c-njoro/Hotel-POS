import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "../src/pages/index";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

describe("Home component", () => {
  it("should display the correct message", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );

    const message = screen.getByText(
      "Every interaction with a customer is a chance to make someone's day a little better. Keep up the great work!"
    );
    expect(message).toBeInTheDocument();
  });
});
