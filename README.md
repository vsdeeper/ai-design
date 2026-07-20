# ai-recognition-virtual-fitting-bench

AI 识别虚拟试衣台前端骨架：基于 Next.js App Router，当前仅含官方模板与工程化配置，尚未实现业务功能。

## Getting Started

```bash
pnpm install
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看页面。编辑 `src/app/page.tsx` 即可热更新。

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
- Web 出图提示词模板：[PROMPTS.md](./PROMPTS.md)
- AI / 工程约定：[AGENTS.md](./AGENTS.md)
