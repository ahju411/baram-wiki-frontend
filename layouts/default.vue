<template>
	<div class="bg-layer-bg min-h-screen font-pretendard text-game-primary">
		<NuxtRouteAnnouncer />
		<Header />
		<main>
			<NuxtPage />
		</main>
		<Footer />
	</div>
</template>

<script setup>
import Header from '~/components/Header.vue';
import Footer from '~/components/Footer.vue';
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
