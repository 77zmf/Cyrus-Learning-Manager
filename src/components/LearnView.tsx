import {
  beginnerFoundations,
  beginnerLessonBridges,
  beginnerStartSteps,
  guidedControlLessons,
  learningLaunchQueue,
  learningToolRoles
} from "../domain/learning-workflow";
import type { GuidedLesson, ReadyCheckFormulaChoice } from "../domain/learning-workflow";
import { useState } from "react";
import { FormulaVisual } from "./FormulaVisual";
import { InteractiveTutor } from "./InteractiveTutor";
import { MathText } from "./MathText";

export function LearnView() {
  return (
    <section className="learning-cockpit">
      <div className="panel cockpit-hero">
        <div className="section-heading">
          <h2>Learn</h2>
          <p>网页是主学习入口：先做互动题，再把推导写进 GoodNotes，最后沉淀到 Obsidian 和 Notion。</p>
        </div>
        <div className="workflow-strip" aria-label="Learning workflow">
          {learningToolRoles.map((item) => (
            <article key={item.tool}>
              <strong>{item.tool}</strong>
              <span>{item.role}</span>
              <p>{item.output}</p>
            </article>
          ))}
        </div>
      </div>

      <section className="panel start-here-panel">
        <div className="section-heading">
          <h2>Start Here for Beginners</h2>
          <p>每次只走一条最小学习链：选课、补前置、做检查、写 GoodNotes、留证据。</p>
        </div>
        <ol className="beginner-start-list">
          {beginnerStartSteps.map((step, index) => (
            <li key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{step.title}</strong>
              <p>
                <MathText text={step.action} />
              </p>
              <em>
                <MathText text={step.output} />
              </em>
            </li>
          ))}
        </ol>
      </section>

      <section className="panel beginner-bridge">
        <div className="section-heading">
          <h2>Zero-Base Bridge</h2>
          <p>先补最小前置概念。这里不要求你会证明，只要求你能用自己的话说出概念在干什么。</p>
        </div>
        <div className="foundation-grid">
          {beginnerFoundations.map((item) => (
            <article className="foundation-card" key={item.title}>
              <span>小白前置</span>
              <h3>{item.title}</h3>
              <p>
                <MathText text={item.plain} />
              </p>
              <dl className="beginner-dl">
                <div>
                  <dt>例子</dt>
                  <dd>
                    <MathText text={item.example} />
                  </dd>
                </div>
                <div>
                  <dt>最小练习</dt>
                  <dd>
                    <MathText text={item.exercise} />
                  </dd>
                </div>
                <div>
                  <dt>GoodNotes</dt>
                  <dd>
                    <MathText text={item.goodNotes} />
                  </dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className="panel guided-path">
        <div className="section-heading">
          <h2>Cyrus Guided Path</h2>
          <p>不用每日计划。每次想学时，打开这一节，从第一张卡开始：网页读、GoodNotes 写、Obsidian 连、Notion 留证据。</p>
        </div>
        <nav aria-label="Course directory" className="course-toc">
          <h3>课程目录</h3>
          <ol>
            {guidedControlLessons.map((lesson) => (
              <li key={lesson.id}>
                <a href={`#${lesson.id}`}>{lesson.title}</a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="guided-lesson-grid">
          {guidedControlLessons.map((lesson) => {
            const beginner = beginnerLessonBridges[lesson.id];

            return (
              <article className="guided-lesson-card" id={lesson.id} key={lesson.title}>
                <span>
                  <MathText text={lesson.goal} />
                </span>
                <h3>{lesson.title}</h3>
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
              </article>
            );
          })}
        </div>
      </section>

      <section className="panel action-surface">
        <div className="section-heading">
          <h2>Learning Launch Queue</h2>
          <p>Pick one item only when you want to study. Each item already names the web prompt and where the output should land.</p>
        </div>
        <div className="action-grid">
          {learningLaunchQueue.map((item) => (
            <article className="action-card" key={item.title}>
              <span>{item.focus}</span>
              <h3>{item.title}</h3>
              <strong>
                <MathText text={item.prompt} />
              </strong>
              <dl className="compact-dl">
                <div>
                  <dt>GoodNotes</dt>
                  <dd>{item.goodNotes}</dd>
                </div>
                <div>
                  <dt>Obsidian</dt>
                  <dd>{item.obsidian}</dd>
                </div>
                <div>
                  <dt>Notion</dt>
                  <dd>{item.notion}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <InteractiveTutor />
    </section>
  );
}

function LessonReadyCheck({ lesson }: { lesson: GuidedLesson }) {
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
