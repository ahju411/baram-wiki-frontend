<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// popstate 이벤트로 인한 내비게이션 플래그
const isPopNavigation = ref(false);

// popstate 이벤트 리스너 등록
onMounted(() => {
	window.addEventListener('popstate', () => {
		isPopNavigation.value = true;
	});
});

// 라우트 변경 시 강제 새로고침 처리
router.beforeEach((to, from, next) => {
	if (isPopNavigation.value) {
		// 뒤로가기/앞으로가기로 인한 내비게이션, 리로드 없이 진행
		isPopNavigation.value = false;
		next();
	} else {
		const shouldReload = sessionStorage.getItem('shouldReload');

		if (shouldReload) {
			// 플래그가 설정된 경우, 플래그 제거 후 진행
			sessionStorage.removeItem('shouldReload');
			next();
		} else {
			// 일반 내비게이션인 경우, 플래그 설정 후 새로고침
			sessionStorage.setItem('shouldReload', 'true');
			window.location.href = to.fullPath;
		}
	}
});

useHead({
	bodyAttrs: {
		class: 'bg-layer-bg min-h-screen font-pretendard text-game-primary',
	},
});
</script>
