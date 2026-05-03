import { learningLaunchQueue, learningToolRoles } from "../domain/learning-workflow";
import { InteractiveTutor } from "./InteractiveTutor";

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
              <strong>{item.prompt}</strong>
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
