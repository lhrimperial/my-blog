import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '长发人的花园',
  description: '一个清新自然的 VitePress 个人博客',
  lang: 'zh-CN',
  lastUpdated: true,
  cleanUrls: true,
  themeConfig: {
    logo: '/favicon.svg',
    nav: [
      { text: '首页', link: '/' },
      { text: '分类', link: '/categories' },
      { text: '标签', link: '/tags' },
      { text: '关于', link: '/about' },
      {
        text: '项目',
        items: [
          { text: 'GitHub 仓库', link: 'https://github.com/lhrimperial/my-blog' },
          { text: 'Issues', link: 'https://github.com/lhrimperial/my-blog/issues' }
        ]
      }
    ],
    sidebar: {
      '/posts/': [
        {
          text: '最新文章',
          items: [
            { text: '欢迎来到我的数字花园', link: '/posts/welcome-to-my-blog' },
            { text: 'VitePress 写作体验调校手记', link: '/posts/vitepress-best-practices' },
            { text: '把生活调成柔和滤镜', link: '/posts/creative-routines' },
            { text: '我常用的深度工作流程', link: '/posts/productivity-playbook' }
          ]
        }
      ]
    },
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索', buttonAriaLabel: '搜索站点' },
          modal: {
            noResultsText: '暂时没有匹配的内容',
            resetButtonTitle: '清除查询',
            footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' }
          }
        }
      }
    },
    outline: { level: [2, 3], label: '本页提纲' },
    socialLinks: [{ icon: 'github', link: 'https://github.com/lhrimperial' }],
    footer: {
      message: '基于 MIT 许可发布',
      copyright: 'Copyright © 2024-present 长发人'
    }
  },
  head: [
    ['meta', { name: 'theme-color', content: '#52a7a3' }],
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'keywords', content: 'VitePress, 博客, 前端, 生活, 长发人' }]
  ],
  markdown: {
    image: { lazyLoading: true }
  }
})
