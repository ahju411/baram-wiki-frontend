<template>
    <header>
      <h1>My Logo</h1>
      <div class="search-container">
        <input
          type="text"
          v-model="keyword"
          placeholder="검색어를 입력하세요"
          @input="handleInput"
        />
        <div v-if="isLoading" class="loading">검색 중...</div>
        <ul v-else-if="hasResults" class="results">
          <li v-for="result in results" :key="`result-${result.id}`">
            <NuxtImg :src="result.image" :alt="result.name" width="32" height="32" />
            <NuxtLink :to="`/${result.type}/${result.id}`"><strong>{{ result.type === 'item' ? '아이템' : result.type === 'map' ? '맵' : '몬스터' }}:</strong> {{ result.name }}</NuxtLink>
          </li>
        </ul>
        <p v-else-if="!isLoading && keyword && !hasResults">
          검색 결과가 없습니다.
        </p>
      </div>
    </header>
  </template>
  
  <script setup lang="ts">
  import { ref, watchEffect, computed } from 'vue'
  import type { Search } from '~/types/search'
  
  const keyword = ref('')
  const results = ref<Search[]>([])
  const isLoading = ref(false)
  
  // 검색 결과가 있는지 확인하는 computed 속성
  const hasResults = computed(() => results.value.length > 0)
  
  const handleInput = (e: Event) => {
    keyword.value = (e.target as HTMLInputElement).value
    if (!keyword.value) {
      results.value = []
      return
    }
  }
  
  watchEffect(async () => {
    if (keyword.value) {
      isLoading.value = true
      try {
        const { results: searchResults } = await $fetch<{ results: Search[] }>(`/api/search/${encodeURIComponent(keyword.value)}`)
        results.value = searchResults
      } catch (error) {
        console.error('검색 중 오류 발생:', error)
        results.value = []
      } finally {
        isLoading.value = false
      }
    }
  })
  </script>
  
  <style scoped lang="scss">
  header {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    background-color: #333;
    color: #fff;
  }
  
  .search-container {
    position: relative;
    width: 100%;
    max-width: 400px;
  }
  
  input {
    width: 100%;
    padding: 0.75rem;
    border-radius: 4px;
    border: none;
    font-size: 1rem;
  }
  
  .loading {
    color: #aaa;
    font-size: 0.9rem;
    margin-top: 0.5rem;
    text-align: center;
  }
  
  .results {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    width: 100%;
    max-height: 300px;
    overflow-y: auto;
    list-style-type: none;
    padding: 0;
    margin: 0;
    background-color: #444;
    color: #fff;
    border-radius: 4px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 10;
  }
  
  .results li {
    display: flex;
    align-items: center;
    padding: 0.75rem;
    border-bottom: 1px solid #555;
  }
  
  .results li:last-child {
    border-bottom: none;
  }
  
  .results li:hover {
    background-color: #555;
    cursor: pointer;
  }
  
  .results strong {
    margin-right: 0.5rem;
  }
  
  .results img {
    margin-right: 8px;
    border-radius: 4px;
  }
  </style>
  