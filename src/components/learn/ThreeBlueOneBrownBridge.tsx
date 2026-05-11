import {
  threeBlueOneBrownLearningPath,
  threeBlueOneBrownSources
} from "../../domain/learning-workflow";
import type { ThreeBlueOneBrownRoute } from "../../domain/learning-workflow";
import { FormulaVisual } from "../FormulaVisual";
import { MathText } from "../MathText";

export function ThreeBlueOneBrownBridge() {
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
