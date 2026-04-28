import { describe, expect, it } from "vitest";
import { isWriteAllowed } from "../../server/auth";

describe("isWriteAllowed", () => {
  it("allows writes when no app key is configured", () => {
    expect(isWriteAllowed(null, undefined)).toBe(true);
  });

  it("rejects writes when a configured key is missing", () => {
    expect(isWriteAllowed("local-secret", undefined)).toBe(false);
  });

  it("allows writes when the request key matches the configured key", () => {
    expect(isWriteAllowed("local-secret", "local-secret")).toBe(true);
  });

  it("rejects writes when the request key is wrong", () => {
    expect(isWriteAllowed("local-secret", "wrong-key")).toBe(false);
  });

  it("requires a configured key for GitHub Pages writes", () => {
    expect(isWriteAllowed(null, undefined, "https://77zmf.github.io")).toBe(false);
    expect(isWriteAllowed("local-secret", undefined, "https://77zmf.github.io")).toBe(false);
    expect(isWriteAllowed("local-secret", "local-secret", "https://77zmf.github.io")).toBe(true);
  });
});
