import DefaultTheme from 'vitepress/theme'
import PostList from './components/PostList.vue'
import CategoryList from './components/CategoryList.vue'
import TagList from './components/TagList.vue'
import './styles/custom.css'

export default {
  ...DefaultTheme,
  enhanceApp(ctx: any) {
    DefaultTheme.enhanceApp?.(ctx)
    ctx.app.component('PostList', PostList)
    ctx.app.component('CategoryList', CategoryList)
    ctx.app.component('TagList', TagList)
  }
}
