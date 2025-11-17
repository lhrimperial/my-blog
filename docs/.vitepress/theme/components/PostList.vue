<template>
  <div class="post-list" v-if="postsToRender.length">
    <article v-for="post in postsToRender" :key="post.url" class="post-card">
      <div class="post-card__body">
        <div class="post-card__eyebrow">
          <span>{{ post.formattedDate }}</span>
          <span class="divider" aria-hidden="true">/</span>
          <a :href="`/categories#${post.category}`">{{ post.category }}</a>
        </div>
        <a class="post-card__title" :href="post.url">
          <h3>{{ post.title }}</h3>
        </a>
        <p class="post-card__desc">{{ post.description }}</p>
      </div>
      <div class="post-card__footer">
        <div class="post-card__tags">
          <a
            v-for="tag in post.tags"
            :key="tag"
            class="tag-chip"
            :href="`/tags#${tag}`"
          >
            {{ tag }}
          </a>
        </div>
        <a class="post-card__readmore" :href="post.url">阅读全文 →</a>
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
