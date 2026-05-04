import { useMemo, useState } from "react";
import type { CreateTaskInput } from "../api/client";
import {
  findStudyPlan,
  hermesCloseoutFields,
  modesForTrack,
  studyModeLabels,
  studyPlans,
  type StudyMode
} from "../domain/study-lab";
import { tracks } from "../domain/tracks";
import type { TrackId } from "../domain/types";
import { MathLines, MathText } from "./MathText";

interface StudyLabProps {
  onCreateTask: (input: CreateTaskInput) => void;
}

export function StudyLab({ onCreateTask }: StudyLabProps) {
  const [track, setTrack] = useState<TrackId>("tsinghua-automation");
  const [mode, setMode] = useState<StudyMode>("formula");

  const availableModes = useMemo(() => modesForTrack(track), [track]);
  const plan = findStudyPlan(track, mode) ?? studyPlans.find((item) => item.track === track) ?? studyPlans[0];
  const activeTrack = tracks.find((item) => item.id === plan.track);

  function changeTrack(nextTrack: TrackId) {
    const nextMode = modesForTrack(nextTrack)[0] ?? "course";
    setTrack(nextTrack);
    setMode(nextMode);
  }

  function createStudyTask() {
    onCreateTask({
      title: plan.taskTitle,
      track: plan.track,
      status: "active",
      priority: plan.priority,
      dueDate: null,
      progress: 0,
      source: plan.sources[0]?.url ?? "Cyrus Study Lab",
      notes: plan.prompt
    });
  }

  return (
    <section className="panel study-lab">
      <div className="section-heading">
        <h2>Study Lab</h2>
        <p>
          Pick a track and mode, then work from a concrete prompt, checklist, template, and source
          shelf.
        </p>
      </div>

      <div className="study-controls">
        <label>
          Track
          <select value={track} onChange={(event) => changeTrack(event.target.value as TrackId)}>
            {tracks.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>

        <div className="mode-switch" aria-label="Study modes">
          {availableModes.map((item) => (
            <button
              className={mode === item ? "active" : ""}
              key={item}
              onClick={() => setMode(item)}
              type="button"
            >
              {studyModeLabels[item]}
            </button>
          ))}
        </div>
      </div>

      <div className="study-workspace">
        <article className="study-main">
          <span>{displayTrackName(activeTrack?.name ?? plan.track)}</span>
          <h3>{plan.title}</h3>
          <strong>
            <MathText text={plan.question} />
          </strong>
          <p>
            <MathText text={plan.prompt} />
          </p>
          <button type="button" onClick={createStudyTask}>
            Create study task
          </button>
        </article>

        <article className="study-card">
          <h3>Checklist</h3>
          <ol>
            {plan.checklist.map((item) => (
              <li key={item}>
                <MathText text={item} />
              </li>
            ))}
          </ol>
        </article>

        <article className="study-card template-card">
          <h3>Output Template</h3>
          <MathLines lines={templateLines(plan.template)} />
        </article>

        <article className="study-card hermes-card">
          <h3>Hermes Closeout</h3>
          <dl>
            {hermesCloseoutFields.map((field) => (
              <div key={field}>
                <dt>{field}</dt>
                <dd>{closeoutHint(field)}</dd>
              </div>
            ))}
          </dl>
        </article>

        <article className="study-card">
          <h3>Sources</h3>
          <div className="source-links">
            {plan.sources.map((source) => (
              <a href={source.url} key={source.url} rel="noreferrer" target="_blank">
                {source.title}
              </a>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

function templateLines(template: string) {
  return template
    .split("\n")
    .map((line) => line.trimEnd())
    .filter((line) => line.trim() !== "$$");
}

function displayTrackName(name: string) {
  return name === "World & Spatial Models" ? "World and Spatial Models" : name;
}

function closeoutHint(field: string) {
  switch (field) {
    case "Evidence":
      return "What proves this learning or validation claim?";
    case "Status":
      return "active, blocked, done, or mixed evidence";
    case "Blocker":
      return "What prevents closure right now?";
    case "Owner":
      return "Who owns the next move?";
    case "Next action":
      return "The smallest useful follow-up.";
    case "Verification path":
      return "Test, build, note, KPI, replay, or review path.";
    default:
      return "";
  }
}
