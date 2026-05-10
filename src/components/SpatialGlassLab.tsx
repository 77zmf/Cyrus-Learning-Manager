import { useMemo, useState } from "react";
import { spatialGlassPanels } from "../domain/spatial-glass";
import { FormulaVisual } from "./FormulaVisual";
import { MathText } from "./MathText";
import { ProjectionDragLab } from "./ProjectionDragLab";

type ActiveStageMap = Record<string, string>;

const initialStageMap = spatialGlassPanels.reduce<ActiveStageMap>((acc, panel) => {
  acc[panel.id] = panel.stages[0]?.id ?? "";
  return acc;
}, {});

export function SpatialGlassLab() {
  const [activePanelId, setActivePanelId] = useState(spatialGlassPanels[0].id);
  const [activeStages, setActiveStages] = useState<ActiveStageMap>(initialStageMap);
  const activePanel = useMemo(
    () => spatialGlassPanels.find((panel) => panel.id === activePanelId) ?? spatialGlassPanels[0],
    [activePanelId]
  );
  const activeStageId = activeStages[activePanel.id] ?? activePanel.stages[0]?.id;
  const activeStage = activePanel.stages.find((stage) => stage.id === activeStageId) ?? activePanel.stages[0];

  return (
    <section className="panel spatial-glass-panel" id="section-spatial-glass">
      <div className="section-heading">
        <h2>Spatial Glass Lab</h2>
        <p>把 SLAM、三维重建和李飞飞空间智能做成可点、可滑动的学习舱。先点主题，再按阶段写 GoodNotes。</p>
      </div>

      <nav aria-label="Spatial glass topics" className="spatial-topic-tabs">
        {spatialGlassPanels.map((panel) => (
          <button
            aria-label={`打开 ${panel.title}`}
            aria-pressed={panel.id === activePanel.id}
            className={panel.id === activePanel.id ? "active" : undefined}
            key={panel.id}
            type="button"
            onClick={() => setActivePanelId(panel.id)}
          >
            <span>{panel.kicker}</span>
            <strong>{panel.title}</strong>
          </button>
        ))}
      </nav>

      <div className="spatial-glass-shell">
        <article className="spatial-glass-focus">
          <div className="spatial-focus-copy">
            <span>{activePanel.kicker}</span>
            <h3>{activePanel.title}</h3>
            <p>
              <MathText text={activePanel.summary} />
            </p>
          </div>
          <FormulaVisual label={activePanel.title} latex={activePanel.formula} terms={activePanel.formulaTerms} />
        </article>

        <ProjectionDragLab />

        <div className="spatial-stage-strip" aria-label={`${activePanel.title} stages`}>
          {activePanel.stages.map((stage) => (
            <button
              aria-label={`查看 ${stage.label}`}
              aria-pressed={stage.id === activeStage.id}
              className={stage.id === activeStage.id ? "active" : undefined}
              key={stage.id}
              type="button"
              onClick={() =>
                setActiveStages((current) => ({
                  ...current,
                  [activePanel.id]: stage.id
                }))
              }
            >
              <span>{stage.label}</span>
              <em>{stage.beginnerQuestion}</em>
            </button>
          ))}
        </div>

        <article className="spatial-stage-detail" aria-live="polite">
          <span>当前阶段</span>
          <h3>{activeStage.label}</h3>
          <strong>
            <MathText text={activeStage.beginnerQuestion} />
          </strong>
          <p>
            <MathText text={activeStage.explanation} />
          </p>
          <dl className="compact-dl">
            <div>
              <dt>GoodNotes</dt>
              <dd>{activeStage.goodNotes}</dd>
            </div>
            <div>
              <dt>Obsidian</dt>
              <dd>{activeStage.obsidian}</dd>
            </div>
            <div>
              <dt>Notion</dt>
              <dd>{activeStage.notion}</dd>
            </div>
          </dl>
        </article>

        <div className="spatial-source-row" aria-label={`${activePanel.title} sources`}>
          {activePanel.sourceLinks.map((source) => (
            <a href={source.url} key={source.label} rel="noreferrer" target="_blank">
              <strong>{source.label}</strong>
              <span>{source.note}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
