import { readFileSync } from "node:fs";
import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { App } from "../../src/App";

const healthResponse = {
  ok: true,
  service: "cyrus-local-sync",
  notionConfigured: true,
  obsidianConfigured: false,
  hermesConfigured: true,
  hermesModel: "kimi-k2.6",
  hermesProvider: "Kimi / Moonshot China",
  hermesProfilePath: "/Users/cyber/.hermes/profiles/cyrus",
  notionTarget: "tasks-db",
  obsidianVaultPath: "/Users/cyber/Documents/Obsidian Vault/Cyrus-Knowledge"
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

  it("keeps tab views behind lazy Suspense boundaries", () => {
    const appSource = readFileSync("src/App.tsx", "utf8");

    expect(appSource).toContain("lazy(");
    expect(appSource).toContain("<Suspense");
    expect(appSource).not.toContain('import { LearnView }');
    expect(appSource).not.toContain('import { CoursesView }');
    expect(appSource).not.toContain('import { HermesConsole }');
  });
});
