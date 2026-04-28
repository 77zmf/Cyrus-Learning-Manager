import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { App } from "../../src/App";

describe("App", () => {
  it("renders the learning manager tracks", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: "Cyrus Learning Manager" })).toBeInTheDocument();
    expect(screen.getByText("Tsinghua Automation")).toBeInTheDocument();
    expect(screen.getByText("MIT EECS")).toBeInTheDocument();
    expect(screen.getByText("IELTS")).toBeInTheDocument();
    expect(screen.getByText("Philosophy")).toBeInTheDocument();
  });
});
