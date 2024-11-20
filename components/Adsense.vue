<template>
  <div class="adsense-container" :style="containerStyle">
    <ins
      class="adsbygoogle"
      :style="{ display: 'block' }"
      :data-ad-client="adClient"
      :data-ad-slot="adSlot"
      :data-ad-format="adFormat"
      data-full-width-responsive="true"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'

// window.adsbygoogle 타입 정의
declare global {
  interface Window {
    adsbygoogle: any[]
  }
}

interface Props {
  position?: {
    top?: string
    bottom?: string
    left?: string
    right?: string
  }
  width?: string
  height?: string
  adClient?: string
  adSlot?: string
  adFormat?: string
}

const props = withDefaults(defineProps<Props>(), {
  position: () => ({}),
  width: '100%',
  height: 'auto',
  adClient: 'ca-pub-9583781392760368',
  adSlot: '',
  adFormat: 'auto'
})

const containerStyle = computed(() => ({
  position: 'absolute' as const,  // position 타입 명시
  width: props.width,
  height: props.height,
  top: props.position.top,
  bottom: props.position.bottom,
  left: props.position.left,
  right: props.position.right,
  zIndex: 999
}))

onMounted(() => {
  try {
    ;(window.adsbygoogle = window.adsbygoogle || []).push({})
  } catch (error) {
    console.error('애드센스 로딩 실패:', error)
  }
})
</script>

<style scoped>
.adsense-container {
  margin: 0 auto;
}
</style>
