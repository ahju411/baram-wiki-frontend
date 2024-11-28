<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

// 라우트 변경 시 새로고침 처리 개선
router.beforeEach((to, from, next) => {
	if (to.path !== window.location.pathname) {
		window.location.replace(to.fullPath);
		return false; // 라우터 네비게이션 중단
	}
	return true; // 같은 경로일 경우 정상적으로 진행
});

useHead({
	bodyAttrs: {
		class: 'bg-layer-bg min-h-screen font-pretendard text-game-primary', // 원하는 Tailwind 클래스 추가
	},
});
</script>
