import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const css = readFileSync(join(process.cwd(), "src/styles.css"), "utf8");

const formulaBearingContainers = [
  ".study-main",
  ".module-block",
  ".self-check",
  ".formula-term-grid",
  ".route-card",
  ".tutor-question"
];

describe("math style isolation", () => {
  it("does not style every nested span inside formula-bearing containers", () => {
    for (const container of formulaBearingContainers) {
      expect(css, `${container} must not target every descendant span`).not.toMatch(
        unsafeDescendantSpanSelector(container)
      );
    }
  });

  it("resets KaTeX internals away from app badge and label styling", () => {
    expect(css).toContain(".app-shell .katex");
    expect(css).toContain("text-transform: none");
    expect(css).toContain("border: 0");
  });
});

function unsafeDescendantSpanSelector(container: string) {
  const escaped = container.replace(".", "\\.");
  return new RegExp(`(^|[,{\\n])\\s*${escaped}\\s+span\\s*([,{])`, "m");
}
