# Yi’s Blog

Astro 静态博客，暖白配色，适配电脑与手机。需要 Node.js 22.12+。

## 本地预览

```sh
npm install
npm run dev
```

打开终端给出的地址，默认 http://localhost:4321 。

## 写文章

在 `src/content/posts/` 新增 Markdown 文件，文件名就是文章地址。示例：

```markdown
---
title: 新的一篇
date: 2026-09-05
description: 文章摘要。
category: 技术手记
---

这里是正文。
```

本地图片放入 `src/assets/`，从 Markdown 使用相对路径引用。现有三篇均为示例文章，可以直接删除或替换；首页与文章页的“示例”标记也请在正式发布时移除。

## 修改外观

- `src/config.ts`：站点名称、署名与介绍。
- `src/styles/global.css`：顶部 CSS 变量控制颜色、字体、行宽、边距；媒体查询控制手机排版。
- `src/pages/about.astro`：关于页介绍。

## 构建与验证

```sh
npm test
npm run preview
```

构建产物在 `dist/`。推送到 `main` 后，GitHub Actions 自动构建并发布到 https://s0meb0dy3.github.io/ 。在仓库的 Actions 页面查看部署进度。项目子路径可这样验证：

```sh
BASE_PATH=/blog npm test
BASE_PATH=/blog npm run preview
```

此时访问 `/blog/`。根域名部署使用默认配置。发布前替换示例内容。

## 每日摘句

编辑 `src/data/quotes.json` 添加收藏的句子，字段为 `text`（原文）、`source`（书名或出处）、`author`（署名）、`translation`（译文，没有则填空字符串）。首条按用户提供的微信读书截图录入，署名沿用图片，未独立考证。

从 2026-09-04 起按北京时间的日期依次循环；同一天所有访客看到同一句。页面加载、返回标签页或跨日后的首次分钟检查会更新，静态托管不需要每天重新部署。添加记录后需重新构建发布；只有一条时保持显示，无 JavaScript 时显示首条。
