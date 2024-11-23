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
import { ref, watch, onMounted } from 'vue';
import Header from '~/components/Header.vue';
import Footer from '~/components/Footer.vue';

const router = useRouter();
const currentRouteKey = ref(router.currentRoute.value.fullPath);

// 자동 광고 재초기화 함수
const reinitializeAds = () => {
	if (typeof window !== 'undefined' && window.adsbygoogle) {
		try {
			// 기존 광고 제거
			const adElements = document.querySelectorAll('.adsbygoogle');
			adElements.forEach((ad) => ad.remove());

			// adsbygoogle 객체 초기화
			window.adsbygoogle = [];

			// 새로운 광고 초기화
			(adsbygoogle = window.adsbygoogle || []).push({
				google_ad_client: 'ca-pub-9583781392760368',
				enable_page_level_ads: true,
			});
		} catch (e) {
			console.error('Adsense reinitialization error:', e);
		}
	}
};

// 라우트 변경 감지
watch(
	() => router.currentRoute.value.fullPath,
	(newPath) => {
		currentRouteKey.value = newPath;
		// 약간의 지연 후 광고 재초기화
		setTimeout(() => {
			reinitializeAds();
		}, 100);
	}
);

// 초기 마운트시
onMounted(() => {
	// 초기 광고 로드
	reinitializeAds();
});
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
