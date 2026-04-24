# Claude Code Cookbook

中文教程站，讲怎么用 Claude Code；包含文档页 + 一个浏览器里的纯前端终端模拟器。

## 技术栈

- **Next.js 16**（App Router，默认 Turbopack）
- **Nextra 4** + `nextra-theme-docs`
- **React 19**
- **SCSS Modules**（不用 Tailwind，样式自己可控）
- **Node ≥ 22**（Nextra 的 chevrotain 依赖硬要求）

## 常用命令

```bash
nvm use          # 切到 .nvmrc 指定的 Node 22
yarn install
yarn dev         # http://localhost:3000
yarn build
yarn start
```

包管理器用 **yarn**（仓库里是 `yarn.lock`，不要改用 npm）。

## 目录结构

```
app/
  layout.tsx                # 根 <html>/<body> + Nextra Head + 全局样式
  (home)/page.tsx           # 自定义首页，无 Nextra chrome
  (docs)/
    layout.tsx              # Nextra Layout（navbar/sidebar/footer）
    [...mdxPath]/page.tsx   # 渲染 content/ 里的 MDX
content/                    # 所有文档 MDX
  _meta.ts                  # 侧边栏顺序 & 中文标题
  *.mdx
components/                 # 复用组件（Home、Terminal…）
styles/                     # SCSS Modules
mdx-components.tsx          # Nextra 4 要求：注入主题 MDX 组件
```

路由组 `(home)` 和 `(docs)` 的作用：首页不被 Nextra Layout 包裹，文档页才套 navbar/sidebar。改结构时保持这个边界。

## 加内容

### 新增一篇文档

1. 建 `content/<slug>.mdx`
2. 在 `content/_meta.ts` 按期望顺序加一项（key 是文件名，value 是侧边栏显示名）
3. 访问 `/<slug>`

### 新增交互组件

- 用了任何 React hook（`useState` / `useEffect` / `useRef`）**必须**在文件顶部加 `'use client';`
- 不加会报 "You're importing a component that needs X. This component only works in a Client Component"
- 组件放 `components/`，样式配套 `styles/<name>.module.scss`
- 在 MDX 里 `import Xxx from '../components/Xxx'` 直接用即可

## 样式约定

- 一律 SCSS Modules：`import styles from './x.module.scss'`
- Accent 色 `#cc7b5c`（Anthropic 暖橙），亮变体 `#e8a87c`
- 深色底色 `#0a0a0a` → `#050505`
- 首页用自己的全屏 `.root`，不吃 Nextra 主题的白底

## 已知坑

- **`<Layout i18n={...}>` 单 locale 会炸**：传 `i18n={[{locale:'zh-CN', name:'简体中文'}]}` 会触发 `RangeError: Incorrect locale information provided`（在 `Date.toLocaleDateString` 里）。只有单一语言时 **不要** 传 `i18n` prop。
- **`_meta.json` 已废弃**：Nextra 4 只认 `_meta.{ts,tsx,js,jsx}`。
- **Node 版本**：必须 ≥ 22，否则 `chevrotain@12` 在 `yarn install` 就报 engine 不兼容。`.nvmrc` 已固定 22。
- **React / Next 版本必须同步**：Next 16 要 React 19，不能 React 18。升级时一起升。
- **hydration 错误常见来源**：`new Date()` 之类的运行时差异；或浏览器扩展（Grammarly / Dark Reader）注入 DOM 属性。先排除扩展再查代码。

## 设计原则

- 文档为主、交互为辅：Terminal 组件只是演示交互节奏，不真调模型
- 首页走 landing 风（hero + 卡片），文档页走标准 docs 风
- 页面文案写给「想快速上手 Claude Code 的开发者」，能动手就别废话

## 回复约定

- 默认中文回复，简明、不客套
- 代码改动直接给 diff 或改完的完整文件，不要长段解释
- 不要加没必要的注释 / docstring，命名自解释优先
- 不要擅自引入新依赖或抽象；能在现有结构里解决就不改结构

## 部署

Vercel 一键：连仓库、零配置、自动认 App Router。部署节点的 Node 需 ≥ 22（Vercel 默认已是）。
