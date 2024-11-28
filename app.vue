<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

let isNavigating = false;

router.beforeEach((to, from, next) => {
	// 이미 진행 중인 네비게이션이면 통과
	if (isNavigating) {
		isNavigating = false;
		return next();
	}

	// 브라우저 네비게이션(뒤로가기/앞으로가기)인 경우
	if (window.history.state?.forward) {
		window.history.replaceState(null, '', to.fullPath);
		return next();
	}

	// 일반 네비게이션
	isNavigating = true;
	window.history.pushState({ forward: true }, '', to.fullPath);
	window.location.href = to.fullPath;
	return false;
});

// 네비게이션 완료 후 상태 초기화
router.afterEach(() => {
	isNavigating = false;
});

useHead({
	bodyAttrs: {
		class: 'bg-layer-bg min-h-screen font-pretendard text-game-primary', // 원하는 Tailwind 클래스 추가
	},
});
</script>
