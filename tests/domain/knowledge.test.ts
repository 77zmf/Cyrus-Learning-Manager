import { describe, expect, it } from "vitest";
import {
  deepStudyCards,
  knowledgeModules,
  knowledgeSeedTasks,
  modulesForTrack
} from "../../src/domain/knowledge";
import { tracks } from "../../src/domain/tracks";

describe("knowledge seeds", () => {
  it("exposes the 3Blue1Brown math-intuition track", () => {
    expect(tracks.some((track) => track.id === "3blue1brown")).toBe(true);
    expect(
      knowledgeModules.some(
        (module) =>
          module.track === "3blue1brown" &&
          module.title === "3Blue1Brown autonomous-driving math intuition"
      )
    ).toBe(true);
    expect(
      knowledgeSeedTasks.some(
        (task) =>
          task.track === "3blue1brown" &&
          task.id === "seed_3blue1brown_linear_algebra_week"
      )
    ).toBe(true);
  });

  it("provides at least one sourced module for every track", () => {
    for (const track of tracks) {
      const modules = modulesForTrack(track.id);
      expect(modules.length).toBeGreaterThan(0);
      expect(modules.every((module) => module.sources.length > 0)).toBe(true);
    }
  });

  it("includes initial executable tasks for every track", () => {
    const trackIds = new Set(tracks.map((track) => track.id));
    const taskTrackIds = new Set(knowledgeSeedTasks.map((task) => task.track));

    expect(taskTrackIds).toEqual(trackIds);
    expect(knowledgeSeedTasks.some((task) => task.status === "active")).toBe(true);
  });

  it("keeps module and task identifiers stable", () => {
    expect(new Set(knowledgeModules.map((module) => module.id)).size).toBe(
      knowledgeModules.length
    );
    expect(new Set(deepStudyCards.map((card) => card.id)).size).toBe(
      deepStudyCards.length
    );
    expect(new Set(knowledgeSeedTasks.map((task) => task.id)).size).toBe(
      knowledgeSeedTasks.length
    );
  });

  it("keeps deep study cards actionable and sourced", () => {
    expect(deepStudyCards.length).toBeGreaterThanOrEqual(15);
    expect(deepStudyCards.some((card) => card.id === "deep-reconstruction-slam-handoff")).toBe(true);
    expect(deepStudyCards.some((card) => card.id === "deep-slam-state-estimation-map")).toBe(true);
    expect(deepStudyCards.some((card) => card.id === "deep-sfm-mvs-colmap-reconstruction")).toBe(true);
    expect(deepStudyCards.some((card) => card.id === "deep-vio-imu-preintegration")).toBe(true);
    expect(deepStudyCards.some((card) => card.id === "deep-lidar-icp-lio-sam")).toBe(true);
    expect(deepStudyCards.some((card) => card.id === "deep-semantic-neural-slam-map")).toBe(true);
    expect(deepStudyCards.some((card) => card.title === "IELTS 输出到错误归因")).toBe(true);
    expect(deepStudyCards.some((card) => card.title === "哲学论证到工程判断")).toBe(true);
    expect(deepStudyCards.every((card) => card.coreIdeas.length >= 3)).toBe(true);
    expect(deepStudyCards.every((card) => card.sources.length > 0)).toBe(true);
    expect(deepStudyCards.every((card) => card.goodNotes && card.obsidian && card.notion)).toBe(true);
    expect(deepStudyCards.every((card) => card.practiceQuestions.length === 3)).toBe(true);
    expect(deepStudyCards.every((card) => card.formulaCheck.choices.some((choice) => choice.isCorrect))).toBe(true);
    expect(deepStudyCards.every((card) => card.goodNotesCheck.expected.length > 0)).toBe(true);
  });

  it("adds a complete SLAM and 3D reconstruction first line", () => {
    expect(knowledgeModules).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: "slam-zero-to-map",
          track: "world-spatial-models",
          title: "SLAM zero-to-map first line"
        }),
        expect.objectContaining({
          id: "sfm-mvs-colmap-lab",
          track: "world-spatial-models",
          title: "SfM, MVS, and COLMAP reconstruction lab"
        }),
        expect.objectContaining({
          id: "nerf-3dgs-validation-assets",
          track: "world-spatial-models",
          title: "NeRF and 3DGS validation asset bridge"
        }),
        expect.objectContaining({
          id: "vio-imu-preintegration",
          track: "world-spatial-models",
          title: "VIO and IMU preintegration bridge"
        }),
        expect.objectContaining({
          id: "lidar-icp-lio-sam",
          track: "world-spatial-models",
          title: "LiDAR SLAM, ICP, and LIO line"
        }),
        expect.objectContaining({
          id: "semantic-neural-slam-map",
          track: "world-spatial-models",
          title: "Semantic and neural SLAM map bridge"
        })
      ])
    );

    expect(knowledgeSeedTasks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: "seed_slam_zero_to_map",
          track: "world-spatial-models",
          status: "active"
        }),
        expect.objectContaining({
          id: "seed_colmap_sfm_mvs_lab",
          track: "world-spatial-models",
          status: "active"
        }),
        expect.objectContaining({
          id: "seed_nerf_3dgs_validation_asset",
          track: "world-spatial-models",
          status: "active"
        }),
        expect.objectContaining({
          id: "seed_vio_imu_preintegration",
          track: "world-spatial-models",
          status: "active"
        }),
        expect.objectContaining({
          id: "seed_lidar_icp_lio_sam",
          track: "world-spatial-models",
          status: "active"
        }),
        expect.objectContaining({
          id: "seed_semantic_neural_slam_map",
          track: "world-spatial-models",
          status: "active"
        })
      ])
    );
  });

  it("keeps world-spatial modules rich enough for self-paced study", () => {
    const worldSpatialModules = modulesForTrack("world-spatial-models");

    expect(worldSpatialModules.length).toBeGreaterThanOrEqual(10);
    expect(worldSpatialModules.every((module) => module.outputs.length >= 3)).toBe(true);
    expect(worldSpatialModules.every((module) => module.sources.length >= 3)).toBe(true);
    expect(
      worldSpatialModules.some((module) =>
        module.sources.some((source) => source.title.includes("VINS-Mono"))
      )
    ).toBe(true);
    expect(
      worldSpatialModules.some((module) =>
        module.sources.some((source) => source.title.includes("LIO-SAM"))
      )
    ).toBe(true);
  });
});
