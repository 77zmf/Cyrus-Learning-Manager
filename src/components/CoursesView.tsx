import { tracks } from "../domain/tracks";

export function CoursesView() {
  return (
    <section className="panel">
      <div className="section-heading">
        <h2>Courses</h2>
        <p>Track source assets and entry points for the local learning system.</p>
      </div>
      <div className="track-grid">
        {tracks.map((track) => (
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
          </article>
        ))}
      </div>
    </section>
  );
}
