import { computed } from 'vue'
import dayjs from 'dayjs'

type MarkdownModule = {
  frontmatter?: Record<string, any>
  __pageData?: {
    title?: string
    description?: string
    frontmatter?: Record<string, any>
  }
}

export type PostSummary = {
  title: string
  description: string
  date: string
  formattedDate: string
  category: string
  tags: string[]
  url: string
  cover?: string
}

const modules = import.meta.glob('../../posts/*.md', { eager: true })

const normalizedPosts: PostSummary[] = Object.entries(modules)
  .map(([path, module]) => {
    const mod = module as MarkdownModule
    const pageData = mod.__pageData ?? {}
    const combinedFrontmatter = {
      ...(mod.frontmatter ?? {}),
      ...(pageData.frontmatter ?? {})
    }
    const slug = path.replace('../../posts/', '').replace(/\.md$/, '')
    const rawDate = combinedFrontmatter.date ?? ''
    const safeDate = rawDate && dayjs(rawDate).isValid() ? rawDate : ''

    return {
      title: combinedFrontmatter.title ?? (pageData.title as string) ?? slug,
      description: combinedFrontmatter.description ?? (pageData.description as string) ?? '',
      category: combinedFrontmatter.category ?? '未分类',
      tags: Array.isArray(combinedFrontmatter.tags) ? combinedFrontmatter.tags : [],
      date: safeDate,
      formattedDate: safeDate ? dayjs(safeDate).format('YYYY 年 MM 月 DD 日') : '未注明',
      url: `/posts/${slug}`,
      cover: combinedFrontmatter.cover
    }
  })
  .sort((a, b) => {
    const getTime = (value: string) => (value ? dayjs(value).valueOf() : 0)
    return getTime(b.date) - getTime(a.date)
  })

const categoriesMap = normalizedPosts.reduce(
  (map, post) => map.set(post.category, (map.get(post.category) ?? 0) + 1),
  new Map<string, number>()
)

const tagsMap = normalizedPosts.reduce((map, post) => {
  post.tags.forEach((tag) => {
    map.set(tag, (map.get(tag) ?? 0) + 1)
  })
  return map
}, new Map<string, number>())

const categoryList = Array.from(categoriesMap.entries()).map(([name, count]) => ({ name, count }))
const tagList = Array.from(tagsMap.entries()).map(([name, count]) => ({ name, count }))

export function usePosts() {
  return {
    posts: computed(() => normalizedPosts),
    categories: computed(() => categoryList),
    tags: computed(() => tagList)
  }
}
