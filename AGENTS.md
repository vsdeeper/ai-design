# ai-recognition-virtual-fitting-bench

> AI 对话语言默认使用中文简体。

## 项目概述

AI 识别虚拟试衣台的前端项目骨架，当前仅含 Next.js 官方模板与工程化配置（Prettier、husky、lint-staged、commitlint），尚未实现业务功能。

- **应用名称**: ai-recognition-virtual-fitting-bench
- **包管理器**: pnpm
- **Node 版本**: >= 20

仓库内另保留设计相关技能（`.agents/skills/`），可按需用于 Web 设计参考图与还原；与前端业务代码解耦。用法见 [SKILLS.md](./SKILLS.md)。

## 技术栈

### 框架与运行时

| 依赖包     | 版本    | 使用场景            |
| ---------- | ------- | ------------------- |
| next       | 16.2.10 | App Router 全栈框架 |
| react      | 19.2.4  | UI 库               |
| react-dom  | 19.2.4  | React DOM 渲染      |
| typescript | ^5      | 类型检查与 IDE 支持 |

### 样式

| 依赖包               | 版本 | 使用场景     |
| -------------------- | ---- | ------------ |
| tailwindcss          | ^4   | 原子化 CSS   |
| @tailwindcss/postcss | ^4   | PostCSS 集成 |

### 代码质量与 Git 钩子

| 依赖包                          | 版本    | 使用场景                               |
| ------------------------------- | ------- | -------------------------------------- |
| eslint                          | ^9      | 代码检查                               |
| eslint-config-next              | 16.2.10 | Next.js ESLint 规则                    |
| eslint-config-prettier          | ^10.1.8 | 关闭与 Prettier 冲突的 ESLint 格式规则 |
| prettier                        | ^3.9.5  | 代码格式化                             |
| husky                           | ^9.1.7  | Git 钩子管理                           |
| lint-staged                     | ^17.1.0 | 仅对暂存文件执行 lint/format           |
| @commitlint/cli                 | ^21.2.1 | 校验 commit message                    |
| @commitlint/config-conventional | ^21.2.0 | Conventional Commits 规则集            |

## 开发命令

```bash
pnpm install                 # 安装依赖
pnpm dev                     # 启动开发服务器（默认 http://localhost:3000）
pnpm build                   # 生产构建
pnpm start                   # 启动生产服务
pnpm lint                    # ESLint 检查
pnpm format                  # Prettier 格式化全仓库
pnpm format:check            # Prettier 检查（不写入）
pnpm prettier --write <路径> # 格式化指定文件或目录
```

Prettier 格式化示例：

```bash
# 格式化单个文件
pnpm prettier --write src/app/page.tsx

# 格式化某目录下常见源码
pnpm prettier --write "src/**/*.{js,jsx,ts,tsx,css,json,md}"
```

## 提交规范

使用 [Conventional Commits](https://www.conventionalcommits.org/)，由 commitlint 在 `commit-msg` 钩子强制校验。

格式：`<type>: <description>`

常用 type：`feat`、`fix`、`chore`、`docs`、`refactor`、`test`、`style`、`ci`、`build`、`perf`。

示例：

```text
feat: init next.js scaffold
chore: add prettier and husky
fix: resolve port conflict on windows
```

`pre-commit` 会对暂存文件执行 `eslint --fix` 与 `prettier --write`。

## 项目结构

```
ai-recognition-virtual-fitting-bench/
├── src/
│   └── app/                 # App Router 页面与布局
│       ├── layout.tsx       # 根布局
│       ├── page.tsx         # 首页
│       └── globals.css      # 全局样式
├── public/                  # 静态资源
├── .husky/                  # Git 钩子（pre-commit / commit-msg）
├── .agents/skills/          # 设计出图技能（可选）
├── AGENTS.md                # AI / 代理协作说明（本文件）
├── CLAUDE.md                # 指向 AGENTS.md
├── commitlint.config.mjs    # commitlint 配置
├── eslint.config.mjs        # ESLint 配置
├── next.config.ts           # Next.js 配置
├── package.json
└── tsconfig.json
```

## 架构要点

- 使用 Next.js App Router，源码位于 `src/app`
- 路径别名 `@/*` 映射到 `src/*`
- 当前无业务模块、无 API、无鉴权、无上传与 AI 能力；后续功能应在此骨架上增量添加
- 本地开发优先使用 `pnpm`

## 编码约定

- **对话语言**：与用户及协作文档默认使用**中文简体**
- **代码格式化**：完成代码修改后，须对改动文件执行 Prettier 格式化（`pnpm prettier --write <路径>`），配置见 `.prettierrc`
- **ESLint**：格式类规则由 Prettier 负责；逻辑与最佳实践由 ESLint（含 `eslint-config-next`）负责
- **路径别名**：使用 `@/` 引用 `src` 下模块
- **Git Bash 注意**：在 Git Bash 中调用 Windows `taskkill` 时，参数需写成 `//PID` / `//F`，避免 `/PID` 被当成路径

<!-- BEGIN:nextjs-agent-rules -->

# 这不是你所熟悉的那个 Next.js

此版本包含破坏性变更——API、约定与文件结构都可能与你的训练数据不同。编写任何代码之前，请先阅读 `node_modules/next/dist/docs/` 中的相关指南。请留意弃用提示。

<!-- END:nextjs-agent-rules -->

## 环境变量

当前无项目级 `.env` 文件与业务环境变量。后续新增时在本表补充。

| 变量名 | 说明 | 当前值 |
| ------ | ---- | ------ |
| —      | —    | —      |
