import type { Express } from "express";
import type Database from "better-sqlite3";
import type { AppConfig } from "./config";
import { isWriteAllowed } from "./auth";
import { recordSyncFailure, syncTask } from "./sync/queue";
import { createTask, listTasks, updateTaskStatus } from "./tasks";
import type { TaskPriority, TaskStatus, TrackId } from "../src/domain/types";

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
    try {
      res.json({
        tasks: listTasks(db, {
          search: readQueryValue(req.query.search),
          track: readQueryValue(req.query.track) as TrackId | undefined,
          status: readQueryValue(req.query.status) as TaskStatus | undefined,
          priority: readQueryValue(req.query.priority) as TaskPriority | undefined
        })
      });
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : "Invalid task filters" });
    }
  });

  app.post("/tasks", (req, res) => {
    if (!isWriteAllowed(config.localAppKey, req.header("x-cyrus-app-key"), req.header("origin"))) {
      res.status(401).json({ error: "Missing or invalid app key" });
      return;
    }

    try {
      const task = createTask(db, req.body);
      void syncTask(db, task, config).catch((error: unknown) => {
        recordSyncFailure(
          db,
          task.id,
          "obsidian",
          error instanceof Error ? error.message : "Unexpected sync failure"
        );
      });
      res.status(201).json({ task });
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : "Invalid task" });
    }
  });

  app.patch("/tasks/:id/status", (req, res) => {
    if (!isWriteAllowed(config.localAppKey, req.header("x-cyrus-app-key"), req.header("origin"))) {
      res.status(401).json({ error: "Missing or invalid app key" });
      return;
    }

    try {
      const task = updateTaskStatus(db, req.params.id, req.body.status, req.body.progress);
      if (!task) {
        res.status(404).json({ error: "Task not found" });
        return;
      }
      void syncTask(db, task, config).catch((error: unknown) => {
        recordSyncFailure(
          db,
          task.id,
          "obsidian",
          error instanceof Error ? error.message : "Unexpected sync failure"
        );
      });
      res.json({ task });
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : "Invalid status" });
    }
  });
}

function readQueryValue(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}
