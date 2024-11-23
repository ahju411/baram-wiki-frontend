<template>
	<div class="container" :key="currentRouteKey">
		<NuxtRouteAnnouncer />
		<Header />
		<main class="content">
			<NuxtPage />
		</main>
		<Footer />
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, watch } from 'vue';
import Header from '~/components/Header.vue';
import Footer from '~/components/Footer.vue';

// 현재 라우트 키를 감지하여 DOM 강제 갱신
const router = useRouter();
const currentRouteKey = ref(router.currentRoute.value.fullPath);

watch(
	() => router.currentRoute.value.fullPath,
	(newPath) => {
		currentRouteKey.value = newPath; // DOM 강제 업데이트
		if (typeof window !== 'undefined') {
			try {
				// 광고 초기화 전에 기존 광고 상태 확인
				const adsElements = document.querySelectorAll('ins.adsbygoogle');
				let adsAlreadyLoaded = false;

				// 이미 로드된 광고인지 확인
				adsElements.forEach((ad) => {
					if (ad.getAttribute('data-adsbygoogle-status') === 'done') {
						adsAlreadyLoaded = true;
					}
				});

				// 광고가 이미 로드되지 않았다면 초기화 실행
				if (!adsAlreadyLoaded) {
					(window.adsbygoogle = window.adsbygoogle || []).push({});
				}
			} catch (e) {
				console.error('Adsense initialization error:', e);
			}
		}
	}
);
</script>

<style scoped lang="scss">
.container {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
}

.content {
	flex: 1;
	margin: 0 auto;
	max-width: 1200px;
	padding: 0 20px;
	display: flex;
}
</style>
