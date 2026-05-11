import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();

function readSource(path: string) {
  return readFileSync(join(root, path), "utf8");
}

describe("style source structure", () => {
  it("keeps global design tokens and base shell rules in focused CSS modules", () => {
    const entry = readSource("src/styles.css");
    const tokensPath = join(root, "src/styles/tokens.css");
    const basePath = join(root, "src/styles/base.css");

    expect(existsSync(tokensPath)).toBe(true);
    expect(existsSync(basePath)).toBe(true);
    expect(entry).toContain('@import "./styles/tokens.css";');
    expect(entry).toContain('@import "./styles/base.css";');
    expect(entry).not.toMatch(/:root\s*\{/);
    expect(entry).not.toMatch(/^body\s*\{/m);
  });

  it("keeps liquid glass primitives centralized for reuse across learning surfaces", () => {
    const tokens = readSource("src/styles/tokens.css");
    const base = readSource("src/styles/base.css");

    expect(tokens).toContain("--glass:");
    expect(tokens).toContain("--glass-strong:");
    expect(tokens).toContain("--glass-edge:");
    expect(base).toContain(".panel");
    expect(base).toContain("backdrop-filter: blur(22px) saturate(135%)");
  });

  it("keeps formula and KaTeX styling in a focused math stylesheet", () => {
    const entry = readSource("src/styles.css");
    const mathPath = join(root, "src/styles/math.css");

    expect(existsSync(mathPath)).toBe(true);
    expect(entry).toContain('@import "./styles/math.css";');
    expect(entry).not.toContain(".app-shell .katex");
    expect(entry).not.toContain(".formula-render .katex-display");

    const math = readSource("src/styles/math.css");

    expect(math).toContain(".math-inline");
    expect(math).toContain(".app-shell .katex");
    expect(math).toContain(".formula-render");
    expect(math).toContain(".formula-term-grid");
  });

  it("keeps Manim Studio and guided storyboard styling in a focused stylesheet", () => {
    const entry = readSource("src/styles.css");
    const manimPath = join(root, "src/styles/manim.css");

    expect(existsSync(manimPath)).toBe(true);
    expect(entry).toContain('@import "./styles/manim.css";');
    expect(entry).not.toMatch(/^\.manim-studio\s*\{/m);
    expect(entry).not.toMatch(/^\.guided-manim-card\s*\{/m);

    const manim = readSource("src/styles/manim.css");

    expect(manim).toContain(".manim-studio");
    expect(manim).toContain(".manim-topic-tabs");
    expect(manim).toContain(".manim-video-placeholder");
    expect(manim).toContain(".guided-manim-card");
    expect(manim).toContain(".guided-manim-stage");
  });

  it("keeps spatial visualization styling in a focused stylesheet", () => {
    const entry = readSource("src/styles.css");
    const spatialPath = join(root, "src/styles/spatial.css");

    expect(existsSync(spatialPath)).toBe(true);
    expect(entry).toContain('@import "./styles/spatial.css";');
    expect(entry).not.toMatch(/^\.projection-drag-lab\s*\{/m);
    expect(entry).not.toMatch(/^\.spatial-drag-lab\s*\{/m);
    expect(entry).not.toMatch(/^\.quaternion-stage\s*\{/m);

    const spatial = readSource("src/styles/spatial.css");

    expect(spatial).toContain(".projection-drag-lab");
    expect(spatial).toContain(".slam-map-stage");
    expect(spatial).toContain(".reconstruction-stage");
    expect(spatial).toContain(".quaternion-stage");
    expect(spatial).toContain(".spatial-stage-strip");
  });

  it("keeps guided lesson workflow styling in a focused stylesheet", () => {
    const entry = readSource("src/styles.css");
    const lessonsPath = join(root, "src/styles/lessons.css");

    expect(existsSync(lessonsPath)).toBe(true);
    expect(entry).toContain('@import "./styles/lessons.css";');
    expect(entry).not.toMatch(/^\.guided-path\s*\{/m);
    expect(entry).not.toMatch(/^\.guided-lesson-grid\s*\{/m);
    expect(entry).not.toMatch(/^\.lesson-ready-check\s*\{/m);

    const lessons = readSource("src/styles/lessons.css");

    expect(lessons).toContain(".guided-path");
    expect(lessons).toContain(".course-toc");
    expect(lessons).toContain(".guided-lesson-card");
    expect(lessons).toContain(".ready-choice-grid");
    expect(lessons).toContain(".self-check");
  });

  it("keeps global Liquid Glass coverage in a focused stylesheet", () => {
    const entry = readSource("src/styles.css");
    const appEntry = readSource("src/main.tsx");
    const glassPath = join(root, "src/styles/glass.css");

    expect(existsSync(glassPath)).toBe(true);
    expect(entry).not.toContain('@import "./styles/glass.css";');
    expect(appEntry).toMatch(/import "\.\/styles\.css";\nimport "\.\/styles\/glass\.css";/);
    expect(entry).not.toContain("/* iOS-style Liquid Glass web material. */");
    expect(entry).not.toContain("body::before,\nbody::after");

    const glass = readSource("src/styles/glass.css");

    expect(glass).toContain("/* iOS-style Liquid Glass web material. */");
    expect(glass).toContain("backdrop-filter: blur");

    [
      ".module-block",
      ".module-output",
      ".source-links",
      ".threeblue-source-strip",
      ".route-card",
      ".field-grid span",
      ".hermes-command",
      ".hermes-form",
      ".hermes-output",
      ".tutor-question",
      ".feedback",
      ".lesson-complete",
      ".task-row",
      ".progress-row",
      ".status-card",
      ".micro-question",
      ".formula-check",
      ".goodnotes-output-check",
      ".manim-scene-card",
      ".manim-video-placeholder",
      ".empty-state",
      ".error",
    ].forEach((selector) => {
      expect(glass).toContain(selector);
    });
  });
});
