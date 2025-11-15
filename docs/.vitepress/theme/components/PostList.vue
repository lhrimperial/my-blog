<template>
  <div class="post-list" v-if="postsToRender.length">
    <article v-for="post in postsToRender" :key="post.url" class="post-card">
      <a class="post-card__title" :href="post.url">
        <h3>{{ post.title }}</h3>
      </a>
      <p class="post-card__desc">{{ post.description }}</p>
      <div class="post-card__meta">
        <span>{{ post.formattedDate }}</span>
        <span class="dot" aria-hidden="true">•</span>
        <a class="category" :href="`/categories#${post.category}`">{{ post.category }}</a>
      </div>
      <div class="post-card__tags">
        <a
          v-for="tag in post.tags"
          :key="tag"
          class="tag-pill"
          :href="`/tags#${tag}`"
        >
          #{{ tag }}
        </a>
      </div>
    </article>
  </div>
  <p v-else class="empty">暂时还没有文章。</p>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePosts } from '../composables/usePosts'

type Props = {
  limit?: number
  category?: string
  tag?: string
}

const props = withDefaults(defineProps<Props>(), {
  limit: undefined,
  category: '',
  tag: ''
})

const { posts } = usePosts()

const filteredPosts = computed(() =>
  posts.value.filter((post) => {
    const matchCategory = props.category ? post.category === props.category : true
    const matchTag = props.tag ? post.tags.includes(props.tag) : true
    return matchCategory && matchTag
  })
)

const postsToRender = computed(() =>
  props.limit ? filteredPosts.value.slice(0, props.limit) : filteredPosts.value
)
</script>
