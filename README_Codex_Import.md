# Cyrus Learning Manager Codex Import Pack

生成时间：2026-04-28
目标仓库：`77zmf/Cyrus-Learning-Manager`

这是一套可直接复制进仓库根目录的 Codex 规则与技能文件。复制后，从仓库根目录启动 Codex；若 Codex 提示是否信任项目，请选择信任，这样 `.codex/config.toml`、`AGENTS.md` 和 `.agents/skills/**/SKILL.md` 才会作为项目上下文生效。

## 导入方式

```bash
# 在本压缩包解压后的目录中执行
cp -R AGENTS.md .codex .agents docs /path/to/Cyrus-Learning-Manager/
cd /path/to/Cyrus-Learning-Manager
codex --ask-for-approval never "Summarize the active project instructions and available skills."
```

推荐保留 `docs/codex/`，因为 `AGENTS.md` 会引用其中的仓库地图、审查清单和学习建议。

## 文件清单

- `AGENTS.md`：Codex 进入仓库后的默认项目说明、命令、约束和审查要求。
- `.codex/config.toml`：项目级 Codex 默认配置，重点是提高指令大小上限、控制环境变量泄露、打开稳定的推理/检索默认值。
- `.agents/skills/cyrus-repo-onboarding/SKILL.md`：用于理解仓库、画数据流、制定改动计划。
- `.agents/skills/cyrus-learning-roadmap/SKILL.md`：用于把代码改动转化为学习任务、路线和输出物。
- `.agents/skills/cyrus-sync-development/SKILL.md`：用于 Notion/Obsidian/SQLite/本地同步相关改动。
- `.agents/skills/cyrus-testing-review/SKILL.md`：用于测试补全、差异审查和发布前检查。
- `docs/codex/repo-map.md`：仓库结构和数据流说明。
- `docs/codex/learning-recommendations.md`：基于当前仓库的学习建议。
- `docs/codex/codex-task-backlog.md`：可以直接交给 Codex 的任务队列。
- `docs/codex/code-review.md`：Codex review 和人工 review 共用清单。
- `docs/codex/notion-obsidian-sync-checklist.md`：同步功能检查清单。
- `docs/codex/codex-prompts.md`：可复制到 Codex 的任务提示词。
- `docs/codex/templates/root-README.md`：可选的仓库 README 起草模板。

## 建议的首次 Codex 指令

```text
请阅读 AGENTS.md 和 docs/codex/repo-map.md，然后使用 $cyrus-repo-onboarding 输出：1) 仓库架构，2) 当前风险，3) 我下一步最该做的 3 个改进任务。
```
