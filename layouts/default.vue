<template>
	<div class="container">
		<NuxtRouteAnnouncer />
		<Header />
		<main class="content">
			<div class="ad-fixed left">
				<client-only>
					<Adsense ad-slot="7398215734" position="left" />
				</client-only>
			</div>
			<NuxtPage />
			<div class="ad-fixed right">
				<client-only>
					<Adsense ad-slot="3458970727" position="right" />
				</client-only>
			</div>
		</main>
		<Footer />
	</div>
</template>

<script setup>
import Header from '~/components/Header.vue';
import Footer from '~/components/Footer.vue';
import Adsense from '~/components/Adsense.vue';
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
	position: relative;
	display: flex;
}

.ad-fixed {
	position: fixed;
	top: 100px;
	width: 160px;

	&.left {
		left: calc((100% - 1200px) / 2 - 180px);
	}

	&.right {
		right: calc((100% - 1200px) / 2 - 180px);
	}

	@media (max-width: 1400px) {
		display: none;
	}
}
</style>
