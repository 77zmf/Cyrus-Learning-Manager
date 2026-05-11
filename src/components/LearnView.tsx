import {
  beginnerFoundations,
  beginnerLessonBridges,
  beginnerStartSteps,
  guidedControlLessons,
  learningLaunchQueue,
  learningToolRoles,
  threeBlueOneBrownLearningPath,
  threeBlueOneBrownSources
} from "../domain/learning-workflow";
import type { GuidedLesson, ReadyCheckFormulaChoice, ThreeBlueOneBrownRoute } from "../domain/learning-workflow";
import { useState } from "react";
import type { CSSProperties } from "react";
import { FormulaVisual } from "./FormulaVisual";
import { InteractiveTutor } from "./InteractiveTutor";
import { ManimStudioLab } from "./ManimStudioLab";
import { InlineFormula, MathText } from "./MathText";

const publicBasePath = "/Cyrus-Learning-Manager/";

export function LearnView() {
  const [openLessonIds, setOpenLessonIds] = useState<Set<string>>(() => new Set(["lesson-state-space"]));

  function openLesson(lessonId: string) {
    setOpenLessonIds((current) => new Set(current).add(lessonId));
  }

  function syncLessonOpen(lessonId: string, isOpen: boolean) {
    setOpenLessonIds((current) => {
      const next = new Set(current);

      if (isOpen) {
        next.add(lessonId);
      } else {
        next.delete(lessonId);
      }

      return next;
    });
  }

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

      <LearningDirectory />

      <section className="panel start-here-panel" id="section-start">
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

      <section className="panel beginner-bridge" id="section-foundations">
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

      <ThreeBlueOneBrownBridge />

      <ManimStudioLab />

      <section className="panel guided-path" id="section-guided-path">
        <div className="section-heading">
          <h2>Cyrus Guided Path</h2>
          <p>不用每日计划。每次想学时，打开这一节，从第一张卡开始：网页读、GoodNotes 写、Obsidian 连、Notion 留证据。</p>
        </div>
        <nav aria-label="Course directory" className="course-toc">
          <h3>课程目录</h3>
          <ol>
            {guidedControlLessons.map((lesson) => (
              <li key={lesson.id}>
                <a href={`#${lesson.id}`} onClick={() => openLesson(lesson.id)}>
                  {lesson.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="guided-lesson-grid">
          {guidedControlLessons.map((lesson) => {
            const beginner = beginnerLessonBridges[lesson.id];

            return (
              <details
                className="guided-lesson-card"
                id={lesson.id}
                key={lesson.title}
                open={openLessonIds.has(lesson.id)}
                onToggle={(event) => syncLessonOpen(lesson.id, event.currentTarget.open)}
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
          })}
        </div>
      </section>

      <section className="panel action-surface" id="section-launch-queue">
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

      <div className="tutor-anchor" id="section-tutor">
        <InteractiveTutor />
      </div>
    </section>
  );
}

function LearningDirectory() {
  const items = [
    { label: "小白入口", href: "#section-start", meta: "5 步开始" },
    { label: "前置概念", href: "#section-foundations", meta: `${beginnerFoundations.length} 张基础卡` },
    {
      label: "3Blue1Brown 数学桥",
      href: "#section-3blue1brown",
      meta: `${threeBlueOneBrownLearningPath.length} 条路线`
    },
    { label: "Manim Studio", href: "#section-manim-studio", meta: "SLAM / 3D / SI" },
    { label: "控制+SLAM课程目录", href: "#section-guided-path", meta: `${guidedControlLessons.length} 节课` },
    { label: "启动队列", href: "#section-launch-queue", meta: "想学时点一个" },
    { label: "互动题", href: "#section-tutor", meta: "即时反馈" }
  ];

  return (
    <nav aria-label="Learning directory" className="panel learning-directory">
      <div className="section-heading">
        <h2>Learning Directory</h2>
        <p>先用目录跳到你要学的部分；课程卡默认收起，展开当前要学的一张就够了。</p>
      </div>
      <div className="directory-grid">
        {items.map((item) => (
          <a aria-label={item.label} href={item.href} key={item.href}>
            <span>{item.label}</span>
            <em>{item.meta}</em>
          </a>
        ))}
      </div>
    </nav>
  );
}

function ThreeBlueOneBrownBridge() {
  return (
    <section className="panel threeblue-bridge" id="section-3blue1brown">
      <div className="section-heading">
        <h2>3Blue1Brown Math Bridge</h2>
        <p>
          从你已经导入的 3Blue1Brown 学习库出发，把可视化数学整理成自驱学习路线：先看动画建立直觉，再写
          GoodNotes 证据，最后接到 Obsidian Canvas 和 Notion 复习库。
        </p>
      </div>

      <div className="threeblue-source-strip" aria-label="3Blue1Brown imported sources">
        <h3>导入来源</h3>
        <div>
          {threeBlueOneBrownSources.map((source) => (
            <article key={source.label}>
              <strong>{source.label}</strong>
              {source.url ? (
                <a href={source.url} rel="noreferrer" target="_blank">
                  {source.label}
                </a>
              ) : (
                <code>{source.path}</code>
              )}
              <p>{source.note}</p>
            </article>
          ))}
        </div>
      </div>

      <nav aria-label="3Blue1Brown route directory" className="course-toc compact-toc">
        <h3>3Blue1Brown 目录</h3>
        <ol>
          {threeBlueOneBrownLearningPath.map((route) => (
            <li key={route.id}>
              <a href={`#${route.id}`}>{route.title}</a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="threeblue-route-grid">
        {threeBlueOneBrownLearningPath.map((route) => (
          <ThreeBlueOneBrownRouteCard key={route.id} route={route} />
        ))}
      </div>
    </section>
  );
}

function ThreeBlueOneBrownRouteCard({ route }: { route: ThreeBlueOneBrownRoute }) {
  return (
    <details className="threeblue-route-card" id={route.id} open={route.id === "3b1b-linear-algebra"}>
      <summary className="route-summary">
        <div className="route-card-topline">
          <span>{route.priority}</span>
          <em>{route.officialLabel}</em>
        </div>
        <h3>{route.title}</h3>
        <p className="route-topic">导入专题：{route.importedTopic}</p>
        <strong>
          <MathText text={route.visualQuestion} />
        </strong>
      </summary>
      <div className="route-detail-body">
        <a className="route-source-link" href={route.officialUrl} rel="noreferrer" target="_blank">
          打开视频路线：{route.officialLabel}
        </a>
        <FormulaVisual label={route.title} latex={route.formula} terms={route.formulaTerms} />
        <dl className="beginner-dl">
          <div>
            <dt>直觉</dt>
            <dd>
              <MathText text={route.intuition} />
            </dd>
          </div>
          <div>
            <dt>工程连接</dt>
            <dd>
              <MathText text={route.engineeringBridge} />
            </dd>
          </div>
          <div>
            <dt>最小实验</dt>
            <dd>
              <MathText text={route.minimalExperiment} />
            </dd>
          </div>
        </dl>
        <dl className="compact-dl">
          <div>
            <dt>GoodNotes</dt>
            <dd>{route.goodNotes}</dd>
          </div>
          <div>
            <dt>Obsidian</dt>
            <dd>{route.obsidian}</dd>
          </div>
          <div>
            <dt>Notion</dt>
            <dd>{route.notion}</dd>
          </div>
        </dl>
        <ul className="route-output-list">
          {route.outputs.map((output) => (
            <li key={output}>{output}</li>
          ))}
        </ul>
      </div>
    </details>
  );
}

function GuidedLessonManimStoryboard({ lesson }: { lesson: GuidedLesson }) {
  const [activeFrameIndex, setActiveFrameIndex] = useState(0);
  const [scrub, setScrub] = useState(38);
  const activeFrame = lesson.manimScene.frames[activeFrameIndex] ?? lesson.manimScene.frames[0];
  const scrubPosition = `${scrub}%`;

  return (
    <section className="guided-manim-card" aria-label={`${lesson.title} Manim render storyboard`}>
      <div className="guided-manim-heading">
        <div>
          <span>Manim storyboard</span>
          <h4>{lesson.manimScene.title}</h4>
          <p>
            <MathText text={lesson.manimScene.purpose} />
          </p>
        </div>
        <code>{lesson.manimScene.sceneName}</code>
      </div>

      <div
        className="guided-manim-stage"
        role="application"
        aria-label={`${lesson.title} Manim storyboard`}
        style={
          {
            "--storyboard-progress": scrubPosition,
            "--storyboard-frame": activeFrameIndex
          } as CSSProperties
        }
      >
        <span className="guided-manim-axis horizontal" />
        <span className="guided-manim-axis vertical" />
        <span className="guided-manim-node concept">concept</span>
        <span className="guided-manim-node formula">formula</span>
        <span className="guided-manim-node output">GoodNotes</span>
        <span className="guided-manim-path primary" />
        <span className="guided-manim-path secondary" />
        <span className="guided-manim-token">{activeFrame.focus}</span>
      </div>

      <article className="guided-manim-frame" aria-live="polite">
        <span>{activeFrame.label}</span>
        <strong>
          <MathText text={activeFrame.visual} />
        </strong>
        <InlineFormula latex={activeFrame.formulaCue} label={`${lesson.title} ${activeFrame.label} formula cue`} />
      </article>

      <div className="guided-manim-video">
        <span>Rendered Manim</span>
        <video
          aria-label={`${lesson.title} rendered Manim video`}
          controls
          loop
          muted
          playsInline
          preload="metadata"
          src={`${publicBasePath}${lesson.manimScene.assetPath}`}
        />
        <small>{lesson.manimScene.assetPath}</small>
      </div>

      <div className="guided-manim-controls">
        <label>
          Manim scrubber
          <input
            aria-label={`${lesson.title} Manim storyboard scrubber`}
            max="100"
            min="0"
            type="range"
            value={scrub}
            onChange={(event) => setScrub(Number(event.target.value))}
          />
        </label>
        <div className="guided-manim-frame-buttons" aria-label={`${lesson.title} Manim frames`}>
          {lesson.manimScene.frames.map((frame, index) => (
            <button
              aria-label={`Show ${lesson.title} Manim frame ${frame.label}`}
              aria-pressed={index === activeFrameIndex}
              className={index === activeFrameIndex ? "active" : undefined}
              key={frame.label}
              type="button"
              onClick={() => {
                setActiveFrameIndex(index);
                setScrub(index === 0 ? 18 : index === 1 ? 56 : 88);
              }}
            >
              {frame.label}
            </button>
          ))}
        </div>
      </div>

      <dl className="compact-dl">
        <div>
          <dt>Render</dt>
          <dd>
            <code>{lesson.manimScene.command}</code>
          </dd>
        </div>
        <div>
          <dt>Interactive cue</dt>
          <dd>{lesson.manimScene.interactiveCue}</dd>
        </div>
        <div>
          <dt>GoodNotes</dt>
          <dd>{lesson.manimScene.goodNotes}</dd>
        </div>
      </dl>
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
