<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { watch } from 'vue';

const route = useRoute();

watch(
	() => route.fullPath,
	(newPath) => {
		if (document.readyState === 'complete') {
			window.location.reload();
		}
	}
);

useHead({
	bodyAttrs: {
		class: 'bg-layer-bg min-h-screen font-pretendard text-game-primary',
	},
});
</script>
