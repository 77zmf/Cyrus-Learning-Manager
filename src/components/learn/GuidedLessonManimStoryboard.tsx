import { useState } from "react";
import type { CSSProperties } from "react";
import type { GuidedLesson } from "../../domain/learning-workflow";
import { InlineFormula, MathText } from "../MathText";

const publicBasePath = "/Cyrus-Learning-Manager/";

export function GuidedLessonManimStoryboard({ lesson }: { lesson: GuidedLesson }) {
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
