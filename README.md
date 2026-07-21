# ai-recognition-virtual-fitting-bench

AI 识别虚拟试衣台——用于跑通并对比 **「AI 识别衣物 → AI 试穿」** 业务流程的测试台。

## 项目背景

本项目初衷不是直接面向终端用户的正式产品，而是一套**模型效果评测与选型工作台**：在同一完整业务流程下切换/并排对比不同模型，选出更优、更合适的模型组合。

### 完整业务流程

1. **上传图片** — 用户上传含衣物的图片
2. **选择识别模型** — 选定用于衣物识别的 AI 模型
3. **AI 识别衣物单品** — 从图片中识别出衣物单品
4. **上传 / 选择预设模特** — 上传模特图，或从预设模特中选择
5. **选择试穿模型** — 选定用于虚拟试穿的 AI 模型
6. **AI 生成试穿效果图** — 生成「模特 + 衣物单品」的试穿效果图

评测目标：在识别与试穿两处均可换模型对照，比较生成效果，辅助选型决策。

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
