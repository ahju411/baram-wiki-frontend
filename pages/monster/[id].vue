<template>
	<div class="max-w-4xl mx-auto">
		<p v-if="!monster" class="text-center text-game-secondary">Loading...</p>
		<div v-else>
			<!-- 몬스터 헤더 -->
			<div class="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-6 sm:mb-8">
				<!-- 몬스터 이미지 -->
				<div
					class="w-24 h-24 sm:w-32 sm:h-32 bg-layer-surface border-2 border-border-primary rounded-lg p-4 flex items-center justify-center mx-auto sm:mx-0"
				>
					<NuxtImg
						:src="`https://evfuckbgifbr27188584.gcdn.ntruss.com/monster/${monster.images}`"
						:alt="monster.name"
						class="w-full h-full object-contain"
					/>
				</div>
				<!-- 몬스터 기본 정보 -->
				<div class="flex-1 text-center sm:text-left">
					<h1 class="text-xl sm:text-2xl font-bold mb-2">{{ monster.name }}</h1>
					<p class="text-game-secondary mb-4">{{ monster.information }}</p>
					<div
						class="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-4 text-sm"
					>
						<div class="bg-layer-surface px-3 py-1 rounded">
							{{ monster.mtype === 'Y' ? '보스' : '일반' }}
						</div>
					</div>
				</div>
			</div>

			<!-- 기본 정보 -->
			<div class="bg-layer-surface rounded-lg p-4 sm:p-6 mb-4 sm:mb-8">
				<h2 class="text-lg font-bold mb-4">기본 정보</h2>
				<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<div class="space-y-2">
						<div class="flex justify-between">
							<span class="text-game-secondary">레벨</span>
							<span>{{ monster.level }}</span>
						</div>
						<div class="flex justify-between">
							<span class="text-game-secondary">HP</span>
							<span>{{ monster.hp }}</span>
						</div>
						<div class="flex justify-between">
							<span class="text-game-secondary">MP</span>
							<span>{{ monster.mp }}</span>
						</div>
						<div class="flex justify-between">
							<span class="text-game-secondary">경험치</span>
							<span>{{ monster.exp }}</span>
						</div>
					</div>
					<div class="space-y-2">
						<div class="flex justify-between">
							<span class="text-game-secondary">방어력</span>
							<span>{{ monster.defense }}</span>
						</div>
						<div class="flex justify-between">
							<span class="text-game-secondary">마법 방어력</span>
							<span>{{ monster.mdefense }}</span>
						</div>
					</div>
				</div>
			</div>

			<!-- 생성 위치 -->
			<div class="bg-layer-surface rounded-lg p-4 sm:p-6 mb-4 sm:mb-8">
				<h2 class="text-lg font-bold mb-4">생성 위치</h2>
				<NuxtLink :to="`/map/${monster.respawn}`">
					<div
						class="flex items-center gap-3 bg-layer-overlay p-3 rounded hover:bg-opacity-80 transition-all cursor-pointer border border-transparent hover:border-border-primary hover:shadow-lg hover:text-game-legendary"
					>
						<NuxtImg
							:src="`https://evfuckbgifbr27188584.gcdn.ntruss.com/map/${monster.map_images}`"
							:alt="monster.map_name"
							class="w-12 h-12 object-contain"
						/>
						<span>{{ monster.map_name }}</span>
					</div>
				</NuxtLink>
			</div>

			<!-- 드랍 아이템 -->
			<div
				v-if="monster.drops?.length"
				class="bg-layer-surface rounded-lg p-4 sm:p-6"
			>
				<h2 class="text-lg font-bold mb-4">드랍 아이템</h2>
				<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<NuxtLink
						v-for="drop in monster.drops"
						:key="drop.item_id"
						:to="`/item/${drop.item.id}`"
						class="flex items-center gap-3 bg-layer-overlay p-3 rounded hover:bg-opacity-80 transition-all cursor-pointer border border-transparent hover:border-border-primary hover:shadow-lg hover:text-game-legendary"
					>
						<NuxtImg
							:src="`https://evfuckbgifbr27188584.gcdn.ntruss.com/item/${drop.item.images}`"
							:alt="drop.item.name"
							class="w-12 h-12 object-contain"
						/>
						<span>{{ drop.item.name }}</span>
					</NuxtLink>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { Monster } from '~/types/monster';
const id = useRoute().params.id;
const { data: monster } = await useAsyncData<Monster>('monsterData', () =>
	$fetch(`/api/monster/${id}`)
);

useSeoMeta({
	title: '바람위키 | 몬스터 - ' + monster.value?.name,
	description: '바람의 나라 몬스터 정보 - ' + monster.value?.information,
});
</script>

<style scoped lang="scss"></style>
