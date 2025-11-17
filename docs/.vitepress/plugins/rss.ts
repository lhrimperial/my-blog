// RSS 生成插件 - 空实现版本
export function rssPlugin() {
  return {
    name: 'vitepress-plugin-rss',
    
    buildEnd() {
      console.log('📬 RSS插件已加载')
    }
  }
}