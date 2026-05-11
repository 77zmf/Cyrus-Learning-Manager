import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();

function readSource(path: string) {
  return readFileSync(join(root, path), "utf8");
}

describe("learning page source structure", () => {
  it("keeps LearnView as an orchestrator instead of owning every section", () => {
    const source = readSource("src/components/LearnView.tsx");

    expect(source).toContain('from "./learn/LearningDirectory"');
    expect(source).toContain('from "./learn/BeginnerStartPanel"');
    expect(source).toContain('from "./learn/FoundationBridgePanel"');
    expect(source).toContain('from "./learn/ThreeBlueOneBrownBridge"');
    expect(source).toContain('from "./learn/GuidedPathPanel"');
    expect(source).toContain('from "./learn/LearningLaunchQueue"');
    expect(source).not.toContain("function LearningDirectory(");
    expect(source).not.toContain("function ThreeBlueOneBrownBridge(");
    expect(source).not.toContain("function GuidedLessonManimStoryboard(");
    expect(source).not.toContain("function LessonReadyCheck(");
  });

  it("keeps the spatial public entry as a thin compatibility export", () => {
    const source = readSource("src/components/SpatialDragLabs.tsx");

    expect(source).toContain('export { SpatialPanelInteraction } from "./spatial/SpatialPanelInteraction";');
    expect(source).not.toMatch(/\b(import|function|const|let|class)\b/);
  });
});
