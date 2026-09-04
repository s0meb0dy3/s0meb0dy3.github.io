---
title: 一块小屏幕，也应该有舒服的阅读体验
date: 2026-09-01
description: 关于行宽、留白和那些容易被忽略的排版细节。
category: 设计观察
---
这是一篇**示例文章**，用来检查长标题、链接和宽内容在不同屏幕上的表现。

## 阅读的节奏

电脑屏幕很宽，不意味着文字应该铺满整个屏幕。适当限制行宽，读完一行之后，眼睛更容易找到下一行的起点。

手机上则需要给正文留出边距。标题可以换行，图片可以缩小，而代码应该保留原有格式。

## 长内容有自己的空间

下面这行代码刻意保留较长的内容：在手机上，你可以在代码框内左右滑动。

```js
const readingPreferences = { fontSize: 17, lineHeight: 1.95, contentWidth: 700, mobilePadding: 20, preserveCodeFormatting: true };
```

表格也应独立滚动，不影响正文的位置：

| 检查项目 | 手机 375px | 手机 390px | 平板 768px | 电脑 1440px |
| --- | --- | --- | --- | --- |
| 正文排版 | 单栏阅读 | 单栏阅读 | 居中阅读 | 限制行宽 |
| 宽代码与表格 | 区域内滚动 | 区域内滚动 | 按需滚动 | 按需滚动 |

长链接也应正常换行，例如这条演示链接：[https://example.com/notes/a-long-address-to-check-responsive-reading-layout-on-a-small-mobile-screen](https://example.com/notes/a-long-address-to-check-responsive-reading-layout-on-a-small-mobile-screen)。

> 屏幕变小，阅读的舒适度不应该随之减少。
