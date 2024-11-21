<!-- Adsense.vue -->
<template>
  <div :class="['adsense-container', position]">
    <client-only>
      <div v-if="showAd" ref="adContainer">
        <ins :class="{ adsbygoogle: true, 'adsense-initialized': isInitialized }"
             :style="adStyle"
             data-ad-client="ca-pub-9583781392760368"
             :data-ad-slot="adSlot"
             data-ad-format="auto"
             data-full-width-responsive="true">
        </ins>
      </div>
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
const adContainer = ref(null);
const isInitialized = ref(false);

const adStyle = computed(() => ({
  display: 'block',
  width: props.position === 'bottom' ? '100%' : '300px',
  minHeight: props.position === 'bottom' ? '280px' : '600px',
  background: '#f1f1f1'  // 광고 로드 전 시각적 표시
}));

const initAd = async () => {
  if (!isInitialized.value && adContainer.value) {
    try {
      // DOM이 완전히 렌더링될 때까지 대기
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // 광고가 이미 초기화되었는지 확인
      const adElement = adContainer.value.querySelector('.adsbygoogle:not(.adsense-initialized)');
      if (!adElement) return;

      if (window.adsbygoogle) {
        await (window.adsbygoogle = window.adsbygoogle || []).push({});
        isInitialized.value = true;
        adElement.classList.add('adsense-initialized');
        console.log('AdSense initialized successfully');
      } else {
        console.warn('AdSense not loaded');
      }
    } catch (error) {
      console.error('Failed to initialize AdSense:', error);
      // 실패 시 재시도 로직
      setTimeout(initAd, 1000);
    }
  }
};

onMounted(() => {
  // 컴포넌트가 마운트된 후 광고 초기화
  showAd.value = true;
  nextTick(() => {
    initAd();
  });
});
</script>

<style scoped>
.adsense-container {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
  width: 100%;
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

/* 반응형 스타일 */
@media (max-width: 768px) {
  .adsense-container {
    margin: 1rem 0;
  }
  
  .left, .right {
    margin: 0;
  }

  .adsbygoogle {
    width: 100% !important;
    min-height: 250px !important;
  }
}
</style>