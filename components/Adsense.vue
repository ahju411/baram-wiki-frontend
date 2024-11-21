<template>
  <div :class="['adsense-container', position]">
    <client-only>
      <ins class="adsbygoogle"
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
import { onMounted, computed } from 'vue';

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

const adStyle = computed(() => ({
  display: 'block',
  width: props.position === 'bottom' ? '100%' : '300px',
  height: props.position === 'bottom' ? '280px' : '600px'
}));

onMounted(() => {
  try {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  } catch (error) {
    console.error('AdSense 초기화 에러:', error);
  }
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
