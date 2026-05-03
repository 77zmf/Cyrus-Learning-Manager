import { modulesForTrack } from "../domain/knowledge";
import { libraryTrackRoutes } from "../domain/learning-workflow";
import { tracks } from "../domain/tracks";

export function CoursesView() {
  return (
    <section className="panel">
      <div className="section-heading">
        <h2>Library</h2>
        <p>
          Course modules, source links, video entry points, derivation outputs, and paper queues.
        </p>
      </div>
      <section className="subsection-block route-block">
        <div className="section-heading">
          <h2>Track Routes</h2>
          <p>Routes are self-paced paths across the source library. Pick by output, not by date.</p>
        </div>
        <div className="route-grid">
          {libraryTrackRoutes.map((route) => (
            <article className="route-card" key={route.title}>
              <span>{route.tracks}</span>
              <h3>{route.title}</h3>
              <p>{route.output}</p>
            </article>
          ))}
        </div>
      </section>
      <div className="track-grid">
        {tracks.map((track) => {
          const modules = modulesForTrack(track.id);
          return (
            <article className="track-card" key={track.id}>
              <h3>{track.name}</h3>
              <p>{track.description}</p>
              <dl>
                <div>
                  <dt>Obsidian entry</dt>
                  <dd>{track.obsidianEntry}</dd>
                </div>
                <div>
                  <dt>Canvas entry</dt>
                  <dd>{track.canvasEntry}</dd>
                </div>
              </dl>
              <div className="module-block">
                <h4>Knowledge modules</h4>
                <ul>
                  {modules.map((module) => (
                    <li key={module.id}>
                      <strong>{module.title}</strong>
                      <span>{module.stage}</span>
                      <p>{module.focus}</p>
                      <div className="module-output">
                        {module.outputs.map((output) => (
                          <em key={output}>{output}</em>
                        ))}
                      </div>
                      <div className="source-links">
                        {module.sources.map((source) => (
                          <a href={source.url} key={source.url} rel="noreferrer" target="_blank">
                            {source.title}
                          </a>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
