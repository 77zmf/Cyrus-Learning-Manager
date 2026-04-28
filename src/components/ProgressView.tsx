import { tracks } from "../domain/tracks";
import type { LearningTask, TrackId } from "../domain/types";

interface ProgressViewProps {
  tasks: LearningTask[];
}

export function ProgressView({ tasks }: ProgressViewProps) {
  const average = tasks.length
    ? Math.round(tasks.reduce((sum, task) => sum + task.progress, 0) / tasks.length)
    : 0;

  return (
    <section className="panel">
      <div className="section-heading">
        <h2>Progress</h2>
        <p>Average completion across visible tasks and course tracks.</p>
      </div>
      <div className="progress-summary">
        <p className="large-number">{average}%</p>
        <span>Average progress</span>
      </div>
      <div className="progress-list">
        {tracks.map((track) => (
          <TrackProgress key={track.id} tasks={tasks} trackId={track.id} trackName={track.name} />
        ))}
      </div>
    </section>
  );
}

function TrackProgress({
  tasks,
  trackId,
  trackName
}: {
  tasks: LearningTask[];
  trackId: TrackId;
  trackName: string;
}) {
  const trackTasks = tasks.filter((task) => task.track === trackId);
  const average = trackTasks.length
    ? Math.round(trackTasks.reduce((sum, task) => sum + task.progress, 0) / trackTasks.length)
    : 0;

  return (
    <article className="progress-row">
      <div>
        <strong>{trackName}</strong>
        <span>{trackTasks.length} tasks</span>
      </div>
      <progress value={average} max={100} aria-label={`${trackName} progress`} />
      <span>{average}%</span>
    </article>
  );
}
