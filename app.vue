<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

// 라우트 변경 시 강제로 새로고침
router.beforeEach((to) => {
	window.location.href = to.fullPath; // 모든 라우트에서 강제 새로고침
	return false;
});

useHead({
	bodyAttrs: {
		class: 'bg-layer-bg min-h-screen font-pretendard text-game-primary', // 원하는 Tailwind 클래스 추가
	},
});

</script>
