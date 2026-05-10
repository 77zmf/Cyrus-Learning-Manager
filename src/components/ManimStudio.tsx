import { getManimScenesForPanel, manimSceneSource } from "../domain/manim-scenes";

const publicBasePath = "/Cyrus-Learning-Manager/";

export function ManimStudio({ panelId }: { panelId: string }) {
  const scenes = getManimScenesForPanel(panelId);

  if (scenes.length === 0) {
    return null;
  }

  return (
    <section className="manim-studio" aria-label="Manim render queue">
      <div className="manim-studio-heading">
        <div>
          <span>Animation renderer</span>
          <h3>Scene Queue</h3>
          <p>用 Manim Community 把当前可拖动交互扩展成可暂停、可复盘、可放进 GoodNotes 的数学动画。</p>
        </div>
        <a href="https://www.manim.community/" rel="noreferrer" target="_blank">
          Manim Community
        </a>
      </div>

      <div className="manim-source-row">
        <span>Scene source</span>
        <code>{manimSceneSource}</code>
      </div>

      <div className="manim-scene-grid">
        {scenes.map((scene) => (
          <article className="manim-scene-card" key={scene.id}>
            <div className="manim-video-placeholder" aria-label={`${scene.sceneName} render target`}>
              <span className="manim-frame-chip">mp4</span>
              <video
                aria-label={`${scene.title} video`}
                controls
                loop
                muted
                playsInline
                preload="metadata"
                src={`${publicBasePath}${scene.assetPath}`}
              />
              <small>{scene.assetPath}</small>
            </div>
            <div className="manim-scene-copy">
              <span>{scene.topic}</span>
              <h4>{scene.title}</h4>
              <p>{scene.purpose}</p>
              <dl className="compact-dl">
                <div>
                  <dt>Render</dt>
                  <dd>
                    <code>{scene.command}</code>
                  </dd>
                </div>
                <div>
                  <dt>Interactive cue</dt>
                  <dd>{scene.dragCue}</dd>
                </div>
                <div>
                  <dt>GoodNotes</dt>
                  <dd>{scene.goodNotes}</dd>
                </div>
              </dl>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
