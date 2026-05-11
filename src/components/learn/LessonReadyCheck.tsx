import { useState } from "react";
import type { GuidedLesson, ReadyCheckFormulaChoice } from "../../domain/learning-workflow";
import { MathText } from "../MathText";

export function LessonReadyCheck({ lesson }: { lesson: GuidedLesson }) {
  const [showConceptAnswer, setShowConceptAnswer] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [goodNotesDone, setGoodNotesDone] = useState(false);
  const selectedFormula = lesson.readyCheck.formulaChoices.find((choice) => choice.label === selectedChoice);

  return (
    <section className="lesson-ready-check" aria-label={`${lesson.title} Ready Check`}>
      <div className="ready-check-heading">
        <h4>Ready Check</h4>
        <p className="ready-prereq">卡住就回到：{lesson.readyCheck.prerequisite}</p>
      </div>

      <div className="ready-check-block">
        <span>概念题</span>
        <p>
          <MathText text={lesson.readyCheck.conceptQuestion} />
        </p>
        <button
          aria-label={`显示 ${lesson.title} Ready Check 概念答案`}
          type="button"
          onClick={() => setShowConceptAnswer((value) => !value)}
        >
          {showConceptAnswer ? "隐藏答案" : "显示答案"}
        </button>
        {showConceptAnswer ? (
          <strong role="status">
            <MathText text={lesson.readyCheck.conceptAnswer} />
          </strong>
        ) : null}
      </div>

      <div className="ready-check-block">
        <span>公式选择</span>
        <p>
          <MathText text={lesson.readyCheck.formulaPrompt} />
        </p>
        <div className="ready-choice-grid">
          {lesson.readyCheck.formulaChoices.map((choice) => (
            <button
              aria-label={`${lesson.title} Ready Check 公式选项 ${choice.label}`}
              aria-pressed={selectedChoice === choice.label}
              className={readyChoiceClass(choice, selectedFormula)}
              key={choice.label}
              type="button"
              onClick={() => setSelectedChoice(choice.label)}
            >
              <span>{choice.label}.</span>
              <MathText text={choice.value} />
            </button>
          ))}
        </div>
        {selectedFormula ? (
          <strong role="status">
            <MathText text={selectedFormula.feedback} />
          </strong>
        ) : null}
      </div>

      <div className="ready-check-block">
        <span>GoodNotes 输出</span>
        <p>
          <MathText text={lesson.readyCheck.goodNotesPrompt} />
        </p>
        <label>
          <input
            aria-label={`确认 ${lesson.title} Ready Check GoodNotes 输出`}
            checked={goodNotesDone}
            type="checkbox"
            onChange={(event) => setGoodNotesDone(event.target.checked)}
          />
          我已写完这一页
        </label>
        {goodNotesDone ? (
          <strong role="status">
            <MathText text={lesson.readyCheck.goodNotesExpected} />
          </strong>
        ) : null}
      </div>
    </section>
  );
}

function readyChoiceClass(choice: ReadyCheckFormulaChoice, selectedChoice: ReadyCheckFormulaChoice | undefined) {
  if (selectedChoice?.label !== choice.label) {
    return undefined;
  }

  return choice.isCorrect ? "is-correct" : "is-wrong";
}
