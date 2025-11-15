<template>
  <section>
    <div v-if="layout === 'grid'" class="tag-grid">
      <button
        v-for="tag in tags"
        :key="tag.name"
        type="button"
        class="tag-grid__item"
        :class="{ active: tag.name === activeTag }"
        @click="toggleTag(tag.name)"
      >
        <span>#{{ tag.name }}</span>
        <span>{{ tag.count }}</span>
      </button>
    </div>
    <div v-else class="tag-cloud">
      <button
        v-for="tag in tags"
        :key="tag.name"
        type="button"
        class="tag-cloud__item"
        :style="{ fontSize: fontSize(tag.count) }"
        :class="{ active: tag.name === activeTag }"
        @click="toggleTag(tag.name)"
      >
        #{{ tag.name }}
      </button>
    </div>
    <div class="category-posts" v-if="activeTag">
      <div class="category-posts__title">#{{ activeTag }} 的相关内容</div>
      <PostList :tag="activeTag" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { usePosts } from '../composables/usePosts'

type Props = {
  layout?: 'grid' | 'cloud'
}

const props = withDefaults(defineProps<Props>(), {
  layout: 'grid'
})

const { tags } = usePosts()
const activeTag = ref('')

const maxCount = computed(() => Math.max(...tags.value.map((tag) => tag.count), 1))

const fontSize = (count: number) => {
  const min = 1
  const max = 1.6
  return `${(count / maxCount.value) * (max - min) + min}rem`
}

const toggleTag = (name: string) => {
  activeTag.value = activeTag.value === name ? '' : name
}
</script>
