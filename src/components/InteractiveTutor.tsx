import { useMemo, useState } from "react";
import { controllabilityTutorSteps } from "../domain/interactive-tutor";
import { FormulaVisual } from "./FormulaVisual";

export function InteractiveTutor() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const currentStep = controllabilityTutorSteps[stepIndex];
  const selectedChoiceId = answers[currentStep.id];
  const isCorrect = selectedChoiceId === currentStep.correctChoiceId;
  const answeredSteps = controllabilityTutorSteps.filter((step) => answers[step.id]);
  const isLastStep = stepIndex === controllabilityTutorSteps.length - 1;
  const lessonComplete = isLastStep && isCorrect;

  const goodNotesSummary = useMemo(() => {
    const lines = answeredSteps.map((step) => {
      const prefix = answers[step.id] === step.correctChoiceId ? "[correct]" : "[review]";
      return `${prefix} ${step.noteLine}`;
    });

    return [
      "## GoodNotes Summary",
      "Page: 002 可控性 Controllability",
      "Topic: rank test for controllability",
      ...lines
    ].join("\n");
  }, [answeredSteps, answers]);

  const hermesCloseout = useMemo(
    () =>
      [
        "## Hermes Closeout",
        `Evidence: completed ${answeredSteps.length}/${controllabilityTutorSteps.length} interaction checks`,
        `Status: ${lessonComplete ? "done" : "active"}`,
        "Blocker: wrong or unanswered checks need review",
        "Owner: Cyrus",
        `Next action: ${lessonComplete ? "move to observability or LQR" : "answer the current question"}`,
        "Verification path: explain AB, C=[B AB], and rank(C)<n without looking at the options"
      ].join("\n"),
    [answeredSteps.length, lessonComplete]
  );

  function chooseAnswer(choiceId: string) {
    setAnswers((current) => ({ ...current, [currentStep.id]: choiceId }));
  }

  function nextStep() {
    setStepIndex((current) => Math.min(current + 1, controllabilityTutorSteps.length - 1));
  }

  return (
    <section className="panel tutor-panel">
      <div className="section-heading">
        <h2>Interactive Tutor</h2>
        <p>
          One small question at a time. Answer, get immediate feedback, then copy the generated
          GoodNotes and Hermes closeout notes.
        </p>
      </div>

      <div className="tutor-layout">
        <article className="tutor-question">
          <span>
            Step {stepIndex + 1} / {controllabilityTutorSteps.length}
          </span>
          <h3>{currentStep.title}</h3>
          <p className="tutor-page">GoodNotes page: {currentStep.goodNotesPage}</p>
          <strong>{currentStep.prompt}</strong>
          <FormulaVisual
            label="Controllability question formula"
            latex={currentStep.formula}
            terms={currentStep.formulaTerms}
          />

          <div className="choice-grid" aria-label="Answer choices">
            {currentStep.choices.map((choice) => (
              <button
                className={choiceButtonClass(choice.id, selectedChoiceId, currentStep.correctChoiceId)}
                key={choice.id}
                onClick={() => chooseAnswer(choice.id)}
                type="button"
              >
                {choice.label}. {choice.value}
              </button>
            ))}
          </div>

          {selectedChoiceId ? (
            <div className={isCorrect ? "feedback is-correct" : "feedback is-wrong"} role="status">
              <strong>{isCorrect ? "Correct" : "Not yet"}</strong>
              <p>{isCorrect ? currentStep.correctFeedback : currentStep.incorrectFeedback}</p>
            </div>
          ) : null}

          {isCorrect && !lessonComplete ? (
            <button className="next-question" type="button" onClick={nextStep}>
              Next question
            </button>
          ) : null}

          {lessonComplete ? <p className="lesson-complete">Lesson complete</p> : null}
        </article>

        <article
          aria-label="GoodNotes Summary"
          className="study-card template-card tutor-notes"
          role="region"
        >
          <h3>GoodNotes Summary</h3>
          <pre>{goodNotesSummary}</pre>
        </article>

        <article
          aria-label="Hermes Closeout"
          className="study-card template-card tutor-closeout"
          role="region"
        >
          <h3>Hermes Closeout</h3>
          <pre>{hermesCloseout}</pre>
        </article>
      </div>
    </section>
  );
}

function choiceButtonClass(choiceId: string, selectedChoiceId: string | undefined, correctChoiceId: string) {
  if (!selectedChoiceId) {
    return "";
  }

  if (choiceId === correctChoiceId) {
    return "is-correct";
  }

  if (choiceId === selectedChoiceId) {
    return "is-wrong";
  }

  return "";
}
