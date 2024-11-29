<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

const router = useRouter();
const isFirstVisit = ref(true);

onMounted(() => {
	// 클라이언트 사이드에서만 sessionStorage 접근
	isFirstVisit.value = !sessionStorage.getItem('hasVisited');
});

// 라우트 변경 시 첫 방문이 아닐 때만 강제 새로고침
router.beforeEach((to) => {
	if (isFirstVisit.value) {
		// 최초 방문 표시
		sessionStorage.setItem('hasVisited', 'true');
		isFirstVisit.value = false;
		return true;
	}

	window.location.href = to.fullPath;
	return false;
});

useHead({
	bodyAttrs: {
		class: 'bg-layer-bg min-h-screen font-pretendard text-game-primary',
	},
});
</script>
