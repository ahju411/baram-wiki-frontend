<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const isFirstNavigation = ref(true);

// 라우트 변경 시 첫 번째 라우팅 이후에만 강제 새로고침
router.beforeEach((to) => {
	if (!isFirstNavigation.value) {
		window.location.href = to.fullPath;
		return false;
	}

	isFirstNavigation.value = false;
	return true;
});

useHead({
	bodyAttrs: {
		class: 'bg-layer-bg min-h-screen font-pretendard text-game-primary',
	},
});
</script>
