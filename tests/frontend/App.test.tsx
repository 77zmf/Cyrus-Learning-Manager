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
    expect(screen.getByRole("button", { name: "Dashboard" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Hermes" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Tasks" })).toBeInTheDocument();
    expect(await screen.findByText("Local Sync: connected")).toBeInTheDocument();
  });
});
