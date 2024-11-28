<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

// 라우트 변경 시 새로고침 처리 개선
router.beforeEach((to) => {
	if (to.path !== window.location.pathname) {
		window.location.replace(to.fullPath); // replace를 사용하여 히스토리 스택 관리
		return false;
	}
	return true;
});

useHead({
	bodyAttrs: {
		class: 'bg-layer-bg min-h-screen font-pretendard text-game-primary', // 원하는 Tailwind 클래스 추가
	},
});
</script>
