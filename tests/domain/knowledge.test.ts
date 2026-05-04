import { describe, expect, it } from "vitest";
import {
  deepStudyCards,
  knowledgeModules,
  knowledgeSeedTasks,
  modulesForTrack
} from "../../src/domain/knowledge";
import { tracks } from "../../src/domain/tracks";

describe("knowledge seeds", () => {
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
    expect(deepStudyCards.length).toBeGreaterThanOrEqual(8);
    expect(deepStudyCards.every((card) => card.coreIdeas.length >= 3)).toBe(true);
    expect(deepStudyCards.every((card) => card.sources.length > 0)).toBe(true);
    expect(deepStudyCards.every((card) => card.goodNotes && card.obsidian && card.notion)).toBe(true);
  });
});
