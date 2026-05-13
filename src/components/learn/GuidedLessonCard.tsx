import { beginnerLessonBridges } from "../../domain/learning-workflow";
import type { GuidedLesson } from "../../domain/learning-workflow";
import { FormulaVisual } from "../FormulaVisual";
import { MathText } from "../MathText";
import { GuidedLessonManimStoryboard } from "./GuidedLessonManimStoryboard";
import { LessonReadyCheck } from "./LessonReadyCheck";

interface GuidedLessonCardProps {
  lesson: GuidedLesson;
  isOpen: boolean;
  onToggle: (lessonId: string, isOpen: boolean) => void;
}

export function GuidedLessonCard({ lesson, isOpen, onToggle }: GuidedLessonCardProps) {
  const beginner = beginnerLessonBridges[lesson.id];

  return (
    <details
      className="guided-lesson-card"
      id={lesson.id}
      open={isOpen}
      onToggle={(event) => onToggle(lesson.id, event.currentTarget.open)}
    >
      <summary className="lesson-summary">
        <span>
          <MathText text={lesson.goal} />
        </span>
        <h3>{lesson.title}</h3>
        {beginner ? (
          <p>
            <MathText text={beginner.question} />
          </p>
        ) : null}
      </summary>
      <div className="lesson-detail-body">
        {beginner ? (
          <section className="beginner-lesson" aria-label={`${lesson.title} beginner entry`}>
            <h4>小白入口</h4>
            <strong>
              <MathText text={beginner.question} />
            </strong>
            <p>
              <MathText text={beginner.intuition} />
            </p>
            <dl className="beginner-dl">
              <div>
                <dt>生活例子</dt>
                <dd>
                  <MathText text={beginner.example} />
                </dd>
              </div>
              <div>
                <dt>最小练习</dt>
                <dd>
                  <MathText text={beginner.exercise} />
                </dd>
              </div>
              <div>
                <dt>GoodNotes</dt>
                <dd>
                  <MathText text={beginner.goodNotes} />
                </dd>
              </div>
            </dl>
          </section>
        ) : null}
        <FormulaVisual label={lesson.title} latex={lesson.formula} terms={lesson.formulaTerms} />
        <GuidedLessonManimStoryboard lesson={lesson} />
        <section className="lesson-video-links" aria-label={`${lesson.title} video links`}>
          <h4>Video links</h4>
          <div className="source-links">
            {lesson.videoSources.map((source) => (
              <a href={source.url} key={source.url} rel="noreferrer" target="_blank">
                {source.title}
              </a>
            ))}
          </div>
        </section>
        <LessonReadyCheck lesson={lesson} />
        <strong>
          <MathText text={lesson.now} />
        </strong>
        <dl className="compact-dl">
          <div>
            <dt>GoodNotes</dt>
            <dd>{lesson.goodNotesPage}</dd>
          </div>
          <div>
            <dt>Obsidian</dt>
            <dd>{lesson.obsidianNode}</dd>
          </div>
          <div>
            <dt>Notion</dt>
            <dd>{lesson.notionRow}</dd>
          </div>
        </dl>
        <ol className="guided-step-list">
          {lesson.steps.map((step) => (
            <li key={step.label}>
              <span>{step.label}</span>
              <strong>
                <MathText text={step.instruction} />
              </strong>
              <p>
                <MathText text={step.output} />
              </p>
            </li>
          ))}
        </ol>
        <div className="self-check" aria-label={`${lesson.title} self check`}>
          {lesson.selfCheck.map((item) => (
            <span key={item}>
              <MathText text={item} />
            </span>
          ))}
        </div>
      </div>
    </details>
  );
}
