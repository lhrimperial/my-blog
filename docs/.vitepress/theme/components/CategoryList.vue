<template>
  <section class="category-section" v-if="categories.length">
    <div class="category-section__nav">
      <button
        v-for="category in categories"
        :key="category.name"
        class="category-pill"
        :class="{ active: category.name === activeCategory }"
        type="button"
        @click="selectCategory(category.name)"
      >
        <span>{{ category.name }}</span>
        <span class="count">{{ category.count }}</span>
      </button>
    </div>
    <div class="category-section__content" v-if="activeCategory">
      <div class="category-section__title">
        <span>{{ activeCategory }}</span>
        <small>最近更新</small>
      </div>
      <PostList :category="activeCategory" />
    </div>
  </section>
  <p v-else class="empty">暂时没有分类。</p>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { usePosts } from '../composables/usePosts'

const { categories } = usePosts()
const activeCategory = ref('')

const selectCategory = (name: string) => {
  activeCategory.value = name
}

watchEffect(() => {
  if (!activeCategory.value && categories.value.length) {
    activeCategory.value = categories.value[0].name
  }
})
</script>
