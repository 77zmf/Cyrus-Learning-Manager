import { describe, expect, it } from "vitest";
import { loadConfig } from "../../server/config";

describe("loadConfig", () => {
  it("uses local defaults without secrets", () => {
    const config = loadConfig({});

    expect(config).toEqual({
      port: 8787,
      notionToken: null,
      notionParentPageId: "350ef7e6aaa980629326e56e121a39cb",
      notionTasksDatabaseId: null,
      obsidianVaultPath: "/Users/cyber/Documents/Obsidian Vault/Cyrus-Knowledge",
      localAppKey: null
    });
  });

  it("parses custom env values", () => {
    const config = loadConfig({
      LOCAL_SYNC_PORT: "9000",
      NOTION_TOKEN: " secret_xxx ",
      NOTION_PARENT_PAGE_ID: " parent-id ",
      NOTION_TASKS_DATABASE_ID: " tasks-db ",
      OBSIDIAN_VAULT_PATH: " /tmp/vault ",
      LOCAL_APP_KEY: " local-key "
    });

    expect(config).toEqual({
      port: 9000,
      notionToken: "secret_xxx",
      notionParentPageId: "parent-id",
      notionTasksDatabaseId: "tasks-db",
      obsidianVaultPath: "/tmp/vault",
      localAppKey: "local-key"
    });
  });

  it("defaults blank or invalid port values to 8787", () => {
    expect(loadConfig({ LOCAL_SYNC_PORT: "" }).port).toBe(8787);
    expect(loadConfig({ LOCAL_SYNC_PORT: "   " }).port).toBe(8787);
    expect(loadConfig({ LOCAL_SYNC_PORT: "not-a-port" }).port).toBe(8787);
    expect(loadConfig({ LOCAL_SYNC_PORT: "0" }).port).toBe(8787);
    expect(loadConfig({ LOCAL_SYNC_PORT: "1.5" }).port).toBe(8787);
    expect(loadConfig({ LOCAL_SYNC_PORT: "65536" }).port).toBe(8787);
  });
});
