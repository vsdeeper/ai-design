### 使用说明

AI 设计出图工作区：基于 taste-skill 生成品牌规范板、网站 section 参考图与移动端 App 概念图。当前无可运行的前端应用。

```
查看已安装技能
cat skills-lock.json

安装技能示例
npx skills add https://github.com/Leonxlnx/taste-skill --skill brandkit
npx skills add https://github.com/Leonxlnx/taste-skill --skill imagegen-frontend-web
npx skills add https://github.com/Leonxlnx/taste-skill --skill imagegen-frontend-mobile
```

### 已安装 Skill

| Skill | 说明 |
| ----- | ---- |
| `brandkit` | 高端品牌规范板、Logo 体系、身份应用展示图；适合品牌提案与视觉系统一览 |
| `imagegen-frontend-web` | 网站/落地页设计参考图；**每个 section 单独出一张横图**，禁止整页压成一张长图 |
| `imagegen-frontend-mobile` | 移动端 App 屏幕与流程概念图（默认手机框）；**只出图，不写代码** |

技能正文在 `.agents/skills/`（`.claude/skills/` 为符号链接）。出图前请先阅读对应 `SKILL.md`。

更多约定见 [AGENTS.md](./AGENTS.md)。
