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
2. 文章需包含以下 frontmatter 字段（全部小写），用于驱动分类/标签/时间线等功能：

```md
---
title: 新文章                 # 必填，用于标题和 SEO
description: 摘要简介         # 建议填写，展示在卡片和 meta 描述
date: 2024-12-02             # 必填，YYYY-MM-DD
category: 技术               # 任意字符串，决定分类页的分组
tags:
  - Vite
  - 前端
cover: /images/cover.jpg     # 可选，本地或远程图片路径
---
```

3. 正文使用标准 Markdown，支持 Vue/VitePress 组件。
4. 图片建议放入 `docs/public` 并以 `/images/xx.png` 引用，或直接填远程 URL。

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

## 📤 发布内容

1. 在本地确认文章无误、`npm run docs:build` 能成功。
2. 提交并推送代码：

```bash
git add .
git commit -m "feat: add new post"
git push origin main
```

3. 打开 GitHub 仓库的 **Actions** 选项卡，等待 `Deploy Blog` workflow 变绿。
4. 工作流完成后数秒内，GitHub Pages 将刷新到最新内容，访问 `https://lhrimperial.github.io/my-blog/` 验证。
