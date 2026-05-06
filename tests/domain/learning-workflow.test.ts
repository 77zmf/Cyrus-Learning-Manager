import { describe, expect, it } from "vitest";
import {
  beginnerFoundations,
  beginnerStartSteps,
  guidedControlLessons
} from "../../src/domain/learning-workflow";

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

    expect(guidedControlLessons).toHaveLength(14);
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
});
