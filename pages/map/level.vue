<template>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<!-- 탭 네비게이션 -->
		<div class="flex flex-wrap justify-center gap-2 mb-6">
			<button
				v-for="tab in tabs"
				:key="tab.id"
				:class="[
					'px-4 py-2 rounded-md transition-all',
					activeTab === tab.id
						? 'bg-layer-overlay text-game-primary'
						: 'bg-layer-surface text-game-secondary hover:bg-opacity-80',
				]"
				@click="activeTab = tab.id"
			>
				{{ tab.name }}
			</button>
		</div>

		<!-- 레벨 리스트 -->
		<div v-for="tab in tabs" :key="tab.id" v-show="activeTab === tab.id">
			<div class="space-y-8">
				<div
					v-for="level in groupedLevels"
					:key="level.id"
					class="bg-layer-surface rounded-lg overflow-hidden shadow-md"
				>
					<!-- 레벨 헤더 -->
					<div
						class="bg-layer-overlay p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center"
					>
						<h3 class="text-xl font-bold text-game-primary mb-2 sm:mb-0">
							{{ level.name }}
						</h3>
						<div class="flex flex-col sm:flex-row sm:items-center">
							<span class="text-game-secondary text-sm mr-2"
								>좌표: ({{ level.xcoord }}, {{ level.ycoord }})</span
							>
							<span class="text-game-primary text-sm"
								>레벨: {{ level.level }}</span
							>
						</div>
					</div>

					<div class="p-4 sm:p-6">
						<!-- 레벨 이미지 및 정보 -->
						<div class="flex flex-col md:flex-row gap-4 sm:gap-6 mb-6">
							<div class="w-full md:w-1/3">
								<NuxtLink :to="`/map/${level.id}`" class="block">
									<NuxtImg
										:src="`https://evfuckbgifbr27188584.gcdn.ntruss.com/map/${level.images}`"
										:alt="level.name"
										class="w-full h-48 sm:h-64 object-cover rounded-lg"
									/>
								</NuxtLink>
							</div>
							<div class="w-full md:w-2/3">
								<p class="text-game-secondary mb-4">{{ level.information }}</p>
							</div>
						</div>

						<!-- 몬스터 리스트 -->
						<div class="overflow-x-auto">
							<table class="w-full">
								<thead>
									<tr class="bg-layer-overlay">
										<th class="p-2 text-left">몬스터</th>
										<th class="p-2 text-left">경험치</th>
										<th class="p-2 text-left">드롭 아이템</th>
									</tr>
								</thead>
								<tbody>
									<tr
										v-for="(monsterData, index) in level.monsters"
										:key="index"
										class="border-b border-border-primary"
									>
										<td class="p-2">
											<NuxtLink
												:to="`/monster/${monsterData.monster.id}`"
												class="flex items-center gap-2 hover:text-game-legendary"
											>
												<NuxtImg
													:src="`https://evfuckbgifbr27188584.gcdn.ntruss.com/monster/${monsterData.monster.images}`"
													:alt="monsterData.monster.name"
													class="w-8 h-8 sm:w-10 sm:h-10 object-contain"
												/>
												<span class="text-sm sm:text-base">{{
													monsterData.monster.name
												}}</span>
											</NuxtLink>
										</td>
										<td class="p-2 text-sm sm:text-base">
											{{ monsterData.monster.exp }}
										</td>
										<td class="p-2">
											<div class="flex flex-wrap gap-1 sm:gap-2">
												<NuxtLink
													v-for="drop in monsterData.monster.dropItems"
													:key="drop.item.id"
													:to="`/item/${drop.item.id}`"
													class="flex items-center gap-1 bg-layer-overlay p-1 rounded hover:bg-opacity-80 transition-all text-xs sm:text-sm"
												>
													<NuxtImg
														:src="`https://evfuckbgifbr27188584.gcdn.ntruss.com/item/${drop.item.images}`"
														:alt="drop.item.name"
														class="w-4 h-4 sm:w-6 sm:h-6 object-contain"
													/>
													<span>{{ drop.item.name }}</span>
													<span class="text-game-secondary"
														>({{ drop.item.price }}전)</span
													>
												</NuxtLink>
											</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import type { MapLevel } from '~/types/map';

// 탭 설정 정의
const tabs = [
	{ id: 1, name: '초급사냥터' },
	{ id: 2, name: '중급사냥터' },
	{ id: 3, name: '고급사냥터' },
	// { id: 4, name: '길림성' },
	// { id: 5, name: '일본' },
	// { id: 6, name: '용궁' },
	// { id: 7, name: '중국' },
	// { id: 8, name: '도삭산' },
	// { id: 9, name: '중국남부' },
	// { id: 10, name: '4차신전' },
	// { id: 11, name: '환상의섬' },
	// { id: 12, name: '12지신' },
	// { id: 13, name: '북방대초원' },
];

const activeTab = ref(1);

// API 호출 함수
const fetchLevelData = async (range: number) => {
	return await $fetch(`/api/map/level-guide?range=${range}`);
};

// 초기 데이터 로드 및 탭 변경시 데이터 갱신
const { data: groupedLevels } = await useAsyncData(
	'map-level',
	() => fetchLevelData(activeTab.value),
	{
		watch: [activeTab],
	}
);

// SEO 메타 설정
useSeoMeta({
	title: `바람위키 | 맵 레벨 가이드 - ${tabs[activeTab.value - 1].name}`,
	description: `바람의 나라 맵 레벨 가이드 - ${tabs[activeTab.value - 1].name}`,
});
</script>

<style lang="scss" scoped>
// 스타일은 대부분 Tailwind 클래스로 대체되어 필요한 경우에만 추가
</style>
