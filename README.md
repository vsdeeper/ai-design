# ai-recognition-virtual-fitting-bench

AI 识别虚拟试衣台——用于跑通并对比 **「AI 识别衣物 → AI 试穿」** 业务流程的测试台。

## 项目背景

本项目初衷不是直接面向终端用户的正式产品，而是一套**模型效果评测与选型工作台**：

1. **识别**：对不同衣物识别模型的结果进行对比
2. **试穿**：将识别结果接入不同虚拟试穿模型，对比生成效果
3. **决策**：通过同一业务流程下的并排/对照实验，选出更优、更合适的模型组合

当前仓库为 Next.js App Router 前端骨架，含工程化配置，业务能力尚未实现。

## Getting Started

```bash
pnpm install
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看页面。编辑 `src/app/page.tsx` 即可热更新。

要求：Node.js >= 20，包管理器使用 pnpm。

## 常用命令

```bash
pnpm dev           # 开发服务器
pnpm build         # 生产构建
pnpm start         # 启动生产服务
pnpm lint          # ESLint
pnpm format        # Prettier 格式化
pnpm format:check  # Prettier 检查
```

## 工程化

- **Prettier** + **ESLint**（`eslint-config-next` + `eslint-config-prettier`）
- **husky** + **lint-staged**：`pre-commit` 对暂存文件 lint/format
- **commitlint**：Conventional Commits（`commit-msg`）

## 技术栈

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · pnpm

## 文档

- Agent Skills 使用说明：[SKILLS.md](./SKILLS.md)
- 出图 / 还原 / 设计系统提示词：[PROMPTS.md](./PROMPTS.md)
- AI / 工程约定：[AGENTS.md](./AGENTS.md)
