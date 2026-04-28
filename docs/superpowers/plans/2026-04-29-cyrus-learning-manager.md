# Cyrus Learning Manager Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `Cyrus Learning Manager`, a GitHub Pages frontend backed by a local Node sync service that manages tasks/progress in SQLite and automatically syncs to Obsidian Markdown and Notion.

**Architecture:** React/Vite builds a static frontend for GitHub Pages at `/Cyrus-Learning-Manager/`. A local Node/Express service runs at `127.0.0.1:8787`, owns SQLite, writes generated Markdown under the Cyrus Obsidian vault, and calls the official Notion API using secrets from `.env.local`.

`.env.example` uses empty values only. Local defaults such as port, parent page ID, and Obsidian vault path are applied by `server/config.ts`, not committed in `.env.example`.

**Tech Stack:** React, TypeScript, Vite, Node.js, Express, better-sqlite3, Vitest, Testing Library, Notion JavaScript SDK, GitHub Actions Pages.

---

## File Structure

Repository root: `/Users/cyber/Documents/Cyrus-Learning-Manager`

- `.github/workflows/pages.yml`: builds and deploys the static Vite frontend to GitHub Pages.
- `.gitignore`: excludes dependencies, builds, SQLite files, generated sync state, and local env files.
- `.env.example`: documents local sync service configuration without secrets.
- `package.json`: root scripts and dependencies.
- `tsconfig.json`: TypeScript configuration for frontend, backend, and tests.
- `vite.config.ts`: Vite config with GitHub Pages base path.
- `index.html`: Vite HTML entry.
- `src/main.tsx`: React entrypoint.
- `src/App.tsx`: app shell and route state.
- `src/styles.css`: practical dashboard styling.
- `src/api/client.ts`: local sync service HTTP client.
- `src/domain/types.ts`: shared task, track, sync event, and API response types.
- `src/domain/tracks.ts`: seeded Cyrus tracks and Obsidian/Canvas links.
- `src/components/Dashboard.tsx`: summary view.
- `src/components/TasksView.tsx`: searchable/filterable task management UI.
- `src/components/CoursesView.tsx`: course/track overview.
- `src/components/ProgressView.tsx`: weekly progress view.
- `src/components/SyncCenter.tsx`: local service and sync health.
- `server/index.ts`: local sync service entrypoint.
- `server/config.ts`: environment parsing and safe defaults.
- `server/db.ts`: SQLite connection, schema migration, and seed data.
- `server/tasks.ts`: task CRUD/search/filter functions.
- `server/routes.ts`: Express route definitions.
- `server/sync/obsidian.ts`: generated Markdown writer.
- `server/sync/notion.ts`: Notion API adapter.
- `server/sync/queue.ts`: sync orchestration and event recording.
- `tests/server/*.test.ts`: backend unit tests.
- `tests/frontend/*.test.tsx`: frontend tests.
- `docs/superpowers/specs/2026-04-29-cyrus-learning-manager-design.md`: design spec copied from the planning workspace.

## Task 1: Create Local Repository Workspace

**Files:**
- Create/modify repository at `/Users/cyber/Documents/Cyrus-Learning-Manager`
- Copy: `/Users/cyber/Documents/zmf_terminal/docs/superpowers/specs/2026-04-29-cyrus-learning-manager-design.md`

- [ ] **Step 1: Clone the GitHub repository**

Run:

```bash
cd /Users/cyber/Documents
git clone git@github.com:77zmf/Cyrus-Learning-Manager.git Cyrus-Learning-Manager
cd /Users/cyber/Documents/Cyrus-Learning-Manager
```

Expected: empty repository cloned and current directory is `/Users/cyber/Documents/Cyrus-Learning-Manager`.

- [ ] **Step 2: Add project documentation directories**

Run:

```bash
mkdir -p docs/superpowers/specs docs/superpowers/plans .github/workflows
cp /Users/cyber/Documents/zmf_terminal/docs/superpowers/specs/2026-04-29-cyrus-learning-manager-design.md docs/superpowers/specs/
cp /Users/cyber/Documents/zmf_terminal/docs/superpowers/plans/2026-04-29-cyrus-learning-manager.md docs/superpowers/plans/
```

Expected: the design spec and this plan exist inside the repository.

- [ ] **Step 3: Create the initial ignore file**

Create `.gitignore` with:

```gitignore
node_modules/
dist/
coverage/
.env
.env.local
*.db
*.db-shm
*.db-wal
.DS_Store
server-data/
```

- [ ] **Step 4: Commit the repository setup**

Run:

```bash
git add .gitignore docs/superpowers
git commit -m "docs: add learning manager design and plan"
```

Expected: commit succeeds.

## Task 2: Scaffold Vite, TypeScript, Tests, and GitHub Pages

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `vite.config.ts`
- Create: `index.html`
- Create: `.env.example`
- Create: `.github/workflows/pages.yml`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/styles.css`

- [ ] **Step 1: Create package manifest**

Create `package.json` with:

```json
{
  "name": "cyrus-learning-manager",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev:web": "vite --host 127.0.0.1 --port 5173",
    "dev:sync": "tsx server/index.ts",
    "build": "tsc --noEmit && vite build",
    "test": "vitest run",
    "test:watch": "vitest",
    "preview": "vite preview --host 127.0.0.1 --port 4173"
  },
  "dependencies": {
    "@notionhq/client": "^2.3.0",
    "@vitejs/plugin-react": "^4.3.4",
    "better-sqlite3": "^11.8.1",
    "cors": "^2.8.5",
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "zod": "^3.24.1"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.1.0",
    "@types/better-sqlite3": "^7.6.12",
    "@types/cors": "^2.8.17",
    "@types/express": "^5.0.0",
    "@types/node": "^22.10.5",
    "@types/react": "^18.3.18",
    "@types/react-dom": "^18.3.5",
    "jsdom": "^25.0.1",
    "tsx": "^4.19.2",
    "typescript": "^5.7.3",
    "vite": "^6.0.7",
    "vitest": "^2.1.8"
  }
}
```

- [ ] **Step 2: Create TypeScript config**

Create `tsconfig.json` with:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  },
  "include": ["src", "server", "tests", "vite.config.ts"]
}
```

- [ ] **Step 3: Create Vite config for project Pages**

Create `vite.config.ts` with:

```ts
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/Cyrus-Learning-Manager/",
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"]
  }
});
```

- [ ] **Step 4: Create app shell files**

Create `index.html` with:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Cyrus Learning Manager</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

Create `src/main.tsx` with:

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

Create `src/App.tsx` with:

```tsx
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
```

Create `src/styles.css` with:

```css
:root {
  color: #172026;
  background: #f5f7f8;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

body {
  margin: 0;
}

.app-shell {
  min-height: 100vh;
  padding: 24px;
}

.topbar {
  align-items: center;
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.eyebrow {
  color: #5a6b75;
  font-size: 13px;
  margin: 0 0 4px;
  text-transform: uppercase;
}

h1,
h2,
p {
  margin-top: 0;
}

.status-pill {
  background: #e8eef2;
  border: 1px solid #ced8df;
  border-radius: 999px;
  color: #31404a;
  padding: 8px 12px;
}

.empty-state {
  background: #ffffff;
  border: 1px solid #dce3e8;
  border-radius: 8px;
  margin-top: 32px;
  max-width: 720px;
  padding: 24px;
}
```

- [ ] **Step 5: Create environment example**

Create `.env.example` with:

```bash
NOTION_TOKEN=
NOTION_PARENT_PAGE_ID=
NOTION_TASKS_DATABASE_ID=
OBSIDIAN_VAULT_PATH=
LOCAL_SYNC_PORT=
LOCAL_APP_KEY=
```

Expected: `.env.example` documents the supported variable names with empty values only. `server/config.ts` supplies local defaults when these values are unset.

- [ ] **Step 6: Create GitHub Pages workflow**

Create `.github/workflows/pages.yml` with:

```yaml
name: Deploy GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - name: Install
        run: npm ci
      - name: Build
        run: npm run build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 7: Install dependencies and verify build**

Run:

```bash
npm install
npm run build
```

Expected: `dist/` is created and TypeScript passes.

- [ ] **Step 8: Commit scaffold**

Run:

```bash
git add package.json package-lock.json tsconfig.json vite.config.ts index.html src .env.example .github/workflows/pages.yml
git commit -m "feat: scaffold pages frontend"
```

Expected: commit succeeds.

## Task 3: Add Domain Types, Tracks, and Frontend Tests

**Files:**
- Create: `src/domain/types.ts`
- Create: `src/domain/tracks.ts`
- Create: `tests/setup.ts`
- Create: `tests/frontend/App.test.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create shared domain types**

Create `src/domain/types.ts` with:

```ts
export type TrackId = "tsinghua-automation" | "mit-eecs" | "ielts" | "philosophy" | "work-validation";
export type TaskStatus = "backlog" | "active" | "blocked" | "done" | "archived";
export type TaskPriority = "low" | "medium" | "high" | "urgent";

export interface Track {
  id: TrackId;
  name: string;
  description: string;
  obsidianEntry: string;
  canvasEntry: string;
}

export interface LearningTask {
  id: string;
  title: string;
  track: TrackId;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string | null;
  progress: number;
  source: string;
  notes: string;
  obsidianPath: string | null;
  notionPageId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SyncEvent {
  id: string;
  entityType: "task";
  entityId: string;
  target: "obsidian" | "notion";
  status: "pending" | "success" | "failed";
  message: string;
  attemptCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface HealthResponse {
  ok: boolean;
  service: "cyrus-local-sync";
  notionConfigured: boolean;
  obsidianConfigured: boolean;
}
```

- [ ] **Step 2: Create seeded tracks**

Create `src/domain/tracks.ts` with:

```ts
import type { Track } from "./types";

export const tracks: Track[] = [
  {
    id: "tsinghua-automation",
    name: "Tsinghua Automation",
    description: "Professional backbone: math, signals, control, intelligent systems.",
    obsidianEntry: "20_Courses/Tsinghua-Automation/00-Course-Map.md",
    canvasEntry: "80_Canvas/Learning System.canvas"
  },
  {
    id: "mit-eecs",
    name: "MIT EECS",
    description: "Executable CS, systems, algorithms, AI, and robotics resources.",
    obsidianEntry: "20_Courses/MIT-EECS/00-Course-Map.md",
    canvasEntry: "80_Canvas/Learning System.canvas"
  },
  {
    id: "ielts",
    name: "IELTS",
    description: "English input/output system with weekly practice and error logs.",
    obsidianEntry: "20_Courses/IELTS/00-IELTS-Study-Map.md",
    canvasEntry: "80_Canvas/90-Day Plan.canvas"
  },
  {
    id: "philosophy",
    name: "Philosophy",
    description: "Argument clarity, ethics, and technology judgment.",
    obsidianEntry: "20_Courses/Philosophy/00-Philosophy-Study-Map.md",
    canvasEntry: "80_Canvas/Notion Obsidian Loop.canvas"
  },
  {
    id: "work-validation",
    name: "Work Validation",
    description: "Stable validation, failcase closure, KPI gates, and weekly digests.",
    obsidianEntry: "99_Index/Work Dashboard.md",
    canvasEntry: "80_Canvas/Work Closure Loop.canvas"
  }
];
```

- [ ] **Step 3: Add test setup**

Create `tests/setup.ts` with:

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 4: Write frontend smoke test**

Create `tests/frontend/App.test.tsx` with:

```tsx
import { render, screen } from "@testing-library/react";
import { App } from "../../src/App";

describe("App", () => {
  it("renders the learning manager shell", () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: "Cyrus Learning Manager" })).toBeInTheDocument();
    expect(screen.getByText("Tsinghua Automation")).toBeInTheDocument();
    expect(screen.getByText("MIT EECS")).toBeInTheDocument();
    expect(screen.getByText("IELTS")).toBeInTheDocument();
    expect(screen.getByText("Philosophy")).toBeInTheDocument();
  });
});
```

- [ ] **Step 5: Run test and confirm failure**

Run:

```bash
npm test -- tests/frontend/App.test.tsx
```

Expected: FAIL because the app does not render track names yet.

- [ ] **Step 6: Render seeded tracks in the app**

Replace `src/App.tsx` with:

```tsx
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
              <dt>Obsidian</dt>
              <dd>{track.obsidianEntry}</dd>
              <dt>Canvas</dt>
              <dd>{track.canvasEntry}</dd>
            </dl>
          </article>
        ))}
      </section>
    </main>
  );
}
```

Append to `src/styles.css`:

```css
.track-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  margin-top: 32px;
}

.track-card {
  background: #ffffff;
  border: 1px solid #dce3e8;
  border-radius: 8px;
  padding: 18px;
}

.track-card h2 {
  font-size: 20px;
  margin-bottom: 8px;
}

.track-card dl {
  color: #4f606a;
  font-size: 13px;
}

.track-card dt {
  font-weight: 700;
  margin-top: 10px;
}

.track-card dd {
  margin-left: 0;
  word-break: break-word;
}
```

- [ ] **Step 7: Run tests and build**

Run:

```bash
npm test -- tests/frontend/App.test.tsx
npm run build
```

Expected: test and build pass.

- [ ] **Step 8: Commit domain scaffold**

Run:

```bash
git add src tests
git commit -m "feat: add seeded learning tracks"
```

Expected: commit succeeds.

## Task 4: Implement Local Config, SQLite Schema, and Health API

**Files:**
- Create: `server/config.ts`
- Create: `server/db.ts`
- Create: `server/index.ts`
- Create: `server/routes.ts`
- Create: `tests/server/config.test.ts`
- Create: `tests/server/db.test.ts`

- [ ] **Step 1: Write config tests**

Create `tests/server/config.test.ts` with:

```ts
import { describe, expect, it } from "vitest";
import { loadConfig } from "../../server/config";

describe("loadConfig", () => {
  it("uses safe defaults without secrets", () => {
    const config = loadConfig({});
    expect(config.port).toBe(8787);
    expect(config.notionToken).toBeNull();
    expect(config.notionParentPageId).toBe("350ef7e6aaa980629326e56e121a39cb");
    expect(config.obsidianVaultPath).toBe("/Users/cyber/Documents/Obsidian Vault/Cyrus-Knowledge");
  });

  it("parses custom env values", () => {
    const config = loadConfig({
      LOCAL_SYNC_PORT: "9000",
      NOTION_TOKEN: "secret_xxx",
      OBSIDIAN_VAULT_PATH: "/tmp/vault",
      LOCAL_APP_KEY: "local-key"
    });
    expect(config.port).toBe(9000);
    expect(config.notionToken).toBe("secret_xxx");
    expect(config.obsidianVaultPath).toBe("/tmp/vault");
    expect(config.localAppKey).toBe("local-key");
  });
});
```

- [ ] **Step 2: Implement config loader**

Create `server/config.ts` with:

```ts
import "dotenv/config";

export interface AppConfig {
  port: number;
  notionToken: string | null;
  notionParentPageId: string;
  notionTasksDatabaseId: string | null;
  obsidianVaultPath: string;
  localAppKey: string | null;
}

export function loadConfig(env: NodeJS.ProcessEnv = process.env): AppConfig {
  const parsedPort = Number(env.LOCAL_SYNC_PORT ?? "8787");
  return {
    port: Number.isFinite(parsedPort) ? parsedPort : 8787,
    notionToken: env.NOTION_TOKEN?.trim() || null,
    notionParentPageId: env.NOTION_PARENT_PAGE_ID?.trim() || "350ef7e6aaa980629326e56e121a39cb",
    notionTasksDatabaseId: env.NOTION_TASKS_DATABASE_ID?.trim() || null,
    obsidianVaultPath:
      env.OBSIDIAN_VAULT_PATH?.trim() || "/Users/cyber/Documents/Obsidian Vault/Cyrus-Knowledge",
    localAppKey: env.LOCAL_APP_KEY?.trim() || null
  };
}
```

- [ ] **Step 3: Write database migration test**

Create `tests/server/db.test.ts` with:

```ts
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { openDatabase } from "../../server/db";

let tempDir: string | null = null;

afterEach(() => {
  if (tempDir) rmSync(tempDir, { recursive: true, force: true });
  tempDir = null;
});

describe("openDatabase", () => {
  it("creates required tables", () => {
    tempDir = mkdtempSync(join(tmpdir(), "cyrus-db-"));
    const db = openDatabase(join(tempDir, "app.db"));
    const tables = db
      .prepare("SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name")
      .all()
      .map((row: { name: string }) => row.name);
    expect(tables).toContain("tasks");
    expect(tables).toContain("tracks");
    expect(tables).toContain("sync_events");
    db.close();
  });
});
```

- [ ] **Step 4: Implement SQLite schema**

Create `server/db.ts` with:

```ts
import Database from "better-sqlite3";

export function openDatabase(path = "server-data/cyrus-learning.db") {
  const db = new Database(path);
  db.pragma("journal_mode = WAL");
  db.exec(`
    CREATE TABLE IF NOT EXISTS tracks (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      obsidian_entry TEXT NOT NULL,
      canvas_entry TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      track TEXT NOT NULL,
      status TEXT NOT NULL,
      priority TEXT NOT NULL,
      due_date TEXT,
      progress INTEGER NOT NULL DEFAULT 0,
      source TEXT NOT NULL DEFAULT '',
      notes TEXT NOT NULL DEFAULT '',
      obsidian_path TEXT,
      notion_page_id TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS sync_events (
      id TEXT PRIMARY KEY,
      entity_type TEXT NOT NULL,
      entity_id TEXT NOT NULL,
      target TEXT NOT NULL,
      status TEXT NOT NULL,
      message TEXT NOT NULL,
      attempt_count INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);
  return db;
}
```

- [ ] **Step 5: Implement health route**

Create `server/routes.ts` with:

```ts
import type { Express } from "express";
import type { AppConfig } from "./config";

export function registerRoutes(app: Express, config: AppConfig) {
  app.get("/health", (_req, res) => {
    res.json({
      ok: true,
      service: "cyrus-local-sync",
      notionConfigured: Boolean(config.notionToken),
      obsidianConfigured: Boolean(config.obsidianVaultPath)
    });
  });
}
```

Create `server/index.ts` with:

```ts
import cors from "cors";
import express from "express";
import { loadConfig } from "./config";
import { openDatabase } from "./db";
import { registerRoutes } from "./routes";

const config = loadConfig();
openDatabase();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (origin.startsWith("http://localhost:")) return callback(null, true);
      if (origin.startsWith("http://127.0.0.1:")) return callback(null, true);
      if (origin === "https://77zmf.github.io") return callback(null, true);
      return callback(new Error(`Origin not allowed: ${origin}`));
    }
  })
);

registerRoutes(app, config);

app.listen(config.port, "127.0.0.1", () => {
  console.log(`Cyrus local sync service listening on http://127.0.0.1:${config.port}`);
});
```

- [ ] **Step 6: Run backend tests**

Run:

```bash
npm test -- tests/server/config.test.ts tests/server/db.test.ts
```

Expected: tests pass.

- [ ] **Step 7: Commit local service foundation**

Run:

```bash
git add server tests/server package.json package-lock.json
git commit -m "feat: add local sync service foundation"
```

Expected: commit succeeds.

## Task 5: Implement Task CRUD, Filtering, and Search API

**Files:**
- Create: `server/tasks.ts`
- Create: `tests/server/tasks.test.ts`
- Modify: `server/routes.ts`

- [ ] **Step 1: Write task repository tests**

Create `tests/server/tasks.test.ts` with:

```ts
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { openDatabase } from "../../server/db";
import { createTask, listTasks, updateTaskStatus } from "../../server/tasks";

let tempDir: string | null = null;

afterEach(() => {
  if (tempDir) rmSync(tempDir, { recursive: true, force: true });
  tempDir = null;
});

describe("tasks repository", () => {
  function testDb() {
    tempDir = mkdtempSync(join(tmpdir(), "cyrus-tasks-"));
    return openDatabase(join(tempDir, "app.db"));
  }

  it("creates and lists tasks", () => {
    const db = testDb();
    const task = createTask(db, {
      title: "Finish MIT 6.006 graph notes",
      track: "mit-eecs",
      status: "active",
      priority: "high",
      dueDate: "2026-05-03",
      progress: 25,
      source: "MIT OCW",
      notes: "Convert graph shortest path notes into Cyrus concept note."
    });
    expect(task.id).toMatch(/^task_/);
    expect(listTasks(db, { search: "graph" })).toHaveLength(1);
    expect(listTasks(db, { track: "ielts" })).toHaveLength(0);
    db.close();
  });

  it("updates task status and progress", () => {
    const db = testDb();
    const task = createTask(db, {
      title: "IELTS writing task 2",
      track: "ielts",
      status: "backlog",
      priority: "medium",
      dueDate: null,
      progress: 0,
      source: "Cambridge IELTS",
      notes: ""
    });
    const updated = updateTaskStatus(db, task.id, "done", 100);
    expect(updated.status).toBe("done");
    expect(updated.progress).toBe(100);
    db.close();
  });
});
```

- [ ] **Step 2: Implement task repository**

Create `server/tasks.ts` with:

```ts
import type Database from "better-sqlite3";
import type { LearningTask, TaskPriority, TaskStatus, TrackId } from "../src/domain/types";

interface CreateTaskInput {
  title: string;
  track: TrackId;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string | null;
  progress: number;
  source: string;
  notes: string;
}

interface TaskFilters {
  search?: string;
  track?: TrackId;
  status?: TaskStatus;
  priority?: TaskPriority;
}

function nowIso() {
  return new Date().toISOString();
}

function toTask(row: Record<string, unknown>): LearningTask {
  return {
    id: String(row.id),
    title: String(row.title),
    track: row.track as TrackId,
    status: row.status as TaskStatus,
    priority: row.priority as TaskPriority,
    dueDate: row.due_date ? String(row.due_date) : null,
    progress: Number(row.progress),
    source: String(row.source),
    notes: String(row.notes),
    obsidianPath: row.obsidian_path ? String(row.obsidian_path) : null,
    notionPageId: row.notion_page_id ? String(row.notion_page_id) : null,
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at)
  };
}

export function createTask(db: Database.Database, input: CreateTaskInput): LearningTask {
  const timestamp = nowIso();
  const id = `task_${crypto.randomUUID()}`;
  db.prepare(`
    INSERT INTO tasks (
      id, title, track, status, priority, due_date, progress, source, notes, created_at, updated_at
    ) VALUES (
      @id, @title, @track, @status, @priority, @dueDate, @progress, @source, @notes, @createdAt, @updatedAt
    )
  `).run({
    id,
    title: input.title,
    track: input.track,
    status: input.status,
    priority: input.priority,
    dueDate: input.dueDate,
    progress: input.progress,
    source: input.source,
    notes: input.notes,
    createdAt: timestamp,
    updatedAt: timestamp
  });
  return getTask(db, id);
}

export function getTask(db: Database.Database, id: string): LearningTask {
  const row = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id) as Record<string, unknown> | undefined;
  if (!row) throw new Error(`Task not found: ${id}`);
  return toTask(row);
}

export function listTasks(db: Database.Database, filters: TaskFilters = {}): LearningTask[] {
  const clauses: string[] = [];
  const params: Record<string, unknown> = {};
  if (filters.search) {
    clauses.push("(title LIKE @search OR notes LIKE @search OR source LIKE @search)");
    params.search = `%${filters.search}%`;
  }
  if (filters.track) {
    clauses.push("track = @track");
    params.track = filters.track;
  }
  if (filters.status) {
    clauses.push("status = @status");
    params.status = filters.status;
  }
  if (filters.priority) {
    clauses.push("priority = @priority");
    params.priority = filters.priority;
  }
  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  return db
    .prepare(`SELECT * FROM tasks ${where} ORDER BY COALESCE(due_date, '9999-12-31'), updated_at DESC`)
    .all(params)
    .map((row) => toTask(row as Record<string, unknown>));
}

export function updateTaskStatus(
  db: Database.Database,
  id: string,
  status: TaskStatus,
  progress: number
): LearningTask {
  db.prepare("UPDATE tasks SET status = ?, progress = ?, updated_at = ? WHERE id = ?").run(
    status,
    progress,
    nowIso(),
    id
  );
  return getTask(db, id);
}
```

- [ ] **Step 3: Run task tests**

Run:

```bash
npm test -- tests/server/tasks.test.ts
```

Expected: tests pass.

- [ ] **Step 4: Wire task routes**

Modify `server/routes.ts` to:

```ts
import type Database from "better-sqlite3";
import type { Express } from "express";
import type { TaskPriority, TaskStatus, TrackId } from "../src/domain/types";
import type { AppConfig } from "./config";
import { createTask, listTasks, updateTaskStatus } from "./tasks";

export function registerRoutes(app: Express, config: AppConfig, db: Database.Database) {
  app.get("/health", (_req, res) => {
    res.json({
      ok: true,
      service: "cyrus-local-sync",
      notionConfigured: Boolean(config.notionToken),
      obsidianConfigured: Boolean(config.obsidianVaultPath)
    });
  });

  app.get("/tasks", (req, res) => {
    res.json({
      tasks: listTasks(db, {
        search: typeof req.query.search === "string" ? req.query.search : undefined,
        track: typeof req.query.track === "string" ? (req.query.track as TrackId) : undefined,
        status: typeof req.query.status === "string" ? (req.query.status as TaskStatus) : undefined,
        priority: typeof req.query.priority === "string" ? (req.query.priority as TaskPriority) : undefined
      })
    });
  });

  app.post("/tasks", (req, res) => {
    const task = createTask(db, req.body);
    res.status(201).json({ task });
  });

  app.patch("/tasks/:id/status", (req, res) => {
    const task = updateTaskStatus(db, req.params.id, req.body.status, req.body.progress);
    res.json({ task });
  });
}
```

Modify `server/index.ts` route registration line to:

```ts
const db = openDatabase();
registerRoutes(app, config, db);
```

Remove the earlier standalone `openDatabase();` call.

- [ ] **Step 5: Run full tests and build**

Run:

```bash
npm test
npm run build
```

Expected: all tests and build pass.

- [ ] **Step 6: Commit task API**

Run:

```bash
git add server tests src/domain
git commit -m "feat: add task API with search filters"
```

Expected: commit succeeds.

## Task 5A: Add Local App Key Guard for Deployed Pages Writes

**Files:**
- Create: `tests/server/auth.test.ts`
- Create: `server/auth.ts`
- Modify: `server/routes.ts`

- [ ] **Step 1: Write app-key guard test**

Create `tests/server/auth.test.ts` with:

```ts
import { describe, expect, it } from "vitest";
import { isWriteAllowed } from "../../server/auth";

describe("isWriteAllowed", () => {
  it("allows writes when no local app key is configured", () => {
    expect(isWriteAllowed(null, undefined)).toBe(true);
  });

  it("rejects writes when configured key is missing", () => {
    expect(isWriteAllowed("secret-local-key", undefined)).toBe(false);
  });

  it("accepts writes when the request key matches", () => {
    expect(isWriteAllowed("secret-local-key", "secret-local-key")).toBe(true);
  });
});
```

- [ ] **Step 2: Implement app-key guard**

Create `server/auth.ts` with:

```ts
export function isWriteAllowed(configuredKey: string | null, requestKey: string | undefined) {
  if (!configuredKey) return true;
  return requestKey === configuredKey;
}
```

- [ ] **Step 3: Protect write routes**

Modify `server/routes.ts` to import:

```ts
import { isWriteAllowed } from "./auth";
```

Add this helper inside `registerRoutes` before write routes:

```ts
function rejectUnauthorizedWrite(reqKey: string | undefined, res: { status: (code: number) => { json: (body: unknown) => void } }) {
  if (isWriteAllowed(config.localAppKey, reqKey)) return false;
  res.status(401).json({ error: "LOCAL_APP_KEY is required for write requests." });
  return true;
}
```

Add this at the start of `POST /tasks`:

```ts
if (rejectUnauthorizedWrite(req.header("x-cyrus-app-key"), res)) return;
```

Add this at the start of `PATCH /tasks/:id/status`:

```ts
if (rejectUnauthorizedWrite(req.header("x-cyrus-app-key"), res)) return;
```

- [ ] **Step 4: Run auth tests**

Run:

```bash
npm test -- tests/server/auth.test.ts
```

Expected: test passes.

- [ ] **Step 5: Commit app-key guard**

Run:

```bash
git add server/auth.ts server/routes.ts tests/server/auth.test.ts
git commit -m "feat: protect local write endpoints"
```

Expected: commit succeeds.

## Task 6: Add Obsidian Markdown Sync

**Files:**
- Create: `server/sync/obsidian.ts`
- Create: `tests/server/obsidian-sync.test.ts`
- Modify: `server/db.ts`

- [ ] **Step 1: Write Obsidian sync test**

Create `tests/server/obsidian-sync.test.ts` with:

```ts
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import type { LearningTask } from "../../src/domain/types";
import { writeTaskMarkdown } from "../../server/sync/obsidian";

let tempDir: string | null = null;

afterEach(() => {
  if (tempDir) rmSync(tempDir, { recursive: true, force: true });
  tempDir = null;
});

describe("writeTaskMarkdown", () => {
  it("writes generated markdown under 60_Learning-App/Tasks", () => {
    tempDir = mkdtempSync(join(tmpdir(), "cyrus-vault-"));
    const task: LearningTask = {
      id: "task_123",
      title: "MIT graph notes",
      track: "mit-eecs",
      status: "active",
      priority: "high",
      dueDate: "2026-05-03",
      progress: 25,
      source: "MIT OCW",
      notes: "Shortest path review.",
      obsidianPath: null,
      notionPageId: null,
      createdAt: "2026-04-29T00:00:00.000Z",
      updatedAt: "2026-04-29T00:00:00.000Z"
    };
    const result = writeTaskMarkdown(tempDir, task);
    expect(result.relativePath).toBe("60_Learning-App/Tasks/task_123-mit-graph-notes.md");
    const content = readFileSync(join(tempDir, result.relativePath), "utf8");
    expect(content).toContain("type: learning-task");
    expect(content).toContain("id: task_123");
    expect(content).toContain("<!-- CYRUS_LEARNING_MANAGER:GENERATED -->");
    expect(content).toContain("Shortest path review.");
  });
});
```

- [ ] **Step 2: Implement Markdown writer**

Create `server/sync/obsidian.ts` with:

```ts
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { LearningTask } from "../../src/domain/types";

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function yamlValue(value: string | number | null) {
  if (value === null) return "";
  return String(value).replace(/"/g, '\\"');
}

export function writeTaskMarkdown(vaultPath: string, task: LearningTask) {
  const relativeDir = "60_Learning-App/Tasks";
  const fileName = `${task.id}-${slugify(task.title)}.md`;
  const relativePath = `${relativeDir}/${fileName}`;
  const absoluteDir = join(vaultPath, relativeDir);
  mkdirSync(absoluteDir, { recursive: true });

  const markdown = `---
type: learning-task
id: ${yamlValue(task.id)}
track: ${yamlValue(task.track)}
status: ${yamlValue(task.status)}
priority: ${yamlValue(task.priority)}
due: ${yamlValue(task.dueDate)}
progress: ${task.progress}
notion_page_id: ${yamlValue(task.notionPageId)}
updated: ${yamlValue(task.updatedAt)}
---

<!-- CYRUS_LEARNING_MANAGER:GENERATED -->

# ${task.title}

## Summary

- Track: ${task.track}
- Status: ${task.status}
- Priority: ${task.priority}
- Progress: ${task.progress}%
- Source: ${task.source || "none"}

## Notes

${task.notes || "No notes yet."}

## Evidence or Output

No evidence linked yet.

## Next Action

Review and update this task in Cyrus Learning Manager.

## Sync Metadata

- Task ID: ${task.id}
- Notion Page ID: ${task.notionPageId || ""}
`;

  writeFileSync(join(vaultPath, relativePath), markdown, "utf8");
  return { relativePath };
}
```

- [ ] **Step 3: Run Obsidian sync test**

Run:

```bash
npm test -- tests/server/obsidian-sync.test.ts
```

Expected: test passes.

- [ ] **Step 4: Commit Obsidian sync**

Run:

```bash
git add server/sync tests/server/obsidian-sync.test.ts
git commit -m "feat: add obsidian markdown sync"
```

Expected: commit succeeds.

## Task 7: Add Notion Adapter With Safe Disabled Mode and Schema Validation

**Files:**
- Create: `server/sync/notion.ts`
- Create: `tests/server/notion-sync.test.ts`

- [ ] **Step 1: Write Notion disabled-mode and schema tests**

Create `tests/server/notion-sync.test.ts` with:

```ts
import { describe, expect, it } from "vitest";
import type { LearningTask } from "../../src/domain/types";
import { syncTaskToNotion, validateNotionDatabaseSchema } from "../../server/sync/notion";

const task: LearningTask = {
  id: "task_123",
  title: "Philosophy reading",
  track: "philosophy",
  status: "active",
  priority: "medium",
  dueDate: null,
  progress: 10,
  source: "reading sequence",
  notes: "Read Plato selection.",
  obsidianPath: "60_Learning-App/Tasks/task_123-philosophy-reading.md",
  notionPageId: null,
  createdAt: "2026-04-29T00:00:00.000Z",
  updatedAt: "2026-04-29T00:00:00.000Z"
};

describe("syncTaskToNotion", () => {
  it("returns skipped when Notion is not configured", async () => {
    const result = await syncTaskToNotion({
      task,
      notionToken: null,
      databaseId: null
    });
    expect(result.status).toBe("skipped");
    expect(result.message).toContain("NOTION_TOKEN");
  });
});

describe("validateNotionDatabaseSchema", () => {
  it("reports missing configuration without calling Notion", async () => {
    const result = await validateNotionDatabaseSchema({
      notionToken: null,
      databaseId: null
    });
    expect(result.ok).toBe(false);
    expect(result.message).toContain("NOTION_TASKS_DATABASE_ID");
  });
});
```

- [ ] **Step 2: Implement Notion adapter**

Create `server/sync/notion.ts` with:

```ts
import { Client } from "@notionhq/client";
import type { LearningTask } from "../../src/domain/types";

interface SyncTaskToNotionInput {
  task: LearningTask;
  notionToken: string | null;
  databaseId: string | null;
}

interface ValidateNotionDatabaseSchemaInput {
  notionToken: string | null;
  databaseId: string | null;
}

const requiredProperties = [
  "Name",
  "Track",
  "Status",
  "Priority",
  "Due",
  "Progress",
  "Source",
  "Obsidian Path",
  "Updated At"
];

export async function validateNotionDatabaseSchema(input: ValidateNotionDatabaseSchemaInput) {
  if (!input.notionToken || !input.databaseId) {
    return {
      ok: false,
      message: "NOTION_TOKEN and NOTION_TASKS_DATABASE_ID are required to validate Notion schema."
    };
  }

  const notion = new Client({ auth: input.notionToken });
  const database = await notion.databases.retrieve({ database_id: input.databaseId });
  const properties = "properties" in database ? database.properties : {};
  const missing = requiredProperties.filter((property) => !(property in properties));

  if (missing.length) {
    return {
      ok: false,
      message: `Notion database is missing required properties: ${missing.join(", ")}`
    };
  }

  return {
    ok: true,
    message: "Notion database schema is valid."
  };
}

export async function syncTaskToNotion(input: SyncTaskToNotionInput) {
  if (!input.notionToken || !input.databaseId) {
    return {
      status: "skipped" as const,
      pageId: input.task.notionPageId,
      message: "NOTION_TOKEN and NOTION_TASKS_DATABASE_ID are required for Notion sync."
    };
  }

  const notion = new Client({ auth: input.notionToken });
  const properties = {
    Name: {
      title: [{ text: { content: input.task.title } }]
    },
    Track: {
      select: { name: input.task.track }
    },
    Status: {
      select: { name: input.task.status }
    },
    Priority: {
      select: { name: input.task.priority }
    },
    Progress: {
      number: input.task.progress
    },
    Source: {
      rich_text: [{ text: { content: input.task.source } }]
    },
    "Obsidian Path": {
      rich_text: [{ text: { content: input.task.obsidianPath ?? "" } }]
    },
    "Updated At": {
      date: { start: input.task.updatedAt }
    }
  };

  if (input.task.dueDate) {
    Object.assign(properties, {
      Due: {
        date: { start: input.task.dueDate }
      }
    });
  }

  if (input.task.notionPageId) {
    await notion.pages.update({
      page_id: input.task.notionPageId,
      properties
    });
    return {
      status: "success" as const,
      pageId: input.task.notionPageId,
      message: "Updated Notion task page."
    };
  }

  const created = await notion.pages.create({
    parent: { database_id: input.databaseId },
    properties
  });

  return {
    status: "success" as const,
    pageId: created.id,
    message: "Created Notion task page."
  };
}
```

- [ ] **Step 3: Run Notion adapter tests**

Run:

```bash
npm test -- tests/server/notion-sync.test.ts
```

Expected: test passes without a real Notion token.

- [ ] **Step 4: Commit Notion adapter**

Run:

```bash
git add server/sync/notion.ts tests/server/notion-sync.test.ts
git commit -m "feat: add notion sync adapter"
```

Expected: commit succeeds.

## Task 8: Add Sync Queue and Connect Writes to Task Changes

**Files:**
- Create: `server/sync/queue.ts`
- Create: `tests/server/sync-queue.test.ts`
- Modify: `server/routes.ts`

- [ ] **Step 1: Write sync queue test**

Create `tests/server/sync-queue.test.ts` with:

```ts
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { openDatabase } from "../../server/db";
import { createTask } from "../../server/tasks";
import { syncTask } from "../../server/sync/queue";

let tempDir: string | null = null;

afterEach(() => {
  if (tempDir) rmSync(tempDir, { recursive: true, force: true });
  tempDir = null;
});

describe("syncTask", () => {
  it("writes Obsidian and records skipped Notion when Notion is disabled", async () => {
    tempDir = mkdtempSync(join(tmpdir(), "cyrus-sync-"));
    const db = openDatabase(join(tempDir, "app.db"));
    const task = createTask(db, {
      title: "Control systems review",
      track: "tsinghua-automation",
      status: "active",
      priority: "high",
      dueDate: null,
      progress: 20,
      source: "course map",
      notes: "Review stability notes."
    });
    const result = await syncTask(db, task, {
      obsidianVaultPath: tempDir,
      notionToken: null,
      notionTasksDatabaseId: null
    });
    expect(result.obsidian.status).toBe("success");
    expect(result.notion.status).toBe("skipped");
    const events = db.prepare("SELECT target, status FROM sync_events ORDER BY target").all();
    expect(events).toEqual([
      { target: "notion", status: "failed" },
      { target: "obsidian", status: "success" }
    ]);
    db.close();
  });
});
```

- [ ] **Step 2: Implement sync queue**

Create `server/sync/queue.ts` with:

```ts
import type Database from "better-sqlite3";
import type { LearningTask } from "../../src/domain/types";
import { syncTaskToNotion } from "./notion";
import { writeTaskMarkdown } from "./obsidian";

interface SyncConfig {
  obsidianVaultPath: string;
  notionToken: string | null;
  notionTasksDatabaseId: string | null;
}

function eventId() {
  return `sync_${crypto.randomUUID()}`;
}

function nowIso() {
  return new Date().toISOString();
}

function recordEvent(
  db: Database.Database,
  entityId: string,
  target: "obsidian" | "notion",
  status: "success" | "failed",
  message: string
) {
  const timestamp = nowIso();
  db.prepare(`
    INSERT INTO sync_events (
      id, entity_type, entity_id, target, status, message, attempt_count, created_at, updated_at
    ) VALUES (
      @id, 'task', @entityId, @target, @status, @message, 1, @createdAt, @updatedAt
    )
  `).run({
    id: eventId(),
    entityId,
    target,
    status,
    message,
    createdAt: timestamp,
    updatedAt: timestamp
  });
}

export async function syncTask(db: Database.Database, task: LearningTask, config: SyncConfig) {
  let obsidianResult: { status: "success" | "failed"; message: string; relativePath?: string };
  try {
    const written = writeTaskMarkdown(config.obsidianVaultPath, task);
    db.prepare("UPDATE tasks SET obsidian_path = ?, updated_at = ? WHERE id = ?").run(
      written.relativePath,
      nowIso(),
      task.id
    );
    obsidianResult = { status: "success", message: `Wrote ${written.relativePath}`, relativePath: written.relativePath };
    recordEvent(db, task.id, "obsidian", "success", obsidianResult.message);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Obsidian sync error";
    obsidianResult = { status: "failed", message };
    recordEvent(db, task.id, "obsidian", "failed", message);
  }

  const taskForNotion = {
    ...task,
    obsidianPath: obsidianResult.relativePath ?? task.obsidianPath
  };
  const notion = await syncTaskToNotion({
    task: taskForNotion,
    notionToken: config.notionToken,
    databaseId: config.notionTasksDatabaseId
  });
  if (notion.status === "success" && notion.pageId) {
    db.prepare("UPDATE tasks SET notion_page_id = ?, updated_at = ? WHERE id = ?").run(
      notion.pageId,
      nowIso(),
      task.id
    );
    recordEvent(db, task.id, "notion", "success", notion.message);
  } else {
    recordEvent(db, task.id, "notion", "failed", notion.message);
  }

  return { obsidian: obsidianResult, notion };
}
```

- [ ] **Step 3: Run sync queue test**

Run:

```bash
npm test -- tests/server/sync-queue.test.ts
```

Expected: test passes.

- [ ] **Step 4: Trigger sync from routes**

Modify `server/routes.ts` create/update handlers to call `syncTask(db, task, ...)` after SQLite writes. Use:

```ts
import { syncTask } from "./sync/queue";
```

After `const task = createTask(db, req.body);`, add:

```ts
void syncTask(db, task, {
  obsidianVaultPath: config.obsidianVaultPath,
  notionToken: config.notionToken,
  notionTasksDatabaseId: config.notionTasksDatabaseId
});
```

After status updates, add the same `void syncTask(...)` call with the updated task.

- [ ] **Step 5: Commit sync queue**

Run:

```bash
git add server/sync/queue.ts server/routes.ts tests/server/sync-queue.test.ts
git commit -m "feat: sync task changes to obsidian and notion"
```

Expected: commit succeeds.

## Task 9: Build Frontend API Client and Main Views

**Files:**
- Create: `src/api/client.ts`
- Create: `src/components/Dashboard.tsx`
- Create: `src/components/TasksView.tsx`
- Create: `src/components/CoursesView.tsx`
- Create: `src/components/ProgressView.tsx`
- Create: `src/components/SyncCenter.tsx`
- Modify: `src/App.tsx`
- Modify: `src/styles.css`

- [ ] **Step 1: Create API client**

Create `src/api/client.ts` with:

```ts
import type { HealthResponse, LearningTask, TaskPriority, TaskStatus, TrackId } from "../domain/types";

const baseUrl = "http://127.0.0.1:8787";

export async function getHealth(): Promise<HealthResponse> {
  const response = await fetch(`${baseUrl}/health`);
  if (!response.ok) throw new Error("Local sync service is not reachable.");
  return response.json();
}

export async function listTasks(filters: {
  search?: string;
  track?: TrackId | "";
  status?: TaskStatus | "";
  priority?: TaskPriority | "";
}): Promise<LearningTask[]> {
  const params = new URLSearchParams();
  if (filters.search) params.set("search", filters.search);
  if (filters.track) params.set("track", filters.track);
  if (filters.status) params.set("status", filters.status);
  if (filters.priority) params.set("priority", filters.priority);
  const response = await fetch(`${baseUrl}/tasks?${params.toString()}`);
  if (!response.ok) throw new Error("Failed to load tasks.");
  const data = (await response.json()) as { tasks: LearningTask[] };
  return data.tasks;
}
```

- [ ] **Step 2: Create view components**

Create `src/components/CoursesView.tsx` with:

```tsx
import { tracks } from "../domain/tracks";

export function CoursesView() {
  return (
    <section className="panel">
      <h2>Courses</h2>
      <div className="track-grid">
        {tracks.map((track) => (
          <article className="track-card" key={track.id}>
            <h3>{track.name}</h3>
            <p>{track.description}</p>
            <small>{track.obsidianEntry}</small>
          </article>
        ))}
      </div>
    </section>
  );
}
```

Create `src/components/Dashboard.tsx` with:

```tsx
import type { LearningTask } from "../domain/types";

export function Dashboard({ tasks }: { tasks: LearningTask[] }) {
  const active = tasks.filter((task) => task.status === "active").length;
  const done = tasks.filter((task) => task.status === "done").length;
  return (
    <section className="metric-grid" aria-label="Dashboard metrics">
      <article className="metric">
        <span>Active</span>
        <strong>{active}</strong>
      </article>
      <article className="metric">
        <span>Done</span>
        <strong>{done}</strong>
      </article>
      <article className="metric">
        <span>Total</span>
        <strong>{tasks.length}</strong>
      </article>
    </section>
  );
}
```

Create `src/components/TasksView.tsx` with:

```tsx
import type { LearningTask } from "../domain/types";

export function TasksView({ tasks }: { tasks: LearningTask[] }) {
  return (
    <section className="panel">
      <h2>Tasks</h2>
      <div className="task-list">
        {tasks.map((task) => (
          <article className="task-row" key={task.id}>
            <div>
              <h3>{task.title}</h3>
              <p>{task.track} · {task.priority}</p>
            </div>
            <span>{task.status}</span>
            <progress value={task.progress} max={100} />
          </article>
        ))}
      </div>
    </section>
  );
}
```

Create `src/components/ProgressView.tsx` with:

```tsx
import type { LearningTask } from "../domain/types";

export function ProgressView({ tasks }: { tasks: LearningTask[] }) {
  const average = tasks.length ? Math.round(tasks.reduce((sum, task) => sum + task.progress, 0) / tasks.length) : 0;
  return (
    <section className="panel">
      <h2>Progress</h2>
      <p className="large-number">{average}%</p>
      <p>Average progress across tracked tasks.</p>
    </section>
  );
}
```

Create `src/components/SyncCenter.tsx` with:

```tsx
import type { HealthResponse } from "../domain/types";

export function SyncCenter({ health, error }: { health: HealthResponse | null; error: string | null }) {
  return (
    <section className="panel">
      <h2>Sync Center</h2>
      {error ? <p className="error">{error}</p> : null}
      {health ? (
        <ul>
          <li>Local service: connected</li>
          <li>Obsidian: {health.obsidianConfigured ? "configured" : "missing"}</li>
          <li>Notion: {health.notionConfigured ? "configured" : "disabled"}</li>
        </ul>
      ) : (
        <p>Local sync service disconnected.</p>
      )}
    </section>
  );
}
```

- [ ] **Step 3: Replace app with tabbed shell**

Replace `src/App.tsx` with:

```tsx
import { useEffect, useState } from "react";
import { getHealth, listTasks } from "./api/client";
import { CoursesView } from "./components/CoursesView";
import { Dashboard } from "./components/Dashboard";
import { ProgressView } from "./components/ProgressView";
import { SyncCenter } from "./components/SyncCenter";
import { TasksView } from "./components/TasksView";
import type { HealthResponse, LearningTask } from "./domain/types";

type Tab = "dashboard" | "tasks" | "courses" | "progress" | "sync";

export function App() {
  const [tab, setTab] = useState<Tab>("dashboard");
  const [tasks, setTasks] = useState<LearningTask[]>([]);
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void Promise.all([getHealth(), listTasks({})])
      .then(([nextHealth, nextTasks]) => {
        setHealth(nextHealth);
        setTasks(nextTasks);
        setError(null);
      })
      .catch((caught: unknown) => {
        setHealth(null);
        setError(caught instanceof Error ? caught.message : "Local sync service unavailable.");
      });
  }, []);

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Cyrus Knowledge</p>
          <h1>Cyrus Learning Manager</h1>
        </div>
        <span className="status-pill">Local Sync: {health ? "connected" : "disconnected"}</span>
      </header>
      <nav className="tabs" aria-label="Main views">
        {(["dashboard", "tasks", "courses", "progress", "sync"] as Tab[]).map((item) => (
          <button className={tab === item ? "active" : ""} key={item} onClick={() => setTab(item)}>
            {item}
          </button>
        ))}
      </nav>
      {tab === "dashboard" ? <Dashboard tasks={tasks} /> : null}
      {tab === "tasks" ? <TasksView tasks={tasks} /> : null}
      {tab === "courses" ? <CoursesView /> : null}
      {tab === "progress" ? <ProgressView tasks={tasks} /> : null}
      {tab === "sync" ? <SyncCenter health={health} error={error} /> : null}
    </main>
  );
}
```

- [ ] **Step 4: Add UI styles**

Append to `src/styles.css`:

```css
.tabs {
  display: flex;
  gap: 8px;
  margin: 24px 0;
  overflow-x: auto;
}

.tabs button {
  background: #ffffff;
  border: 1px solid #cdd7de;
  border-radius: 8px;
  color: #24323b;
  cursor: pointer;
  padding: 10px 14px;
}

.tabs button.active {
  background: #1f5c75;
  border-color: #1f5c75;
  color: #ffffff;
}

.panel,
.metric,
.task-row {
  background: #ffffff;
  border: 1px solid #dce3e8;
  border-radius: 8px;
  padding: 18px;
}

.metric-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
}

.metric span {
  color: #5a6b75;
}

.metric strong,
.large-number {
  display: block;
  font-size: 36px;
  margin-top: 8px;
}

.task-list {
  display: grid;
  gap: 12px;
}

.task-row {
  align-items: center;
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr auto 160px;
}

.task-row h3 {
  margin-bottom: 4px;
}

.task-row p {
  color: #5a6b75;
  margin-bottom: 0;
}

.error {
  color: #a33a2a;
}

@media (max-width: 720px) {
  .topbar,
  .task-row {
    align-items: stretch;
    grid-template-columns: 1fr;
  }

  .topbar {
    display: grid;
  }
}
```

- [ ] **Step 5: Run frontend tests and build**

Run:

```bash
npm test -- tests/frontend/App.test.tsx
npm run build
```

Expected: tests and build pass. The app can render with local sync disconnected.

- [ ] **Step 6: Commit frontend views**

Run:

```bash
git add src tests/frontend
git commit -m "feat: add learning manager views"
```

Expected: commit succeeds.

## Task 9A: Add Task Creation, Status Updates, Search, and Filters to UI

**Files:**
- Modify: `src/api/client.ts`
- Modify: `src/components/TasksView.tsx`
- Modify: `src/App.tsx`
- Modify: `src/styles.css`
- Create: `tests/frontend/TasksView.test.tsx`

- [ ] **Step 1: Add write methods to API client**

Append to `src/api/client.ts`:

```ts
export interface CreateTaskInput {
  title: string;
  track: TrackId;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string | null;
  progress: number;
  source: string;
  notes: string;
}

function writeHeaders() {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const localKey = window.localStorage.getItem("cyrus_local_app_key");
  if (localKey) headers["x-cyrus-app-key"] = localKey;
  return headers;
}

export async function createTask(input: CreateTaskInput): Promise<LearningTask> {
  const response = await fetch(`${baseUrl}/tasks`, {
    method: "POST",
    headers: writeHeaders(),
    body: JSON.stringify(input)
  });
  if (!response.ok) throw new Error("Failed to create task.");
  const data = (await response.json()) as { task: LearningTask };
  return data.task;
}

export async function updateTaskStatus(taskId: string, status: TaskStatus, progress: number): Promise<LearningTask> {
  const response = await fetch(`${baseUrl}/tasks/${taskId}/status`, {
    method: "PATCH",
    headers: writeHeaders(),
    body: JSON.stringify({ status, progress })
  });
  if (!response.ok) throw new Error("Failed to update task status.");
  const data = (await response.json()) as { task: LearningTask };
  return data.task;
}
```

- [ ] **Step 2: Write TasksView interaction test**

Create `tests/frontend/TasksView.test.tsx` with:

```tsx
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TasksView } from "../../src/components/TasksView";
import type { LearningTask } from "../../src/domain/types";

const task: LearningTask = {
  id: "task_1",
  title: "MIT algorithms drill",
  track: "mit-eecs",
  status: "active",
  priority: "high",
  dueDate: "2026-05-03",
  progress: 40,
  source: "MIT OCW",
  notes: "Graph search",
  obsidianPath: null,
  notionPageId: null,
  createdAt: "2026-04-29T00:00:00.000Z",
  updatedAt: "2026-04-29T00:00:00.000Z"
};

describe("TasksView", () => {
  it("filters visible tasks by search text", () => {
    render(
      <TasksView
        tasks={[task]}
        search=""
        track=""
        status=""
        priority=""
        onSearchChange={vi.fn()}
        onTrackChange={vi.fn()}
        onStatusChange={vi.fn()}
        onPriorityChange={vi.fn()}
        onCreateTask={vi.fn()}
        onStatusUpdate={vi.fn()}
      />
    );
    expect(screen.getByText("MIT algorithms drill")).toBeInTheDocument();
  });

  it("submits a new task title", () => {
    const onCreateTask = vi.fn();
    render(
      <TasksView
        tasks={[]}
        search=""
        track=""
        status=""
        priority=""
        onSearchChange={vi.fn()}
        onTrackChange={vi.fn()}
        onStatusChange={vi.fn()}
        onPriorityChange={vi.fn()}
        onCreateTask={onCreateTask}
        onStatusUpdate={vi.fn()}
      />
    );
    fireEvent.change(screen.getByLabelText("New task title"), { target: { value: "Read control chapter" } });
    fireEvent.click(screen.getByRole("button", { name: "Create task" }));
    expect(onCreateTask).toHaveBeenCalledWith(expect.objectContaining({ title: "Read control chapter" }));
  });
});
```

- [ ] **Step 3: Replace TasksView with filterable editor**

Replace `src/components/TasksView.tsx` with:

```tsx
import { useState } from "react";
import { tracks } from "../domain/tracks";
import type { LearningTask, TaskPriority, TaskStatus, TrackId } from "../domain/types";
import type { CreateTaskInput } from "../api/client";

interface TasksViewProps {
  tasks: LearningTask[];
  search: string;
  track: TrackId | "";
  status: TaskStatus | "";
  priority: TaskPriority | "";
  onSearchChange: (value: string) => void;
  onTrackChange: (value: TrackId | "") => void;
  onStatusChange: (value: TaskStatus | "") => void;
  onPriorityChange: (value: TaskPriority | "") => void;
  onCreateTask: (input: CreateTaskInput) => void;
  onStatusUpdate: (taskId: string, status: TaskStatus, progress: number) => void;
}

export function TasksView(props: TasksViewProps) {
  const [title, setTitle] = useState("");
  const [newTrack, setNewTrack] = useState<TrackId>("mit-eecs");

  function submitTask() {
    if (!title.trim()) return;
    props.onCreateTask({
      title: title.trim(),
      track: newTrack,
      status: "active",
      priority: "medium",
      dueDate: null,
      progress: 0,
      source: "Cyrus Learning Manager",
      notes: ""
    });
    setTitle("");
  }

  return (
    <section className="panel">
      <h2>Tasks</h2>
      <div className="filters">
        <label>
          Search
          <input value={props.search} onChange={(event) => props.onSearchChange(event.target.value)} />
        </label>
        <label>
          Track
          <select value={props.track} onChange={(event) => props.onTrackChange(event.target.value as TrackId | "")}>
            <option value="">All</option>
            {tracks.map((item) => (
              <option key={item.id} value={item.id}>{item.name}</option>
            ))}
          </select>
        </label>
        <label>
          Status
          <select value={props.status} onChange={(event) => props.onStatusChange(event.target.value as TaskStatus | "")}>
            <option value="">All</option>
            <option value="backlog">backlog</option>
            <option value="active">active</option>
            <option value="blocked">blocked</option>
            <option value="done">done</option>
            <option value="archived">archived</option>
          </select>
        </label>
        <label>
          Priority
          <select value={props.priority} onChange={(event) => props.onPriorityChange(event.target.value as TaskPriority | "")}>
            <option value="">All</option>
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
            <option value="urgent">urgent</option>
          </select>
        </label>
      </div>
      <div className="create-task">
        <label>
          New task title
          <input value={title} onChange={(event) => setTitle(event.target.value)} />
        </label>
        <label>
          New task track
          <select value={newTrack} onChange={(event) => setNewTrack(event.target.value as TrackId)}>
            {tracks.map((item) => (
              <option key={item.id} value={item.id}>{item.name}</option>
            ))}
          </select>
        </label>
        <button onClick={submitTask}>Create task</button>
      </div>
      <div className="task-list">
        {props.tasks.map((task) => (
          <article className="task-row" key={task.id}>
            <div>
              <h3>{task.title}</h3>
              <p>{task.track} · {task.priority}</p>
            </div>
            <select
              value={task.status}
              onChange={(event) =>
                props.onStatusUpdate(task.id, event.target.value as TaskStatus, event.target.value === "done" ? 100 : task.progress)
              }
            >
              <option value="backlog">backlog</option>
              <option value="active">active</option>
              <option value="blocked">blocked</option>
              <option value="done">done</option>
              <option value="archived">archived</option>
            </select>
            <progress value={task.progress} max={100} />
          </article>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Wire App state to task filters and writes**

Modify imports in `src/App.tsx`:

```tsx
import { createTask, getHealth, listTasks, updateTaskStatus } from "./api/client";
import type { HealthResponse, LearningTask, TaskPriority, TaskStatus, TrackId } from "./domain/types";
import type { CreateTaskInput } from "./api/client";
```

Add state after existing state declarations:

```tsx
const [search, setSearch] = useState("");
const [track, setTrack] = useState<TrackId | "">("");
const [status, setStatus] = useState<TaskStatus | "">("");
const [priority, setPriority] = useState<TaskPriority | "">("");
```

Replace the existing loading `useEffect` with:

```tsx
useEffect(() => {
  void Promise.all([getHealth(), listTasks({ search, track, status, priority })])
    .then(([nextHealth, nextTasks]) => {
      setHealth(nextHealth);
      setTasks(nextTasks);
      setError(null);
    })
    .catch((caught: unknown) => {
      setHealth(null);
      setError(caught instanceof Error ? caught.message : "Local sync service unavailable.");
    });
}, [search, track, status, priority]);
```

Add handlers before `return`:

```tsx
function handleCreateTask(input: CreateTaskInput) {
  void createTask(input)
    .then((task) => setTasks((current) => [task, ...current]))
    .catch((caught: unknown) => setError(caught instanceof Error ? caught.message : "Failed to create task."));
}

function handleStatusUpdate(taskId: string, nextStatus: TaskStatus, progress: number) {
  void updateTaskStatus(taskId, nextStatus, progress)
    .then((updated) => setTasks((current) => current.map((task) => (task.id === updated.id ? updated : task))))
    .catch((caught: unknown) => setError(caught instanceof Error ? caught.message : "Failed to update task."));
}
```

Replace the `TasksView` render with:

```tsx
{tab === "tasks" ? (
  <TasksView
    tasks={tasks}
    search={search}
    track={track}
    status={status}
    priority={priority}
    onSearchChange={setSearch}
    onTrackChange={setTrack}
    onStatusChange={setStatus}
    onPriorityChange={setPriority}
    onCreateTask={handleCreateTask}
    onStatusUpdate={handleStatusUpdate}
  />
) : null}
```

- [ ] **Step 5: Add form styles**

Append to `src/styles.css`:

```css
.filters,
.create-task {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  margin-bottom: 18px;
}

label {
  color: #40515c;
  display: grid;
  font-size: 13px;
  gap: 6px;
}

input,
select,
button {
  border: 1px solid #cdd7de;
  border-radius: 8px;
  font: inherit;
  padding: 10px 12px;
}

button {
  background: #1f5c75;
  color: #ffffff;
  cursor: pointer;
}
```

- [ ] **Step 6: Run UI tests and build**

Run:

```bash
npm test -- tests/frontend/TasksView.test.tsx tests/frontend/App.test.tsx
npm run build
```

Expected: tests and build pass.

- [ ] **Step 7: Commit task management UI**

Run:

```bash
git add src tests/frontend
git commit -m "feat: add task management controls"
```

Expected: commit succeeds.

## Task 10: Final Verification and Push

**Files:**
- Modify as needed based on failed verification only.

- [ ] **Step 1: Run all automated checks**

Run:

```bash
npm test
npm run build
```

Expected: all tests pass and `dist/` builds.

- [ ] **Step 2: Run local sync service**

Run:

```bash
cp .env.example .env.local
npm run dev:sync
```

Expected: service logs `Cyrus local sync service listening on http://127.0.0.1:8787`.

- [ ] **Step 3: Run frontend preview in a second terminal**

Run:

```bash
npm run dev:web
```

Expected: Vite serves the frontend at `http://127.0.0.1:5173/Cyrus-Learning-Manager/`.

- [ ] **Step 4: Verify API health manually**

Run:

```bash
curl http://127.0.0.1:8787/health
```

Expected JSON includes:

```json
{
  "ok": true,
  "service": "cyrus-local-sync"
}
```

- [ ] **Step 5: Push main branch**

Run:

```bash
git status --short
git push -u origin main
```

Expected: branch pushes to `77zmf/Cyrus-Learning-Manager`.

- [ ] **Step 6: Check Pages workflow**

Run:

```bash
gh run list --repo 77zmf/Cyrus-Learning-Manager --limit 5
```

Expected: `Deploy GitHub Pages` workflow appears. If GitHub Pages is unavailable because the repository is private under the current account plan, keep the repo private and report that Pages needs either a public repository or a plan that supports private Pages.

## Self-Review Notes

- Spec coverage: this plan covers GitHub Pages, local sync service, local app-key protection, SQLite, Obsidian Markdown sync, Notion safe disabled mode, Notion schema validation, task CRUD/search/filter, UI task creation/status updates, build verification, and push.
- Secret handling: `.env.example` lists all supported environment variables with empty values only and `.env.local` is ignored. Local defaults are supplied by `server/config.ts`.
- GitHub Pages limitation: the plan keeps all private writes in the local sync service.
- Notion setup boundary: the implementation validates an existing `NOTION_TASKS_DATABASE_ID`; if the database ID is missing, the app reports a setup error and keeps local SQLite plus Obsidian sync working.
