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

    expect(guidedControlLessons).toHaveLength(26);
    expect(lessonTitles).toEqual(
      expect.arrayContaining([
        "第 15 课：刚体变换与相机投影",
        "第 16 课：特征匹配与对极几何",
        "第 17 课：SLAM 后端与位姿图优化",
        "第 18 课：SfM/MVS 到 NeRF/3DGS 重建",
        "第 19 课：四元数与三维姿态",
        "第 20 课：VIO 与 IMU 预积分",
        "第 21 课：LiDAR SLAM、ICP 与 LIO",
        "第 22 课：语义与神经 SLAM 地图",
        "第 23 课：相机、LiDAR 与 IMU 标定",
        "第 24 课：双目、深度估计与稠密 MVS",
        "第 25 课：动态三维重建与 Scene Flow",
        "第 26 课：重建质量评估与验证准入"
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

  it("adds video entry points to every guided lesson", () => {
    const controlLesson = guidedControlLessons.find((lesson) => lesson.id === "lesson-lqr");
    const slamLesson = guidedControlLessons.find((lesson) => lesson.id === "lesson-lidar-icp-lio-sam");

    expect(guidedControlLessons.every((lesson) => lesson.videoSources.length > 0)).toBe(true);
    expect(guidedControlLessons.every((lesson) => lesson.videoSources.every((source) => source.url.startsWith("https://")))).toBe(
      true
    );
    expect(controlLesson?.videoSources.map((source) => source.title)).toEqual(
      expect.arrayContaining(["MIT 6.003 lecture videos", "Underactuated Robotics lecture videos"])
    );
    expect(slamLesson?.videoSources.map((source) => source.title)).toEqual(
      expect.arrayContaining(["Cyrill Stachniss SLAM course", "Cyrill Stachniss photogrammetry videos"])
    );
  });

  it("adds a Manim storyboard to every guided control lesson", () => {
    expect(guidedControlLessons).toHaveLength(26);
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
        "GuidedQuaternionOrientationScene",
        "GuidedVioImuPreintegrationScene",
        "GuidedLidarSlamIcpScene",
        "GuidedSemanticNeuralSlamScene",
        "GuidedSensorCalibrationScene",
        "GuidedStereoDepthMvsScene",
        "GuidedDynamicReconstructionScene",
        "GuidedReconstructionEvaluationScene"
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

  it("adds a self-paced factor graph optimizer launch and GoodNotes derivation card", async () => {
    const { learningLaunchQueue, goodNotesDerivationCards } = await import(
      "../../src/domain/learning-workflow"
    );

    expect(learningLaunchQueue).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: "Factor graph optimizer sprint",
          prompt: expect.stringContaining("residual")
        }),
        expect.objectContaining({
          title: "Loop closure relocalization sprint",
          prompt: expect.stringContaining("DBoW2")
        })
      ])
    );

    expect(goodNotesDerivationCards).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: "Factor graph least-squares optimizer",
          formula: expect.stringContaining("J^TWJ"),
          formulaTerms: expect.arrayContaining([
            expect.objectContaining({ label: "变量节点" }),
            expect.objectContaining({ label: "残差因子" }),
            expect.objectContaining({ label: "正规方程" })
          ])
        }),
        expect.objectContaining({
          title: "Loop closure candidate and verification edge",
          formula: expect.stringContaining("s(q,i)"),
          formulaTerms: expect.arrayContaining([
            expect.objectContaining({ label: "候选地点" }),
            expect.objectContaining({ label: "相似度得分" }),
            expect.objectContaining({ label: "几何验证" })
          ])
        })
      ])
    );
  });
});
