import type { HealthResponse } from "../domain/types";

interface SyncCenterProps {
  health: HealthResponse | null;
  error: string | null;
}

export function SyncCenter({ health, error }: SyncCenterProps) {
  const connected = Boolean(health?.ok);

  return (
    <section className="panel">
      <div className="section-heading">
        <h2>Sync Center</h2>
        <p>Local service, Notion, and Obsidian configuration status.</p>
      </div>
      {error ? <p className="error" role="status">{error}</p> : null}
      <div className="sync-grid">
        <StatusCard label="Local service" value={connected ? "connected" : "disconnected"} active={connected} />
        <StatusCard
          label="Notion"
          value={health?.notionConfigured ? "configured" : "not configured"}
          active={Boolean(health?.notionConfigured)}
        />
        <StatusCard
          label="Obsidian"
          value={health?.obsidianConfigured ? "configured" : "not configured"}
          active={Boolean(health?.obsidianConfigured)}
        />
      </div>
    </section>
  );
}

function StatusCard({
  label,
  value,
  active
}: {
  label: string;
  value: string;
  active: boolean;
}) {
  return (
    <article className="status-card">
      <span>{label}</span>
      <strong className={active ? "is-ready" : "is-muted"}>{value}</strong>
    </article>
  );
}
