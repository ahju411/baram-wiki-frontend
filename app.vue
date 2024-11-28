<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

router.beforeEach((to, from, next) => {
	// 브라우저 네비게이션(뒤로가기/앞으로가기)인 경우
	if (window.history.state?.back || window.history.state?.forward) {
		return next();
	}

	// 모든 일반 네비게이션에 대해 강제 새로고침
	window.location.href = to.fullPath;
	return false;
});

useHead({
	bodyAttrs: {
		class: 'bg-layer-bg min-h-screen font-pretendard text-game-primary', // 원하는 Tailwind 클래스 추가
	},
});
</script>
