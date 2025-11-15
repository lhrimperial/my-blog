<template>
  <section>
    <div class="category-grid">
      <button
        v-for="category in categories"
        :key="category.name"
        class="category-card"
        :class="{ active: category.name === activeCategory }"
        type="button"
        @click="selectCategory(category.name)"
      >
        <span class="category-card__name">{{ category.name }}</span>
        <span class="category-card__count">{{ category.count }} 篇</span>
      </button>
    </div>
    <div class="category-posts" v-if="activeCategory">
      <div class="category-posts__title">{{ activeCategory }} · 最近更新</div>
      <PostList :category="activeCategory" />
    </div>
  </section>
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
