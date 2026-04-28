# Reusable Codex Prompts

## Start A Self-Paced Learning Session

```text
使用 $cyrus-learning-loop。
主题：<topic>
目标：我想理解它，并把知识沉淀进 Obsidian 或 repo。
要求：先诊断，再解释，再给一个小推导/小实验/小改动，最后更新 concept card、knowledge-ledger 或 open-questions。
```

## Turn A Formula Into A Note

```text
把这个公式整理成 Obsidian 笔记：
1. 定义符号
2. 写前提假设
3. 用 LaTeX 推导
4. 解释工程含义
5. 连接到 CARLA/Autoware/KPI
```

## Check Visuals Before Push

```text
检查当前 GitHub Pages app 和 Obsidian Canvas 是否正常：
- npm test
- npm run build
- Canvas JSON 校验
- 桌面和移动宽度下是否有明显溢出
最后给出命令结果和需要修复的问题。
```

## Learn From A Failing Test

```text
使用 $cyrus-learning-loop。
我现在有一个 failing test。请先解释失败现象，再带我理解根因。
要求：
1. 不要直接大改；
2. 先问我 2 个定位问题；
3. 修复后更新 error log 或 concept card；
4. 运行最小相关测试。
```

## Turn A Conversation Into Notes

```text
使用 $cyrus-knowledge-capture。
请把下面这段学习内容整理成 concept card，并更新 knowledge-ledger、open-questions、review-schedule。
内容：
<paste conversation summary>
```

## Review And Exam

```text
使用 $cyrus-review-and-exam。
请读取 docs/learning/knowledge-ledger.md 和 docs/learning/review-schedule.md。
给我一个 20 分钟复习测验，优先考最近低于 4 分的概念。
先出题，不要直接给答案。
```

## Connect Learning To Work Validation

```text
使用 $cyrus-learning-loop。
主题：<autonomous driving validation topic>
请把这个主题连接到 work-validation track：
- failcase closure
- KPI gate
- evidence chain
- weekly digest
最后创建一个 concept card 和一个可执行的小任务。
```

## Ask Codex To Interview Me

```text
使用 $cyrus-learning-loop。
我只有一个模糊目标：<goal>
请先采访我，最多 5 个问题。
然后把目标转化为一个本轮可完成的学习任务和一个仓库 artifact。
```
