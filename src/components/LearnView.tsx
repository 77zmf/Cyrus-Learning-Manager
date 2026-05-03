import { learningToolRoles } from "../domain/learning-workflow";
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

      <InteractiveTutor />
    </section>
  );
}
