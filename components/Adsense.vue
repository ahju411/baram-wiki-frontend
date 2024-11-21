<!-- Adsense.vue -->
<template>
  <div :class="['adsense-container', position]">
    <client-only>
      <div v-show="showAd" ref="adContainer">
        <ins class="adsbygoogle"
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
import { ref, onMounted, computed, nextTick, watch } from 'vue';

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
let adInitialized = false;

const adStyle = computed(() => ({
  display: 'block',
  width: props.position === 'bottom' ? '100%' : '300px',
  height: props.position === 'bottom' ? '280px' : '600px'
}));

const initAd = async () => {
  if (!adInitialized && adContainer.value) {
    try {
      await nextTick();
      if (window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        adInitialized = true;
        console.log('AdSense ad initialized successfully');
      } else {
        console.warn('AdSense not loaded yet');
      }
    } catch (error) {
      console.error('Failed to initialize AdSense:', error);
    }
  }
};

onMounted(() => {
  // Check if AdSense script is loaded
  if (document.querySelector('script[src*="adsbygoogle.js"]')) {
    setTimeout(() => {
      showAd.value = true;
      initAd();
    }, 100);
  } else {
    console.error('AdSense script not found in document');
  }
});

// Watch for changes in showAd
watch(showAd, (newValue) => {
  if (newValue) {
    initAd();
  }
});
</script>

<style scoped>
.adsense-container {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
  min-height: 100px; /* Minimum height to prevent layout shifts */
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