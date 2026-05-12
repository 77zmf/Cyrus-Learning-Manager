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
      {!connected ? <LocalRecovery /> : null}
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

function LocalRecovery() {
  return (
    <section className="sync-recovery" aria-labelledby="local-recovery-heading">
      <div>
        <h2 id="local-recovery-heading">Local Recovery</h2>
        <p>网页可以继续学习；只有 Obsidian / Notion 写入会暂停。</p>
      </div>
      <ol className="sync-command-list">
        <li>
          <span>1</span>
          <strong>在项目目录启动同步服务</strong>
          <code>npm run dev:sync</code>
        </li>
        <li>
          <span>2</span>
          <strong>确认 8787 端口可用</strong>
          <code>curl -fsS http://127.0.0.1:8787/health</code>
        </li>
        <li>
          <span>3</span>
          <strong>回到网页确认状态</strong>
          <p>刷新 Sync 页面，看到 Local service = connected 后再写入。</p>
        </li>
      </ol>
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
