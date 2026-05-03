import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { App } from "../../src/App";

const healthResponse = {
  ok: true,
  service: "cyrus-local-sync",
  notionConfigured: true,
  obsidianConfigured: false
};

describe("App", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders the learning manager shell", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn((url: string) =>
        Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve(
              url.endsWith("/health")
                ? healthResponse
                : {
                    tasks: []
                  }
            )
        })
      )
    );

    render(<App />);

    expect(screen.getByRole("heading", { name: "Cyrus Learning Manager" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Learn" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Notebook" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Map" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Library" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Review" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Hermes" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Dashboard" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Tasks" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Progress" })).not.toBeInTheDocument();
    expect(await screen.findByText("Local Sync: connected")).toBeInTheDocument();
  });
});
