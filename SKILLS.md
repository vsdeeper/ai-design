# Skill 使用说明

本仓库已安装设计相关 Agent Skills：`imagegen-frontend-web`、`image-to-code`、`stitch-design-taste`。

技能正文**只**位于 `.agents/skills/<name>/`（真实目录）。  
`.claude/skills` 是指向 `.agents/skills` 的**目录联接**（Windows Junction；无管理员权限时无法创建 SymbolicLink），不是第二份拷贝。

展开 `.claude/skills` 后看到的 `image-to-code/` 等文件夹，就是 `.agents/skills` 里的同一批目录，属正常现象。版本锁定见 `skills-lock.json`。

**使用前**：在对话里明确点名要遵循的 skill，例如「请按 `imagegen-frontend-web` 技能生成」。Agent 会先读取对应 `SKILL.md` 再执行。

项目背景（提示词默认）：本仓库是 **「AI 识别衣物 → AI 试穿」** 的模型评测与选型工作台，非 C 端正式产品。详见 [README.md](./README.md)。

可复制提示词模板见 [PROMPTS.md](./PROMPTS.md)；工程与编码约定见 [AGENTS.md](./AGENTS.md)。

---

## 已安装 Skill

| Skill                   | 用途                          | 产出                      |
| ----------------------- | ----------------------------- | ------------------------- |
| `imagegen-frontend-web` | 网站/落地页设计参考图         | **每个 section 一张横图** |
| `image-to-code`         | 先出图再还原为前端代码        | 设计图 + 可运行的页面实现 |
| `stitch-design-taste`   | 为 Google Stitch 生成设计系统 | `DESIGN.md`               |

---

## 推荐工作流

按目标选一条链路，不必三个都跑：

```text
仅要参考图
  → imagegen-frontend-web

要可落地的前端页面（本仓库 Next.js）
  → image-to-code
  （内部会先出图、再分析、再写代码；也可先用 imagegen-frontend-web 出图再交给它还原）

要给 Google Stitch 用的设计规范
  → stitch-design-taste → 得到 DESIGN.md → 粘贴/导入 Stitch 继续出屏
```

---

## 1. imagegen-frontend-web

### 何时用

需要评测工作台介绍页、工作台 UI 概念、产品页等 **section 级视觉参考图**，供设计评审或后续写代码对照。

### 硬规则

- **一节一图**：每个 section 单独一张横图；禁止整页压成一张长图
- 未指定数量：落地页默认 **6** 张，完整站点模板默认 **8** 张
- Hero 避免默认「左文右图」；优先考虑居中压图、底部左文、全出血背景等

### 怎么说

```text
请按 imagegen-frontend-web 技能生成网站设计参考图。
一节一图，全部横图，不要合并成一张长图。

产品/品牌：FitBench（ai-recognition-virtual-fitting-bench）
页面类型：评测工作台介绍页
行业：AI 衣物识别 + 虚拟试穿（模型评测）
受众：算法与产品选型决策者
风格：lab-tool / SaaS
主题：浅色精致 / 深色高级 / …
项目背景：跑通「识别衣物 → AI 试穿」，对比模型效果以辅助选型

Section 清单：
1. Hero — 识别 → 试穿 → 选型
2. … — …
…
输出：按 Section 1/N … 依次出图并标注名称
```

精简版、单节模板与完整示例见 [PROMPTS.md](./PROMPTS.md)。

### 注意

- Agent 应读取 `.agents/skills/imagegen-frontend-web/SKILL.md` 后再出图
- 多 section 时会在同一次回复中依次生成多张图

---

## 2. image-to-code

### 何时用

需要 **视觉质量优先的网站实现**：先生成设计图，再按图写成前端（适配本仓库的 Next.js / React）。

### 硬规则

强制顺序：

1. **出图**（一节一图，足够大、可读、可提取）
2. **深度分析**（色板、字体、间距、组件、文案）
3. **再写代码**（忠实还原，禁止先自由发挥编码）

禁止：跳过出图直接写代码；把多 section 压成一张小长图；卡片套卡片、首屏信息过载等常见 AI 模板感。

### 怎么说

```text
请按 image-to-code 技能实现本仓库的评测工作台介绍页首页。

产品：FitBench（ai-recognition-virtual-fitting-bench）
目标：体现「识别 → 试穿 → 选型」，约 [N] 个 section
风格：[关键词]，气质：冷静、对照实验感（非 C 端营销）
技术栈：Next.js App Router + Tailwind（沿用本仓库）

要求：先出 section 参考图并分析，再写入 src/app；
Hero 干净可读；不要通用紫渐变与三等分 feature 卡片。
```

若已有 `imagegen-frontend-web` 产出的图，可说明「以这些图为视觉真源，请按 image-to-code 还原为代码」。

### 注意

- 技能正文：`.agents/skills/image-to-code/SKILL.md`
- 改代码后须执行 Prettier（`pnpm prettier --write <路径>`），见 [AGENTS.md](./AGENTS.md)

---

## 3. stitch-design-taste

### 何时用

要在 [Google Stitch](https://labs.google/stitch) 里批量出屏，需要一份 **agent 友好的 `DESIGN.md`** 作为统一视觉规范。

### 产出内容

`DESIGN.md` 通常包含：视觉氛围、配色与角色、字体层级、组件行为、布局原则、动效、以及明确的 anti-patterns（禁止项）。

### 怎么说

```text
请按 stitch-design-taste 技能生成本项目的 DESIGN.md。

产品：FitBench（ai-recognition-virtual-fitting-bench）
品类：AI 识别衣物 → 虚拟试穿的模型评测工作台
气质：冷静、实验台、可信
密度：偏留白 / 均衡 / 紧凑
不对称：中等偏高
动效：克制流体
主色方向：[一句话]
禁忌：不要 AI 紫霓虹、不要 Inter、不要三等分卡片堆砌、不要 C 端营销腔

输出：完整 DESIGN.md，可直接给 Stitch 使用。
```

### 注意

- 技能正文：`.agents/skills/stitch-design-taste/SKILL.md`
- 生成后把 `DESIGN.md` 提供给 Stitch（或 Stitch MCP）再继续生成屏幕

---

## 安装 / 更新 Skill

来源：[Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill)

```bash
# 查看已锁定技能
cat skills-lock.json

# 安装或更新（示例）
npx skills add https://github.com/Leonxlnx/taste-skill --skill imagegen-frontend-web
npx skills add https://github.com/Leonxlnx/taste-skill --skill image-to-code
npx skills add https://github.com/Leonxlnx/taste-skill --skill stitch-design-taste
```

安装后正文在 `.agents/skills/<name>/SKILL.md`；执行任务前必须先读该文件。

---

## 常见问题

**Q: 只说「帮我做个官网」会用哪个 skill？**  
A: 建议明确点名。要参考图用 `imagegen-frontend-web`；要直接落到本仓库代码用 `image-to-code`。

**Q: 为什么出图只有一张？**  
A: 违反了 `imagegen-frontend-web` / `image-to-code` 的一节一图规则。请在提示里写清 section 数量，并要求「一节一图、依次输出」。

**Q: PROMPTS.md 和本文档什么关系？**  
A: 本文档说明 **何时用、怎么用**；[PROMPTS.md](./PROMPTS.md) 提供三个技能可复制的 **提示词模板**（出图 / 还原代码 / Stitch DESIGN.md）。
