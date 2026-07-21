# 出图 / 还原 / 设计系统提示词模板

对应技能目录：`.agents/skills/`（说明见 [SKILLS.md](./SKILLS.md)）。

使用前请先点名要遵循的 skill，例如：`请按 imagegen-frontend-web 技能生成`。  
方括号 `[...]` 为必填占位；尖括号 `<...>` 为可选项。

## 本仓库默认项目背景（可直接粘贴进 brief）

本项目是 **AI 识别虚拟试衣台**（`ai-recognition-virtual-fitting-bench`）：用于跑通并对比完整业务流程的**模型评测与选型工作台**，而非面向 C 端的正式消费产品。

完整业务流程：

1. 用户上传图片
2. 选择识别模型 → AI 识别衣物单品
3. 上传 / 选择预设模特
4. 选择试穿模型 → AI 生成「模特 + 衣物单品」试穿效果图

评测目标：在识别与试穿两处换模型并排对照，比较生成效果，辅助选型。详见 [README.md](./README.md)。

设计语气宜偏 **评测工作台 / 实验台**：冷静、可信、便于对照；避免泛泛「智慧零售营销站」话术。产品全称可写 `FitBench` 或仓库名。

| Skill                   | 用途                      | 主要产出                              |
| ----------------------- | ------------------------- | ------------------------------------- |
| `imagegen-frontend-web` | 网站 section 设计参考图   | **每个 section 一张横图**             |
| `image-to-code`         | 先出图再还原为前端代码    | 设计图 + 可运行页面（本仓库 Next.js） |
| `stitch-design-taste`   | 为 Google Stitch 写规范   | `DESIGN.md`                           |

---

## 1. imagegen-frontend-web（网站 section 参考图）

**硬规则**：每个 section 单独出一张横图；禁止把整页压成一张长图。  
未指定 section 数量时：落地页默认 6 张，完整站点模板默认 8 张。  
Hero 避免默认「左文右图」。只要一节时，须写明「只要 1 个 section / 只出 1 张图」。

### 完整模板

```text
请按 imagegen-frontend-web 技能生成网站设计参考图。
一节一图，全部横图，不要合并成一张长图。

产品/品牌：FitBench（ai-recognition-virtual-fitting-bench）
页面类型：<评测工作台介绍页 / 工作台 UI 概念页 / 落地页>
行业：AI 衣物识别 + 虚拟试穿（模型评测）
受众：[算法/产品/业务选型决策者]
风格关键词：<[minimalist / editorial / cinematic / SaaS / lab-tool] 选 1–2 个>
主题范式：<[浅色精致 / 深色高级 / 大胆色块 / 安静中性] 选 1 个>
语气：冷静、可信、对照实验感（非 C 端营销话术）
项目背景 / 业务流程：上传图片 → 选识别模型 → 识别衣物单品 → 上传/选预设模特 → 选试穿模型 → 生成模特+单品试穿图；对比模型效果以辅助选型

Section 数量与清单：
1. Hero — [一句话职责]
2. [Section 名] — [职责]
3. [Section 名] — [职责]
4. [Section 名] — [职责]
5. [Section 名] — [职责]
6. CTA / Footer — [职责]
（可增删；未列清单时默认 6 个 section）

Hero 构图偏好：<居中压图 / 底部左文 / 全出血背景 / 极简 mini；避免默认左文右图>
配色方向：[主色板一句话]
禁忌：<不要三等分 feature 卡片堆砌 / 不要通用紫渐变 / 不要「智慧零售」空文案 / ...>
输出：按 Section 1/N、2/N… 依次出图并标注名称
```

### 精简模板

```text
请按 imagegen-frontend-web 生成 FitBench 评测工作台参考图，共 [N] 个 section，一节一图。
业务流程：上传图片 → 选识别模型 → 识别单品 → 上传/选模特 → 选试穿模型 → 生成试穿图；对比模型做选型。
受众：[受众]，风格：[关键词]，浅色/深色：[选一]。Hero 不要默认左文右图。依次输出并标注 section 名。
```

### 单节模板

```text
请按 imagegen-frontend-web 技能生成，只要 1 个 section，只出 1 张横图。

产品：FitBench（上传图 → 识别单品 → 选模特 → 试穿生成的模型评测台）
业务流程：上传图片 → 选识别模型 → AI 识别衣物单品 → 上传/选预设模特 → 选试穿模型 → AI 生成模特+单品试穿效果图
Section：[名] — [职责]
风格：[关键词]，主题：[浅色/深色]
构图偏好：<…；不要默认左文右图>
输出：标注 Section 1/1
```

### 单节示例（Compare）

```text
请按 imagegen-frontend-web 技能生成，只要 1 个 section，只出 1 张横图。
不要整页长图，不要多节，不要合并成一张。

产品/品牌：FitBench（ai-recognition-virtual-fitting-bench）
页面类型：评测工作台介绍页 — 仅 Compare 节
行业：AI 衣物识别 + 虚拟试穿（模型评测）
受众：算法与产品选型决策者
风格关键词：SaaS + lab-tool
主题范式：浅色精致
语气：冷静、可信、对照实验感（非 C 端营销话术）
业务流程：上传图片 → 选择识别模型 → AI 识别衣物单品 → 上传/选择预设模特 → 选择试穿模型 → AI 生成「模特 + 衣物单品」试穿效果图；本台用于在识别与试穿环节对比不同模型效果以辅助选型

Section（仅此 1 节）：
1. Compare — 多模型并排对照试穿结果：同一模特与同一衣物单品输入下，展示 2–3 个试穿模型的输出并排对比，突出差异与选型依据；可含简短模型标签与次要 CTA（查看详情 / 标记偏好）

构图偏好：居中或偏下标题区 + 横向并排试穿结果为主视觉；避免默认左文右图；不要做成整页 Hero
配色：暖中性底、石墨字色、单一深墨强调
禁忌：不要三等分圆角 feature 卡片堆砌；不要紫色科技渐变；不要「智慧零售 / 一键变美」营销腔；不要假 KPI 条；对照图要可读、可实现，勿糊成装饰拼贴

输出：标注 Section 1/1: Compare；仅生成这一张横图
```

### 多节示例

```text
请按 imagegen-frontend-web 技能生成网站设计参考图。
一节一图，全部横图，不要合并成一张长图。

产品/品牌：FitBench（ai-recognition-virtual-fitting-bench）
页面类型：评测工作台介绍页
行业：AI 衣物识别 + 虚拟试穿（模型评测）
受众：算法与产品选型决策者
风格关键词：SaaS + lab-tool
主题范式：浅色精致
语气：冷静、可信、对照实验感
业务流程：上传图片 → 选识别模型 → 识别衣物单品 → 上传/选预设模特 → 选试穿模型 → 生成模特+单品试穿图；并排对比模型效果以辅助选型

Section 数量与清单：
1. Hero — 工作台定位：完整试衣评测流与选型
2. Pipeline — 六步流程：上传 → 识别 → 选模特 → 试穿生成
3. Compare — 多模型并排对照试穿结果
4. Product — 工作台主界面概念（任务、模型、结果区）
5. Criteria — 评测维度（准确、观感、稳定性等）
6. CTA — 开始一次对照实验

Hero 构图偏好：全出血氛围背景 + 底部左文，避免左文右图默认稿
配色：暖中性底、石墨字色、单一深墨强调
禁忌：不要三等分圆角 feature 卡片；不要紫色科技渐变；不要 C 端「一键变美」营销腔
输出：按 Section 1/6 … 6/6 依次出图并标注名称
```

---

## 2. image-to-code（先出图再写前端）

**硬规则**（顺序不可跳）：

1. 出图（一节一图，足够大、可读、可提取）
2. 深度分析（色板、字体、间距、组件、文案）
3. 再写代码（忠实还原；禁止先自由发挥编码）

适配本仓库：Next.js App Router + Tailwind（`src/app`）。改代码后须 Prettier（见 [AGENTS.md](./AGENTS.md)）。

### 完整模板（从零实现）

```text
请按 image-to-code 技能实现本仓库的首页 / 工作台相关页面。

产品/品牌：FitBench（ai-recognition-virtual-fitting-bench）
页面类型：<评测工作台介绍页 / 工作台 UI / …>
目标：约 [N] 个 section，视觉质量优先；体现完整流程与选型
行业：AI 衣物识别 + 虚拟试穿（模型评测）
受众：[算法/产品/业务选型决策者]
风格关键词：[如 editorial / lab-tool / SaaS]
气质：冷静、可信、对照实验感（非 C 端营销）
主题：<[浅色精致 / 深色高级 / …] 选 1 个>
业务流程：上传图片 → 选识别模型 → 识别衣物单品 → 上传/选预设模特 → 选试穿模型 → 生成模特+单品试穿图；对比模型效果辅助选型

Section 清单（可选，未列则由你规划约 N 个）：
1. Hero — [职责]
2. [名] — [职责]
…

技术栈：Next.js App Router + Tailwind（沿用本仓库）
写入路径：src/app（layout / page / globals.css 等按需）

要求：
- 强制顺序：先出 section 参考图 → 深度分析 → 再写代码
- 一节一图，横图，不要整页压成一张小长图
- Hero 干净可读，首屏信息不过载；不要卡片套卡片
- 禁忌：通用紫渐变、三等分 feature 卡片、默认左文右图堆砌、空泛零售营销文案
- 改完代码后执行 Prettier
```

### 精简模板

```text
请按 image-to-code 实现本仓库 FitBench 首页。
业务流程：上传图片 → 选识别模型 → 识别单品 → 上传/选模特 → 选试穿模型 → 生成试穿图；模型对照选型。约 [N] 个 section，风格：[关键词]。
技术栈沿用 Next.js + Tailwind。先出图并分析，再写入 src/app；Hero 干净，禁止紫渐变与三等分卡片。
```

### 已有参考图时（只还原代码）

```text
请按 image-to-code 技能，以已有设计图为视觉真源还原为前端代码。

产品：FitBench（上传图 → 识别单品 → 选模特 → 试穿生成的模型评测台）
参考图：<[路径或本对话中的图] / 此前 imagegen-frontend-web 产出>
技术栈：Next.js App Router + Tailwind（沿用本仓库）
写入：src/app

要求：深度分析参考图后再实现；忠实还原色板、字体、间距与布局；不要重新自由发挥设计。
改完后执行 Prettier。
```

### 示例

```text
请按 image-to-code 技能实现本仓库的评测工作台介绍页首页。

产品/品牌：FitBench（ai-recognition-virtual-fitting-bench）
页面类型：评测工作台介绍页
目标：约 6 个 section，视觉质量优先
行业：AI 衣物识别 + 虚拟试穿（模型评测）
受众：算法与产品选型决策者
风格关键词：lab-tool + editorial
气质：冷静、可信、对照实验感
主题：浅色精致
业务流程：上传图片 → 选识别模型 → 识别衣物单品 → 上传/选预设模特 → 选试穿模型 → 生成模特+单品试穿图；并排对比模型效果以辅助选型

Section 清单：
1. Hero — 工作台定位：完整试衣评测流与选型
2. Pipeline — 六步流程
3. Compare — 多模型并排对照试穿结果
4. Product — 工作台主界面概念
5. Criteria — 评测维度
6. CTA — 开始一次对照实验

技术栈：Next.js App Router + Tailwind（沿用本仓库）
要求：先出图并分析，再写入 src/app；一节一图；Hero 干净；不要紫渐变、三等分卡片与 C 端营销腔。
```

---

## 3. stitch-design-taste（生成 Stitch 用 DESIGN.md）

**用途**：产出一份 agent 友好的 `DESIGN.md`，作为 [Google Stitch](https://labs.google/stitch) 出屏的视觉单一真源。  
默认基线（可按 brief 调整）：Variance 8、Motion 6、Density 4。

### 完整模板

```text
请按 stitch-design-taste 技能生成本项目的 DESIGN.md。

产品/品牌：FitBench（ai-recognition-virtual-fitting-bench）
品类：AI 识别衣物 → 虚拟试穿的模型评测工作台
气质：[如冷静 / 实验台 / 可信]
密度：<[偏留白 / 均衡 / 紧凑] 或 1–10>
不对称 / Variance：<[低 / 中 / 高] 或 1–10>
动效：<[克制 / 流体 CSS / 电影感编排] 或 1–10>
主色方向：[一句话；最多 1 个强调色]
字体偏好：<[如 Geist / Outfit / Satoshi；禁止 Inter]>
适用界面：<[工作台 UI / 对照结果页 / 介绍页]；偏工具感，非 C 端电商>
业务流程：上传图片 → 选识别模型 → 识别单品 → 上传/选模特 → 选试穿模型 → 生成试穿图；对比模型辅助选型

禁忌：
- 不要 AI 紫霓虹 / 外发光
- 不要 Inter、不要通用衬线（Times/Georgia 等）
- 不要纯黑 #000000
- 不要三等分等宽 feature 卡片堆砌
- 不要「Elevate / Seamless / Unleash」或「一键变美」类空文案
- <其他项目禁忌>

输出：完整 DESIGN.md（含氛围、配色 hex、字体层级、组件、布局、动效、anti-patterns），可直接给 Stitch 使用。
```

### 精简模板

```text
请按 stitch-design-taste 生成本项目 DESIGN.md。
产品：FitBench，品类：上传图→识别单品→选模特→试穿生成的模型评测台，气质：[3 词]。
密度偏留白，不对称中等偏高，动效克制流体。
主色：[一句话]。禁忌：紫霓虹、Inter、三等分卡片、C 端营销腔。输出完整可粘贴进 Stitch 的 DESIGN.md。
```

### 示例

```text
请按 stitch-design-taste 技能生成本项目的 DESIGN.md。

产品/品牌：FitBench（ai-recognition-virtual-fitting-bench）
品类：AI 识别衣物 → 虚拟试穿的模型评测工作台
气质：冷静、实验台、可信
密度：偏留白（约 4）
不对称：中等偏高（约 8）
动效：克制流体（约 6）
主色方向：暖中性底 + 单一深墨强调，无霓虹
字体偏好：Geist + 克制展示字重；禁止 Inter
适用界面：评测工作台 UI + 轻量对照结果页（非密集仪表盘、非 C 端商城）
业务流程：上传图片 → 选识别模型 → 识别衣物单品 → 上传/选预设模特 → 选试穿模型 → 生成模特+单品试穿图；并排对比模型支持选型

禁忌：不要 AI 紫霓虹、不要 Inter、不要三等分卡片、不要纯黑、不要空泛科技/零售营销文案
输出：完整 DESIGN.md，可直接给 Stitch 使用。
```

---

## 推荐组合（可选）

```text
仅要参考图
  → 用「1. imagegen-frontend-web」

要落到本仓库代码
  → 用「2. image-to-code」
  （或先跑 1 出图，再用「已有参考图」模板交给 2）

要给 Google Stitch 批量出屏
  → 用「3. stitch-design-taste」得到 DESIGN.md → 导入 Stitch
```
