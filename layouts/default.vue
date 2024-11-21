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
						:ad-style="{width: 160, height: 600}" 
					/>
				</client-only>
			</div>
			<NuxtPage />
			<div class="ad-fixed right">
				<client-only>
					<Adsense 
						v-if="showAds"
						ad-slot="3458970727"
						:ad-style="{width: 160, height: 600}" 
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
	max-width: calc(1200px + 320px);
	padding: 0 20px;
	position: relative;
	display: flex;
}
</style>
