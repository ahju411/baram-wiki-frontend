<template>
	<div class="container">
		<NuxtRouteAnnouncer />
		<Header />
		<main class="content">
			<div class="ad-fixed left">
				<client-only>
					<Adsense 
						v-if="showAds"
						ad-slot="7398215734" 
						ad-style="display:block" 
						ad-format="auto"
					/>
				</client-only>
			</div>
			<NuxtPage />
			<div class="ad-fixed right">
				<client-only>
					<Adsense 
						v-if="showAds"
						ad-slot="3458970727"
						ad-style="display:block"
						ad-format="auto" 
					/>
				</client-only>
			</div>
		</main>
		<Footer />
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const showAds = ref(false)

onMounted(() => {
	// 마운트 된 후에 광고 표시
	showAds.value = true
})
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
