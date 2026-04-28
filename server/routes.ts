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
