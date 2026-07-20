# 出图提示词模板

使用前请先说明要遵循的 skill，例如：`请按 imagegen-frontend-web 技能生成`。  
方括号 `[...]` 为必填占位；尖括号 `<...>` 为可选项。

---

## 1. imagegen-frontend-web（网站 section 参考图）

**硬规则**：每个 section 单独出一张横图；禁止把整页压成一张长图。  
未指定 section 数量时：落地页默认 6 张，完整站点模板默认 8 张。

### 完整模板

```text
请按 imagegen-frontend-web 技能生成网站设计参考图。
一节一图，全部横图，不要合并成一张长图。

产品/品牌：[名称]
页面类型：<落地页 / 产品页 / 作品集 / 营销站>
行业：[行业]
受众：[受众]
风格关键词：<[minimalist / editorial / cinematic / SaaS / agency / e-commerce] 选 1–2 个>
主题范式：<[浅色精致 / 深色高级 / 大胆色块 / 安静中性] 选 1 个>
语气：[如冷静专业 / 艺术导演感 / 转化导向]

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
禁忌：<不要三等分 feature 卡片堆砌 / 不要通用紫渐变 / ...>
输出：按 Section 1/N、2/N… 依次出图并标注名称
```

### 精简模板

```text
请按 imagegen-frontend-web 生成 [产品名] 落地页参考图，共 [N] 个 section，一节一图。
风格：[关键词]，受众：[受众]，浅色/深色：[选一]。
Hero 不要默认左文右图。依次输出并标注 section 名。
```

### 示例

```text
请按 imagegen-frontend-web 技能生成网站设计参考图。
一节一图，全部横图，不要合并成一张长图。

产品/品牌：Northline
页面类型：落地页
行业：网络安全 SaaS
受众：企业安全负责人
风格关键词：SaaS + cinematic
主题范式：深色高级
语气：冷静、可信、转化导向

Section 数量与清单：
1. Hero — 价值主张与主 CTA
2. Logo/Trust — 客户与合规信任条
3. Problem — 安全噪声与误报痛点
4. Product — 产品界面与核心能力
5. How it works — 三步工作流
6. CTA — 预约演示

Hero 构图偏好：全出血氛围背景 + 底部左文，避免左文右图默认稿
配色：石墨、冷灰、单一电青点缀
禁忌：不要三等分圆角 feature 卡片；不要紫色科技渐变
输出：按 Section 1/6 … 6/6 依次出图并标注名称
```
