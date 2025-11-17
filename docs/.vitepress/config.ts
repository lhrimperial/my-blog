import { defineConfig } from 'vitepress'
import { rssPlugin } from './plugins/rss'

export default defineConfig({
  ignoreDeadLinks: true,
  title: '长发人的花园',
  description: '一个清新自然的 VitePress 个人博客，记录代码、生活与思考',
  lang: 'zh-CN',
  lastUpdated: true,
  cleanUrls: true,
  
  // 重写规则
  rewrites: {
    'posts/:page': ':page'
  },
  
  // 主题配置
  themeConfig: {
    logo: '/favicon.svg',
    
    // 导航菜单
    nav: [
      { text: '🏠 首页', link: '/' },
      { text: '📝 文章', link: '/posts/' },
      { text: '📊 归档', link: '/archive' },
      { text: '📂 分类', link: '/categories' },
      { text: '🏷️ 标签', link: '/tags' },
      { text: '👤 关于', link: '/about' },
      {
        text: '💡 更多',
        items: [
          { text: '📊 归档', link: '/archive' },
          { text: '📂 分类', link: '/categories' },
          { text: '🏷️ 标签', link: '/tags' },
          { text: '👤 关于', link: '/about' }
        ]
      }
    ],
    
    // 侧边栏配置
    sidebar: {
      '/posts/': [
        {
          text: '文章目录',
          items: [
            { text: '最新文章', link: '/posts/' },
            { text: '热门标签', link: '/tags' },
            { text: '所有分类', link: '/categories' }
          ]
        }
      ]
    },
    
    // 搜索功能
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '🔍 搜索', buttonAriaLabel: '搜索站点内容' },
          modal: {
            noResultsText: '😅 暂时没有匹配的内容',
            resetButtonTitle: '清除搜索条件',
            footer: { 
              selectText: '选择', 
              navigateText: '切换', 
              closeText: '关闭' 
            }
          }
        }
      }
    },
    
    // 大纲配置
    outline: { 
      level: [2, 3], 
      label: '📋 本页大纲' 
    },
    
    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/lhrimperial' },
      { icon: 'twitter', link: 'https://twitter.com/' },
      { icon: 'discord', link: 'https://discord.com/' }
    ],
    
    // 页脚
    footer: {
      message: '✨ 基于 MIT 许可发布',
      copyright: '📅 Copyright © 2024-present 长发人 | 用代码种花，用文字浇灌'
    },
    
    // 编辑链接
    editLink: {
      pattern: 'https://github.com/lhrimperial/my-blog/edit/main/docs/:path',
      text: '✏️ 在 GitHub 上编辑此页面'
    },
    
    // 最后更新时间
    lastUpdated: {
      text: '📅 最后更新于',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    }
  },
  
  // 头部配置
  head: [
    ['meta', { name: 'theme-color', content: '#3b82f6' }],
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'keywords', content: 'VitePress, 博客, 前端开发, 生活记录, 技术分享, 长发人' }],
    ['meta', { name: 'author', content: '长发人' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }]
  ],
  
  // Markdown 配置
  markdown: {
    lineNumbers: true,
    image: { lazyLoading: true }
  },
  
  // 外观配置
  appearance: 'force-auto',
  
  // Vite 配置
  vite: {
    plugins: [rssPlugin()],
    build: {
      minify: 'esbuild',
      target: 'es2020'
    }
  }
})
