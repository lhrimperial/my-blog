<template>
  <section class="tag-section" v-if="tags.length">
    <div :class="layoutClass">
      <button
        v-for="tag in tags"
        :key="tag.name"
        type="button"
        class="tag-chip"
        :class="{ active: tag.name === activeTag }"
        :style="layout === 'cloud' ? { fontSize: fontSize(tag.count) } : undefined"
        @click="toggleTag(tag.name)"
      >
        <span>#{{ tag.name }}</span>
        <span class="count">{{ tag.count }}</span>
      </button>
    </div>
    <div class="tag-section__content" v-if="activeTag">
      <div class="tag-section__title">#{{ activeTag }} 的相关内容</div>
      <PostList :tag="activeTag" />
    </div>
  </section>
  <p v-else class="empty">暂时没有标签。</p>
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

const layoutClass = computed(() =>
  props.layout === 'cloud' ? 'tag-cloud tag-cloud--floating' : 'tag-cloud tag-cloud--grid'
)
</script>
