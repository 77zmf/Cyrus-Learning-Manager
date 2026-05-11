import { beginnerStartSteps } from "../../domain/learning-workflow";
import { MathText } from "../MathText";

export function BeginnerStartPanel() {
  return (
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
  );
}
