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
      <section className="empty-state">
        <h2>Learning manager scaffold is ready.</h2>
        <p>Next tasks add SQLite, Obsidian sync, Notion sync, and the full management UI.</p>
      </section>
    </main>
  );
}
