# 远航 · 外贸站 Demo

本站为演示用途，内容与案例数据均为示例，不代表真实商业承诺。品牌「远航」与全部案例均为虚构。

## 技术栈

- Astro 5（纯静态输出）
- TypeScript
- Tailwind CSS v4（`@tailwindcss/vite`）
- 无 CMS、无数据库、无后端、无 UI 组件库

## 页面清单

| 路径 | 页面 |
|---|---|
| `/website` | 网站建设 |
| `/marketing` | 全网营销 |
| `/seo` | Google SEO |
| `/geo` | GEO 优化 |
| `/cases` | 成功案例 |

`/`（首页）通过 meta 跳转到 `/website`。

## 本地运行

```bash
npm install
npm run dev      # 开发服务器
npm run build    # 构建静态站点到 dist/
```

要求 Node 20+。

## 内容在哪里改

全部页面内容位于 `src/content/`，不要改 `.astro`：

- `src/content/pages/website.md` — 网站建设
- `src/content/pages/marketing.md` — 全网营销
- `src/content/pages/seo.md` — Google SEO
- `src/content/pages/geo.md` — GEO 优化
- `src/content/cases/*.md` — 6 个虚构案例

集合结构定义见 `src/content/config.ts`。

## 明确不做

动效（除链接与按钮的 150ms 颜色过渡外，一律没有）、滚动触发动画、数字滚动、轮播、深色模式、多语言、站内搜索、案例筛选、案例详情页、首页营销落地页、留言表单后端、JSON-LD、llms.txt、Lighthouse 分数目标、图片多格式转换、CI。

不要因为「顺手」加任何上表之外的功能。
