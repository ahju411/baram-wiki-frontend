<template>
    <div>
      <h2>몬스터 정보</h2>
      <p v-if="!monster">Loading...</p>
      <div v-else>
        {{ monster }}
        <NuxtImg :src="monster.images" :alt="monster.name" width="100" height="100" />
        <h3>{{ monster.name }}</h3>
        <p>{{ monster.information }}</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { Monster } from '~/types/monster'
  const id = useRoute().params.id
  const { data: monster } = await useAsyncData<Monster>('monsterData', () =>
    $fetch(`/api/monster/${id}`)
  )
  </script>
  
  <style scoped lang="scss">
  /* 메인 페이지 스타일 */
  </style>
  