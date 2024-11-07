<template>
    <div>
      <h2>아이템 정보</h2>
      <p v-if="!item">Loading...</p>
      <div v-else>
        {{ item }}
        <NuxtImg :src="item.iconUrl" :alt="item.name" width="100" height="100" />
        <h3>{{ item.name }}</h3>
        <p>{{ item.desc }}</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { Item } from '~/types/item'
  const { data: item } = await useAsyncData<Item>('itemData', () =>
    $fetch('/api/item/I019196')
  )
  </script>
  
  <style scoped lang="scss">
  /* 메인 페이지 스타일 */
  </style>
  