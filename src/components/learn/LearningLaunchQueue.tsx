import { learningLaunchQueue } from "../../domain/learning-workflow";
import { MathText } from "../MathText";

export function LearningLaunchQueue() {
  return (
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
  );
}
