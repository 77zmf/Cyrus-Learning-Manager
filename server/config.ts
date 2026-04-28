import { config as loadDotenv } from "dotenv";

loadDotenv({ path: ".env.local", override: false });
loadDotenv({ path: ".env", override: false });

export interface AppConfig {
  port: number;
  notionToken: string | null;
  notionParentPageId: string;
  notionTasksDatabaseId: string | null;
  obsidianVaultPath: string;
  localAppKey: string | null;
}

const defaultParentPageId = "350ef7e6aaa980629326e56e121a39cb";
const defaultObsidianVaultPath = "/Users/cyber/Documents/Obsidian Vault/Cyrus-Knowledge";

export function loadConfig(env: NodeJS.ProcessEnv = process.env): AppConfig {
  const portValue = env.LOCAL_SYNC_PORT?.trim() || "8787";
  const parsedPort = Number(portValue);

  return {
    port: Number.isInteger(parsedPort) && parsedPort > 0 && parsedPort <= 65535 ? parsedPort : 8787,
    notionToken: env.NOTION_TOKEN?.trim() || null,
    notionParentPageId: env.NOTION_PARENT_PAGE_ID?.trim() || defaultParentPageId,
    notionTasksDatabaseId: env.NOTION_TASKS_DATABASE_ID?.trim() || null,
    obsidianVaultPath: env.OBSIDIAN_VAULT_PATH?.trim() || defaultObsidianVaultPath,
    localAppKey: env.LOCAL_APP_KEY?.trim() || null
  };
}
