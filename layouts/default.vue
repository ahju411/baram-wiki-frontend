<template>
    <div>
      <NuxtRouteAnnouncer />
      <Header />
      <NuxtPage />
      <Footer />
    </div>
  </template>
  
  <script setup>
  import Header from '~/components/Header.vue'
  import Footer from '~/components/Footer.vue'
  </script>
  
  <style scoped lang="scss">
  /* 레이아웃 스타일 */
  body {
    margin: 0;
    font-family: 'Noto Sans KR', sans-serif;
  }
  </style>
  