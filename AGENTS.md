# ai-design

> AI 对话语言默认使用中文简体。

## 项目概述

本仓库是面向 AI 代理的**设计出图工作区**，用于生成高端品牌规范板、网站设计参考图与移动端 App 界面概念图。当前不包含可运行的前端应用代码，核心资产是已安装的 Agent Skills 及其锁定配置。

- **应用名称**: ai-design
- **类型**: AI 设计技能工作区（无 package.json / 无 Node 应用）
- **技能来源**: [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill)

## 已安装技能

| 技能 | 用途 |
| ---- | ---- |
| `brandkit` | 高端品牌规范板、Logo 体系、身份应用展示图 |
| `imagegen-frontend-web` | 网站落地页各 section 设计参考图（每 section 一张横图） |
| `imagegen-frontend-mobile` | 移动端 App 屏幕/流程概念图（默认手机框呈现） |

技能文件位于 `.agents/skills/`，`.claude/skills/` 为指向同目录的符号链接。版本锁定见根目录 `skills-lock.json`。

## 开发命令

本仓库当前无可执行的 install / serve / build 脚本。

常用操作：

```bash
# 查看已锁定技能
cat skills-lock.json

# 安装/更新 taste-skill 中的技能（示例）
npx skills add https://github.com/Leonxlnx/taste-skill --skill brandkit
npx skills add https://github.com/Leonxlnx/taste-skill --skill imagegen-frontend-web
npx skills add https://github.com/Leonxlnx/taste-skill --skill imagegen-frontend-mobile
```

## 提交规范

[需求号/缺陷号]新增/修改/修复xxx功能/需求

## 项目结构

```
ai-design/
├── AGENTS.md                 # AI 代理项目说明（本文件）
├── CLAUDE.md                 # Claude 入口，指向 AGENTS.md
├── README.md                 # 使用说明
├── skills-lock.json          # 已安装技能来源与哈希锁定
├── .agents/
│   └── skills/               # 技能正文（SKILL.md）
│       ├── brandkit/
│       ├── imagegen-frontend-web/
│       └── imagegen-frontend-mobile/
└── .claude/
    └── skills/               # 指向 .agents/skills 的符号链接
```

## 架构要点

- **出图优先**：本仓库技能以生成设计参考图为主，不直接写业务前端代码。
- **技能分工**：
  - `brandkit` → 品牌识别与规范板
  - `imagegen-frontend-web` → Web 营销/落地页 section 级参考图（一节一图）
  - `imagegen-frontend-mobile` → App 原生屏幕与流程概念图（只出图，不写代码）
- **后续实现**：可将生成的参考图交给编码类 Agent / 其他实现技能还原为页面或 App UI。

## 编码约定

- **对话语言**：默认使用中文简体回复与说明。
- **遵循技能正文**：执行出图任务时，必须先读取对应 `SKILL.md` 并按其规则生成。
- **Web 出图硬规则**：`imagegen-frontend-web` 要求每个 section 单独出一张横图，禁止把整页压缩进一张长图。
- **Mobile 出图边界**：`imagegen-frontend-mobile` 仅生成图像，不输出实现代码。
- **避免通用 AI 审美**：出图与文案应遵循各技能中的 anti-slop / 反模板约束，避免千篇一律的默认构图与字体。

## 环境变量

当前项目无应用级 `.env` 配置。
