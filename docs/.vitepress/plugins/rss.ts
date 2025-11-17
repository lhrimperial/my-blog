import { SiteConfig } from 'vitepress'
import { writeFileSync } from 'fs'
import { join } from 'path'

// RSS 生成插件
export function rssPlugin() {
  return {
    name: 'vitepress-plugin-rss',
    
    configureServer(server) {
      // 开发模式下不生成 RSS
      if (process.env.NODE_ENV === 'development') {
        return
      }
      
      server.middlewares.use('/rss.xml', (req, res, next) => {
        if (req.url === '/rss.xml') {
          res.setHeader('Content-Type', 'application/xml')
          generateRSS()
          next()
        } else {
          next()
        }
      })
    },
    
    async closeBundle() {
      // 构建完成后生成 RSS
      if (process.env.NODE_ENV !== 'development') {
        setTimeout(() => {
          generateRSS()
        }, 1000)
      }
    }
  }
}

function generateRSS() {
  try {
    const rssContent = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>长发人的花园</title>
  <link>https://lhrimperial.github.io/my-blog</link>
  <description>一个清新自然的 VitePress 个人博客，记录代码、生活与思考</description>
  <language>zh-CN</language>
  <atom:link href="https://lhrimperial.github.io/my-blog/rss.xml" rel="self" type="application/rss+xml" />
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  
  <item>
    <title>欢迎来到我的数字花园</title>
    <link>https://lhrimperial.github.io/my-blog/welcome-to-my-blog</link>
    <description>为什么我要重新搭建一个博客，以及它会分享什么内容。</description>
    <pubDate>Sun, 01 Dec 2024 00:00:00 GMT</pubDate>
    <guid>https://lhrimperial.github.io/my-blog/welcome-to-my-blog</guid>
    <category>随笔</category>
  </item>
  
  <item>
    <title>VitePress 写作体验调校手记</title>
    <link>https://lhrimperial.github.io/my-blog/vitepress-best-practices</link>
    <description>分享一套更优雅的 VitePress 写作流程，包括目录、标签、自动部署等实践。</description>
    <pubDate>Mon, 18 Nov 2024 00:00:00 GMT</pubDate>
    <guid>https://lhrimperial.github.io/my-blog/vitepress-best-practices</guid>
    <category>技术</category>
  </item>
  
  <item>
    <title>把生活调成柔和滤镜</title>
    <link>https://lhrimperial.github.io/my-blog/creative-routines</link>
    <description>用一些轻巧的日常仪式感，让创作与生活都保持新鲜。</description>
    <pubDate>Sat, 05 Oct 2024 00:00:00 GMT</pubDate>
    <guid>https://lhrimperial.github.io/my-blog/creative-routines</guid>
    <category>生活</category>
  </item>
  
  <item>
    <title>我常用的深度工作流程</title>
    <link>https://lhrimperial.github.io/my-blog/productivity-playbook</link>
    <description>从番茄钟到日程拆分，分享一套实测有效的效率策略。</description>
    <pubDate>Mon, 16 Sep 2024 00:00:00 GMT</pubDate>
    <guid>https://lhrimperial.github.io/my-blog/productivity-playbook</guid>
    <category>效率</category>
  </item>
  
</channel>
</rss>`

    // 将 RSS 文件写入构建目录
    const outputPath = join('./docs/.vitepress/dist', 'rss.xml')
    writeFileSync(outputPath, rssContent)
    
    console.log('✅ RSS 订阅文件已生成')
  } catch (error) {
    console.error('❌ RSS 生成失败:', error)
  }
}