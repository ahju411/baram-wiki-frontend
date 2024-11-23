<template>
	<div class="container">
		<NuxtRouteAnnouncer />
		<Header />
		<main class="content">
			<NuxtPage />
		</main>
		<Footer />
	</div>
</template>

<script setup>
import Header from '~/components/Header.vue';
import Footer from '~/components/Footer.vue';
import { useRouter } from 'vue-router';

// 라우터 가져오기
const router = useRouter();

// 라우터 전환 후 Google Adsense 광고 재로드
router.afterEach(() => {
	if (typeof window !== 'undefined' && window.adsbygoogle) {
		window.adsbygoogle = window.adsbygoogle || [];
		window.adsbygoogle.push({});
	}
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
