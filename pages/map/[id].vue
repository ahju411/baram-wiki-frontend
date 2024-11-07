<template>
    <div>
      <h2>맵 정보</h2>
      <p v-if="!map">Loading...</p>
      <div v-else>
        {{ map }}
        <NuxtImg :src="map.images" :alt="map.name" width="100" height="100" />
        <h3>{{ map.name }}</h3>
        <p>{{ map.information }}</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { Map } from '~/types/map'
  const id = useRoute().params.id
  const { data: map } = await useAsyncData<Map>('mapData', () =>
    $fetch(`/api/map/${id}`)
  )
  </script>
  
  <style scoped lang="scss">
  /* 메인 페이지 스타일 */
  </style>
  