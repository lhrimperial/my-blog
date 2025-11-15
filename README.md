# 长发人的花园 · VitePress 博客

一个部署在 GitHub Pages 上的 VitePress 博客，支持分类、标签、菜单、搜索与 Markdown 写作，样式清新自然。

## ✨ 特性

- 基于 [VitePress](https://vitepress.dev/) + Vue 3，体验轻快
- 首页文章列表、分类/标签聚合、全文搜索
- Markdown Frontmatter 驱动的文章元信息
- 自定义主题样式，浅色/深色模式均友好
- GitHub Actions 自动构建并发布到 Pages

## 🚀 快速开始

```bash
npm install
npm run docs:dev
```

访问 `http://localhost:5173` 预览。

## 📝 写作指南

1. 在 `docs/posts` 下创建新的 Markdown 文件。
2. 在文件顶部添加 frontmatter，例如：

```md
---
title: 新文章
date: 2024-12-02
category: 技术
tags:
  - Vite
  - 前端
---
```

3. `category` 与 `tags` 会自动出现在分类/标签页面。
4. 将图片放入 `docs/public` 或者使用远程链接。

## 📂 目录结构

```
├── docs
│   ├── posts                # 文章内容
│   ├── categories.md        # 分类聚合
│   ├── tags.md              # 标签云
│   ├── about.md             # 关于页面
│   └── .vitepress
│       ├── config.ts        # 站点配置
│       └── theme            # 自定义主题、组件、样式
├── package.json
└── .github/workflows/deploy.yml
```

## 🌐 部署

仓库默认启用 GitHub Pages：

1. `main` 分支 push 触发 `Deploy Blog` workflow。
2. GitHub Actions 执行 `npm ci && npm run docs:build`。
3. 构建产物上传并由 Pages 发布到 `gh-pages`，访问 `https://lhrimperial.github.io/my-blog/`。

如需本地预览构建结果，运行 `npm run docs:build && npm run docs:preview`。
