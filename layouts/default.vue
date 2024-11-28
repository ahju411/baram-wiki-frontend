<template>
	<div>
		<NuxtRouteAnnouncer />
		<Header />
		<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
			<NuxtPage />
		</main>
		<Footer />
	</div>
</template>

<script setup>
import Header from '~/components/Header.vue';
import Footer from '~/components/Footer.vue';
import { onBeforeRouteUpdate } from 'vue-router';

// 페이지 이동 시 새로고침
onBeforeRouteUpdate(() => {
	window.location.href = location.href; // URL 변경 후 전체 새로고침
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
