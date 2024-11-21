<template>
  <div :class="['adsense-container', position]">
    <client-only>
      <ins v-if="showAd"
           class="adsbygoogle"
           :style="adStyle"
           data-ad-client="ca-pub-9583781392760368"
           :data-ad-slot="adSlot"
           data-ad-format="auto"
           data-full-width-responsive="true">
      </ins>
    </client-only>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from 'vue';

const props = defineProps({
  adSlot: {
    type: String,
    required: true
  },
  position: {
    type: String,
    default: 'left',
    validator: (value) => ['left', 'right', 'bottom'].includes(value)
  }
});

const showAd = ref(false);

const adStyle = computed(() => ({
  display: 'block',
  width: props.position === 'bottom' ? '100%' : '300px',
  height: props.position === 'bottom' ? '280px' : '600px'
}));

onMounted(() => {
  // 컴포넌트가 마운트된 후 약간의 지연을 두고 광고 초기화
  setTimeout(() => {
    showAd.value = true;
    // nextTick을 사용하여 DOM이 업데이트된 후 광고 초기화
    nextTick(() => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error('AdSense 초기화 에러:', error);
      }
    });
  }, 100);
});
</script>

<style scoped>
.adsense-container {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}

.left {
  margin-right: 1rem;
}

.right {
  margin-left: 1rem;
}

.bottom {
  width: 100%;
  margin: 1rem auto;
}

@media (max-width: 768px) {
  .adsense-container {
    width: 100%;
    margin: 1rem 0;
  }
  
  .left, .right {
    margin: 0;
  }
}
</style>
