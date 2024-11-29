<template>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		<!-- 최근 방문 맵 섹션 추가 -->
		<div v-if="recentMaps.length > 0" class="mb-8">
			<h2 class="text-xl font-bold text-game-primary mb-4">최근 방문한 맵</h2>
			<div class="flex flex-wrap gap-2">
				<NuxtLink
					v-for="(map, index) in recentMaps"
					:key="map.id"
					:to="`/map/all/${map.id}`"
					class="inline-flex items-center px-3 py-1.5 bg-layer-surface hover:bg-layer-overlay rounded-full text-sm transition-colors"
				>
					<span class="text-game-secondary font-medium mr-1.5">{{
						index + 1
					}}</span>
					<span class="text-game-primary">{{ map.name }}</span>
				</NuxtLink>
			</div>
		</div>
		<div
			class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
		>
			<NuxtLink
				v-for="map in data"
				:key="map.id"
				:to="`/map/all/${map.id}`"
				class="bg-layer-surface rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 group"
			>
				<div class="p-4">
					<h3
						class="text-xl font-bold text-game-primary mb-2 group-hover:text-game-legendary transition-colors"
					>
						{{ map.name }}
					</h3>
					<div class="aspect-square relative">
						<NuxtImg
							:src="`https://evfuckbgifbr27188584.gcdn.ntruss.com/map/${map.id}.png`"
							:alt="map.name"
							class="w-full h-full object-contain"
							loading="lazy"
							placeholder
							:quality="50"
							format="webp"
						/>
					</div>
				</div>
			</NuxtLink>
		</div>
	</div>
</template>

<script lang="ts" setup>
const { data } = await useAsyncData('map-all', () => $fetch('/api/map/all'));

const recentMaps = ref([]);

onMounted(() => {
	const stored = localStorage.getItem('recentMaps');
	if (stored) {
		recentMaps.value = JSON.parse(stored);
	}
});

const addToRecentMaps = (map) => {
	const newRecent = recentMaps.value.filter((m) => m.id !== map.id);
	newRecent.unshift({
		id: map.id,
		name: map.name,
	});

	recentMaps.value = newRecent.slice(0, 10);
	localStorage.setItem('recentMaps', JSON.stringify(recentMaps.value));
};

useSeoMeta({
	title: '바람위키 | 전체 맵 목록',
	description: '바람의 나라 전체 맵 목록을 확인하세요.',
});
</script>

<style scoped>
.aspect-square {
	aspect-ratio: 1/1;
}
</style>
