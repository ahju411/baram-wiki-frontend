<template>
	<div class="max-w-4xl mx-auto">
		<p v-if="!map" class="text-center text-game-secondary">Loading...</p>
		<div v-else>
			<!-- 맵 헤더 -->
			<div class="flex flex-col mb-6 sm:mb-8">
				<!-- 맵 이미지 -->
				<div
					class="w-full h-64 sm:h-96 bg-layer-surface border-2 border-border-primary rounded-lg p-4 mb-4"
				>
					<NuxtImg
						:src="`https://evfuckbgifbr27188584.gcdn.ntruss.com/map/${map.images}`"
						:alt="map.name"
						class="w-full h-full object-contain"
					/>
				</div>
				<!-- 맵 기본 정보 -->
				<div class="text-center">
					<h1 class="text-xl sm:text-2xl font-bold mb-4">{{ map.name }}</h1>
					<div class="bg-layer-surface rounded-lg p-4 sm:p-6 text-left">
						<p class="text-game-secondary">{{ map.information }}</p>
					</div>
				</div>
			</div>

			<!-- 기본 정보 -->
			<div class="bg-layer-surface rounded-lg p-4 sm:p-6 mb-4 sm:mb-8">
				<h2 class="text-lg font-bold mb-4">기본 정보</h2>
				<div class="space-y-2">
					<div class="flex justify-between">
						<span class="text-game-secondary">레벨</span>
						<span>{{ map.level }}</span>
					</div>
				</div>
			</div>

			<!-- 스폰된 몬스터 -->
			<div
				v-if="map.spawnedMonsters?.length"
				class="bg-layer-surface rounded-lg p-4 sm:p-6"
			>
				<h2 class="text-lg font-bold mb-4">스폰된 몬스터</h2>
				<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<NuxtLink
						v-for="spawn in map.spawnedMonsters"
						:key="spawn.mob_id"
						:to="`/monster/${spawn.monster.id}`"
						class="flex items-center gap-3 bg-layer-overlay p-3 rounded hover:bg-opacity-80 transition-all cursor-pointer border border-transparent hover:border-border-primary hover:shadow-lg hover:text-game-legendary"
					>
						<NuxtImg
							:src="`https://evfuckbgifbr27188584.gcdn.ntruss.com/monster/${spawn.monster.images}`"
							:alt="spawn.monster.name"
							class="w-12 h-12 object-contain"
						/>
						<span>{{ spawn.monster.name }}</span>
					</NuxtLink>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { Map, DropItem, Location } from '~/types/map';

const id = useRoute().params.id as string;
const { data: map } = await useAsyncData<Map>('mapData', () =>
	$fetch(`/api/map/${id}`)
);

useSeoMeta({
	title: `바람위키 | 맵 - ${map.value?.name}`,
	description: `바람의 나라 맵 정보 - ${map.value?.information}`,
});
</script>
