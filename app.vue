<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

// 라우트 변경 시 처리 로직 개선
router.beforeEach((to, from, next) => {
	// 브라우저 뒤로가기/앞으로가기 동작 감지
	if (window.history.state?.forward) {
		return next();
	}

	// 모든 라우트 변경 시 새로고침 처리
	window.history.pushState({ forward: true }, '', to.fullPath);
	window.location.reload();
	return false;
});

useHead({
	bodyAttrs: {
		class: 'bg-layer-bg min-h-screen font-pretendard text-game-primary', // 원하는 Tailwind 클래스 추가
	},
});
</script>
