import { tracks } from "./domain/tracks";

export function App() {
  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Cyrus Knowledge</p>
          <h1>Cyrus Learning Manager</h1>
        </div>
        <span className="status-pill">Local Sync: checking</span>
      </header>
      <section className="track-grid" aria-label="Learning tracks">
        {tracks.map((track) => (
          <article className="track-card" key={track.id}>
            <h2>{track.name}</h2>
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
      </section>
    </main>
  );
}
