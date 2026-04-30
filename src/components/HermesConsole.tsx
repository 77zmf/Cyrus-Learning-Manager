import { useMemo, useState } from "react";
import type { CreateTaskInput } from "../api/client";

interface HermesConsoleProps {
  onCreateTask: (input: CreateTaskInput) => void;
}

type HermesStatus = "active" | "blocked" | "done" | "mixed";

interface HermesDraft {
  topic: string;
  scope: string;
  line: string;
  evidence: string;
  status: HermesStatus;
  blocker: string;
  owner: string;
  nextAction: string;
  verificationPath: string;
  rollback: string;
}

const hermesScopes = [
  { value: "inbox-triage", label: "Inbox triage" },
  { value: "work-closure", label: "Work closure" },
  { value: "learning-plan", label: "Learning plan" },
  { value: "concept-reuse", label: "Concept reuse" },
  { value: "project-context", label: "Project context" }
];

const hermesLines = [
  { value: "learning", label: "Learning" },
  { value: "stable", label: "Stable validation" },
  { value: "shadow", label: "Shadow / research" },
  { value: "reconstruction", label: "Reconstruction" }
];

const hermesStatuses: HermesStatus[] = ["active", "blocked", "done", "mixed"];

const initialDraft: HermesDraft = {
  topic: "",
  scope: "work-closure",
  line: "stable",
  evidence: "",
  status: "active",
  blocker: "",
  owner: "Cyrus",
  nextAction: "",
  verificationPath: "",
  rollback: ""
};

export function HermesConsole({ onCreateTask }: HermesConsoleProps) {
  const [draft, setDraft] = useState<HermesDraft>(initialDraft);
  const handoff = useMemo(() => buildHermesHandoff(draft), [draft]);

  function updateDraft<K extends keyof HermesDraft>(key: K, value: HermesDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function createHermesTask() {
    const topic = draft.topic.trim() || labelFor(hermesScopes, draft.scope);
    onCreateTask({
      title: `Hermes handoff: ${topic}`,
      track: "work-validation",
      status: "active",
      priority: draft.status === "blocked" ? "urgent" : "high",
      dueDate: null,
      progress: 0,
      source: "Hermes Console",
      notes: handoff
    });
  }

  return (
    <section className="panel hermes-console">
      <div className="section-heading">
        <h2>Hermes Console</h2>
        <p>
          Build a structured handoff for the local Hermes profile, then create a Work Validation
          task when the next action needs tracking.
        </p>
      </div>

      <div className="hermes-layout">
        <article className="hermes-command">
          <h3>Local Hermes entry</h3>
          <code>cd /Users/cyber/Documents/zmf_terminal &amp;&amp; cyrus -s obsidian</code>
          <p>
            Model authentication is still missing. Run <code>cyrus model</code> or{" "}
            <code>cyrus login --provider openai-codex</code> before asking Hermes to update the
            vault directly.
          </p>
        </article>

        <form className="hermes-form">
          <label>
            Topic
            <input
              value={draft.topic}
              onChange={(event) => updateDraft("topic", event.target.value)}
              placeholder="Failcase, course note, KPI gate, paper card..."
            />
          </label>

          <label>
            Scope
            <select
              value={draft.scope}
              onChange={(event) => updateDraft("scope", event.target.value)}
            >
              {hermesScopes.map((scope) => (
                <option key={scope.value} value={scope.value}>
                  {scope.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            Line
            <select value={draft.line} onChange={(event) => updateDraft("line", event.target.value)}>
              {hermesLines.map((line) => (
                <option key={line.value} value={line.value}>
                  {line.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            Status
            <select
              value={draft.status}
              onChange={(event) => updateDraft("status", event.target.value as HermesStatus)}
            >
              {hermesStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>

          <label className="wide-field">
            Evidence
            <textarea
              value={draft.evidence}
              onChange={(event) => updateDraft("evidence", event.target.value)}
              placeholder="Logs, run_result, KPI gate, issue link, explicit validation, or learning artifact."
            />
          </label>

          <label>
            Blocker
            <input
              value={draft.blocker}
              onChange={(event) => updateDraft("blocker", event.target.value)}
              placeholder="None, auth, missing evidence..."
            />
          </label>

          <label>
            Owner
            <input value={draft.owner} onChange={(event) => updateDraft("owner", event.target.value)} />
          </label>

          <label className="wide-field">
            Next action
            <textarea
              value={draft.nextAction}
              onChange={(event) => updateDraft("nextAction", event.target.value)}
              placeholder="Smallest useful next move."
            />
          </label>

          <label>
            Verification path
            <input
              value={draft.verificationPath}
              onChange={(event) => updateDraft("verificationPath", event.target.value)}
              placeholder="test, build, KPI, replay, review..."
            />
          </label>

          <label>
            Rollback or risk
            <input
              value={draft.rollback}
              onChange={(event) => updateDraft("rollback", event.target.value)}
              placeholder="What can be reverted or what remains risky?"
            />
          </label>

          <button type="button" onClick={createHermesTask}>
            Create Hermes task
          </button>
        </form>

        <article className="study-card template-card hermes-output">
          <h3>Generated Handoff</h3>
          <pre>{handoff}</pre>
        </article>
      </div>
    </section>
  );
}

function buildHermesHandoff(draft: HermesDraft) {
  const scope = labelFor(hermesScopes, draft.scope);
  const line = labelFor(hermesLines, draft.line);

  return [
    "## Hermes Handoff",
    `- Profile: /Users/cyber/.hermes/profiles/cyrus`,
    `- Vault: /Users/cyber/Documents/zmf_terminal/Cyrus-Knowledge`,
    `- Scope: ${scope}`,
    `- Line: ${line}`,
    `- Topic: ${valueOrPlaceholder(draft.topic)}`,
    `- Status: ${draft.status}`,
    `- Evidence: ${valueOrPlaceholder(draft.evidence)}`,
    `- Blocker: ${valueOrPlaceholder(draft.blocker)}`,
    `- Owner: ${valueOrPlaceholder(draft.owner)}`,
    `- Next action: ${valueOrPlaceholder(draft.nextAction)}`,
    `- Verification path: ${valueOrPlaceholder(draft.verificationPath)}`,
    `- Rollback or risk: ${valueOrPlaceholder(draft.rollback)}`,
    "",
    "### Hermes instruction",
    "Update existing notes and indexes before creating new structures. Keep stable validation, shadow/research, reconstruction, and learning work separated. Preserve mixed evidence instead of flattening it into done."
  ].join("\n");
}

function labelFor(options: Array<{ value: string; label: string }>, value: string) {
  return options.find((option) => option.value === value)?.label ?? value;
}

function valueOrPlaceholder(value: string) {
  return value.trim() || "not recorded";
}
