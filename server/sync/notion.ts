import { Client } from "@notionhq/client";
import type { LearningTask } from "../../src/domain/types";

export interface NotionSyncConfig {
  notionToken: string | null;
  notionTasksDatabaseId: string | null;
}

export type NotionSyncResult =
  | { status: "success"; pageId: string; message: string }
  | { status: "skipped"; message: string }
  | { status: "failed"; message: string };

export interface NotionSchemaValidationResult {
  ok: boolean;
  message: string;
  missingProperties: string[];
}

const missingConfigMessage = "Notion token or tasks database id is not configured";
const requiredProperties = [
  ["Name", "title"],
  ["Track", "select"],
  ["Status", "select"],
  ["Priority", "select"],
  ["Due", "date"],
  ["Progress", "number"],
  ["Source", "rich_text"],
  ["Obsidian Path", "rich_text"],
  ["Updated At", "date"]
] as const;

const requiredPropertyLabels = requiredProperties.map(
  ([property, expectedType]) => `${property}:${expectedType}`
);

export async function syncTaskToNotion(
  task: LearningTask,
  config: NotionSyncConfig
): Promise<NotionSyncResult> {
  if (!config.notionToken || !config.notionTasksDatabaseId) {
    return { status: "skipped", message: missingConfigMessage };
  }

  try {
    const notion = new Client({ auth: config.notionToken });
    const properties = toNotionProperties(task);
    const response = task.notionPageId
      ? await notion.pages.update({
          page_id: task.notionPageId,
          properties
        })
      : await notion.pages.create({
          parent: { database_id: config.notionTasksDatabaseId },
          properties
        });

    return {
      status: "success",
      pageId: response.id,
      message: task.notionPageId ? "Updated Notion task page" : "Created Notion task page"
    };
  } catch (error) {
    return {
      status: "failed",
      message: error instanceof Error ? error.message : "Failed to sync task to Notion"
    };
  }
}

export async function validateNotionDatabaseSchema(
  config: NotionSyncConfig
): Promise<NotionSchemaValidationResult> {
  if (!config.notionToken || !config.notionTasksDatabaseId) {
    return {
      ok: false,
      message: missingConfigMessage,
      missingProperties: [...requiredPropertyLabels]
    };
  }

  try {
    const notion = new Client({ auth: config.notionToken });
    const database = await notion.databases.retrieve({
      database_id: config.notionTasksDatabaseId
    });
    const properties = "properties" in database ? database.properties : {};
    const missingProperties = requiredProperties
      .filter(([property, expectedType]) => properties[property]?.type !== expectedType)
      .map(([property, expectedType]) => `${property}:${expectedType}`);

    return {
      ok: missingProperties.length === 0,
      message:
        missingProperties.length === 0
          ? "Notion database schema is valid"
          : `Missing Notion database properties: ${missingProperties.join(", ")}`,
      missingProperties
    };
  } catch (error) {
    return {
      ok: false,
      message:
        error instanceof Error ? error.message : "Failed to validate Notion database schema",
      missingProperties: [...requiredPropertyLabels]
    };
  }
}

function toNotionProperties(task: LearningTask) {
  return {
    Name: { title: [{ text: { content: task.title } }] },
    Track: { select: { name: task.track } },
    Status: { select: { name: task.status } },
    Priority: { select: { name: task.priority } },
    Due: task.dueDate ? { date: { start: task.dueDate } } : { date: null },
    Progress: { number: task.progress },
    Source: { rich_text: [{ text: { content: task.source } }] },
    "Obsidian Path": {
      rich_text: [{ text: { content: task.obsidianPath ?? "" } }]
    },
    "Updated At": { date: { start: task.updatedAt } }
  };
}
