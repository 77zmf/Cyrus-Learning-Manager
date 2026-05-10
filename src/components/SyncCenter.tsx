import { syncReadinessChecks } from "../domain/learning-workflow";
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
        <StatusCard
          label="Local service"
          value={connected ? "connected" : "disconnected"}
          detail="http://127.0.0.1:8787/health"
          active={connected}
        />
        <StatusCard
          label="Notion"
          value={health?.notionConfigured ? "configured" : "not configured"}
          detail={health?.notionTarget ?? "set NOTION_TOKEN and task database in .env.local"}
          active={Boolean(health?.notionConfigured)}
        />
        <StatusCard
          label="Obsidian"
          value={health?.obsidianConfigured ? "configured" : "not configured"}
          detail={health?.obsidianVaultPath ?? "/Users/cyber/Documents/Obsidian Vault/Cyrus-Knowledge"}
          active={Boolean(health?.obsidianConfigured)}
        />
        <StatusCard
          label="Hermes"
          value={health?.hermesConfigured ? "configured" : "not configured"}
          detail={
            health?.hermesConfigured
              ? `${health.hermesProvider ?? "provider"} / ${health.hermesModel ?? "model"}`
              : health?.hermesProfilePath ?? "/Users/cyber/.hermes/profiles/cyrus"
          }
          active={Boolean(health?.hermesConfigured)}
        />
      </div>
      <section className="subsection-block">
        <div className="section-heading">
          <h2>Sync Readiness</h2>
          <p>Use these checks when the web app loads but Obsidian or Notion writes are paused.</p>
        </div>
        <div className="readiness-grid">
          {syncReadinessChecks.map((check) => (
            <article className="status-card readiness-card" key={check.label}>
              <span>{check.label}</span>
              <strong>{check.target}</strong>
              <code>{check.command}</code>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}

function StatusCard({
  label,
  value,
  detail,
  active
}: {
  label: string;
  value: string;
  detail?: string;
  active: boolean;
}) {
  return (
    <article className="status-card">
      <span>{label}</span>
      <strong className={active ? "is-ready" : "is-muted"}>{value}</strong>
      {detail ? <p>{detail}</p> : null}
    </article>
  );
}
