<template>
  <div class="adsense-container">
    <ins
      class="adsbygoogle"
      style="display:block; width: 160px; height: 600px;"
      data-ad-client="ca-pub-9583781392760368"
      data-ad-slot="7398215734"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  if (typeof window !== 'undefined' && window.adsbygoogle) {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense initialization failed:', e);
    }
  }
});
</script>

<style scoped>
.adsense-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
}
</style>
