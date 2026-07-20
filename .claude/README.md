# .claude

`skills` 为本机目录联接，指向 `../.agents/skills`。

- 技能正文只维护在 `.agents/skills/`
- 不要在 `.claude/skills` 下再放一份真实文件
- 若联接丢失，可在仓库根目录用 PowerShell 重建：

```powershell
New-Item -ItemType Junction -Path ".claude\skills" -Target "$PWD\.agents\skills"
```
