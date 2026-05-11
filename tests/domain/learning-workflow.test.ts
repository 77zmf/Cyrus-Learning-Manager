import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  beginnerFoundations,
  beginnerStartSteps,
  guidedControlLessons,
  threeBlueOneBrownLearningPath,
  threeBlueOneBrownSources
} from "../../src/domain/learning-workflow";
import { deriveGuidedManimAssetPath } from "../../src/domain/guided-manim";

describe("beginner learning workflow", () => {
  it("provides a clear five-step beginner start flow", () => {
    expect(beginnerStartSteps).toHaveLength(5);
    expect(beginnerStartSteps[0].title).toBe("选一节课");
    expect(beginnerStartSteps[1].title).toBe("补前置卡");
    expect(beginnerStartSteps[2].title).toBe("做 Ready Check");
    expect(beginnerStartSteps[3].title).toBe("写 GoodNotes");
    expect(beginnerStartSteps[4].title).toBe("连 Obsidian 和 Notion");
  });

  it("covers the minimum prerequisite cards for a zero-base learner", () => {
    const foundationTitles = beginnerFoundations.map((foundation) => foundation.title);

    expect(beginnerFoundations.length).toBeGreaterThanOrEqual(14);
    expect(foundationTitles).toEqual(
      expect.arrayContaining([
        "坐标系和单位",
        "矩阵乘法",
        "方程组",
        "状态、输入、输出",
        "概率和期望",
        "优化目标和约束"
      ])
    );
    expect(
      beginnerFoundations.every(
        (foundation) => foundation.plain && foundation.example && foundation.exercise && foundation.goodNotes
      )
    ).toBe(true);
  });

  it("adds one beginner ready check to every guided control lesson", () => {
    const foundationTitles = new Set(beginnerFoundations.map((foundation) => foundation.title));
    const lessonTitles = guidedControlLessons.map((lesson) => lesson.title);

    expect(guidedControlLessons).toHaveLength(19);
    expect(lessonTitles).toEqual(
      expect.arrayContaining([
        "第 15 课：刚体变换与相机投影",
        "第 16 课：特征匹配与对极几何",
        "第 17 课：SLAM 后端与位姿图优化",
        "第 18 课：SfM/MVS 到 NeRF/3DGS 重建",
        "第 19 课：四元数与三维姿态"
      ])
    );
    expect(guidedControlLessons.every((lesson) => lesson.readyCheck)).toBe(true);
    expect(guidedControlLessons.every((lesson) => foundationTitles.has(lesson.readyCheck.prerequisite))).toBe(true);
    expect(guidedControlLessons.every((lesson) => lesson.readyCheck.conceptAnswer.length > 0)).toBe(true);
    expect(
      guidedControlLessons.every((lesson) =>
        lesson.readyCheck.formulaChoices.some((choice) => choice.isCorrect)
      )
    ).toBe(true);
    expect(guidedControlLessons.every((lesson) => lesson.readyCheck.goodNotesExpected.length > 0)).toBe(true);
  });

  it("adds a Manim storyboard to every guided control lesson", () => {
    expect(guidedControlLessons).toHaveLength(19);
    expect(
      guidedControlLessons.every(
        (lesson) =>
          lesson.manimScene &&
          lesson.manimScene.title &&
          lesson.manimScene.sceneName &&
          lesson.manimScene.assetPath ===
            `manim/${lesson.manimScene.sceneName
              .replace(/^Guided/, "")
              .replace(/Scene$/, "")
              .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
              .toLowerCase()
              .replace(/^/, "guided_")}.mp4` &&
          lesson.manimScene.command === `npm run manim:render -- ${lesson.manimScene.sceneName}` &&
          lesson.manimScene.frames.length >= 3 &&
          lesson.manimScene.goodNotes === lesson.goodNotesPage
      )
    ).toBe(true);
    expect(guidedControlLessons.map((lesson) => lesson.manimScene.sceneName)).toEqual(
      expect.arrayContaining([
        "GuidedStateSpaceScene",
        "GuidedMpcScene",
        "GuidedWorldSpatialInterfaceScene",
        "GuidedQuaternionOrientationScene"
      ])
    );
  });

  it("lets the Manim render CLI render every guided lesson scene", () => {
    const renderScript = readFileSync("scripts/manim/render.mjs", "utf8");

    expect(
      guidedControlLessons.every(
        (lesson) =>
          renderScript.includes(`"${lesson.manimScene.sceneName}"`) &&
          renderScript.includes(`"${lesson.manimScene.assetPath.replace("manim/", "")}"`)
      )
    ).toBe(true);
  });

  it("derives guided Manim asset paths through a shared helper", () => {
    expect(
      guidedControlLessons.every(
        (lesson) => deriveGuidedManimAssetPath(lesson.manimScene.sceneName) === lesson.manimScene.assetPath
      )
    ).toBe(true);
  });

  it("organizes the imported 3Blue1Brown library as a self-paced math bridge", () => {
    const routeTitles = threeBlueOneBrownLearningPath.map((route) => route.title);

    expect(threeBlueOneBrownSources).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          label: "Imported Notion library",
          path: "50_Assets/Imports/3Blue1Brown_Notion_学习库.md"
        }),
        expect.objectContaining({
          label: "Obsidian course map",
          path: "20_Courses/3Blue1Brown/00-3Blue1Brown-Study-Map.md"
        })
      ])
    );
    expect(threeBlueOneBrownLearningPath.length).toBeGreaterThanOrEqual(7);
    expect(routeTitles).toEqual(
      expect.arrayContaining([
        "Linear Algebra: matrix as transform",
        "Calculus: derivative as motion",
        "Differential Equations: state evolution",
        "Euler, Fourier, Laplace: signals as modes",
        "Neural Networks: representation and loss",
        "Probability: uncertainty and belief",
        "Geometry and Groups: spatial transforms"
      ])
    );
    expect(
      threeBlueOneBrownLearningPath.every(
        (route) =>
          route.priority &&
          route.officialUrl &&
          route.formula &&
          route.formulaTerms.length >= 3 &&
          route.goodNotes &&
          route.obsidian &&
          route.notion &&
          route.minimalExperiment
      )
    ).toBe(true);
  });
});
