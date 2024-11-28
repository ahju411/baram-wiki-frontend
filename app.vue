<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useHead } from '@vueuse/head';

const router = useRouter();

// 라우트 변경 시 강제 새로고침 처리
router.beforeEach((to, from, next) => {
	// 현재 페이지가 이미 새로고침된 상태인지 확인
	const reloaded = sessionStorage.getItem('reloaded');

	if (!reloaded) {
		// 플래그 설정 후 새로고침
		sessionStorage.setItem('reloaded', 'true');
		window.location.href = to.fullPath;
	} else {
		// 플래그 해제 후 네비게이션 허용
		sessionStorage.removeItem('reloaded');
		next();
	}
});

useHead({
	bodyAttrs: {
		class: 'bg-layer-bg min-h-screen font-pretendard text-game-primary', // 원하는 Tailwind 클래스 추가
	},
});
</script>
