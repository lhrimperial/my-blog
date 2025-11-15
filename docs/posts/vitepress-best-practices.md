---
title: VitePress 写作体验调校手记
description: 分享一套更优雅的 VitePress 写作流程，包括目录、标签、自动部署等实践。
date: 2024-11-18
category: 技术
tags:
  - VitePress
  - 前端
deck: "" 
---

VitePress 默认主题清爽，但只要稍加打磨，就能具备媲美博客系统的体验。本文梳理了几个关键点。

## 目录结构

```
├── docs
│   ├── posts
│   └── .vitepress
```

保持结构简单，文章与配置完全分离，写作时心无旁骛。

## 分类 & 标签

使用 `frontmatter` 来声明：

```md
---
category: 技术
tags:
  - VitePress
  - 工具
---
```

随后在客户端通过 `import.meta.glob` 获取文章列表，即可实现动态聚合。

## 自动部署

GitHub Actions + Pages 能够在 push 后几分钟内完成发布，不再需要额外的服务器和手动步骤。
