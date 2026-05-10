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
    expect(deepStudyCards.length).toBeGreaterThanOrEqual(12);
    expect(deepStudyCards.some((card) => card.id === "deep-reconstruction-slam-handoff")).toBe(true);
    expect(deepStudyCards.some((card) => card.id === "deep-slam-state-estimation-map")).toBe(true);
    expect(deepStudyCards.some((card) => card.id === "deep-sfm-mvs-colmap-reconstruction")).toBe(true);
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
        })
      ])
    );
  });
});
