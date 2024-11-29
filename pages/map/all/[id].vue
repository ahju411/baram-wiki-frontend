<template>
	<div class="max-w-7xl mx-auto px-4 py-8">
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

		<!-- 로딩 상태 -->
		<div v-if="isLoading" class="text-center py-12">
			<div class="loading-spinner"></div>
			<p class="text-game-secondary mt-4">맵 정보를 불러오는 중...</p>
		</div>

		<!-- 데이터가 있을 때만 표시 -->
		<template v-if="mapData">
			<!-- 제목과 토글 버튼 -->
			<div class="flex items-center justify-center gap-4 mb-6">
				<h1 class="text-2xl font-bold text-game-legendary">
					{{ mapData.name }}
				</h1>
				<div class="flex bg-layer-surface rounded-lg p-1">
					<button
						@click="displayMode = 'map'"
						:class="[
							'px-4 py-2 rounded transition-colors',
							displayMode === 'map'
								? 'bg-layer-overlay text-game-legendary'
								: 'text-game-primary hover:bg-layer-overlay/50',
						]"
					>
						맵 정보
					</button>
					<button
						@click="displayMode = 'npc'"
						:class="[
							'px-4 py-2 rounded transition-colors',
							displayMode === 'npc'
								? 'bg-layer-overlay text-game-legendary'
								: 'text-game-primary hover:bg-layer-overlay/50',
						]"
					>
						NPC 정보
					</button>
				</div>
			</div>

			<!-- 맵 이미지와 마커 표시 영역 -->
			<div class="relative mb-8">
				<!-- 이미지 컨테이너 추가 -->
				<div
					class="max-h-[800px] overflow-hidden flex justify-center items-center"
				>
					<NuxtImg
						v-if="mapData.id"
						:src="`https://evfuckbgifbr27188584.gcdn.ntruss.com/map/${mapData.id}.png`"
						:alt="mapData.name"
						:width="800"
						:height="800"
						class="w-full h-full object-contain rounded-lg"
						loading="lazy"
						placeholder
						format="webp"
					/>
				</div>

				<!-- 포트 마커 (맵 모드일 때만 표시) -->
				<template v-if="displayMode === 'map'">
					<div
						v-for="port in ports"
						:key="port.id"
						:style="{
							position: 'absolute',
							left: `${(parseInt(port.f_xaxis) / mapData.width) * 100}%`,
							top: `${(parseInt(port.f_yaxis) / mapData.height) * 100}%`,
						}"
						class="group cursor-pointer"
						@click="navigateToPort(port.b_map_id)"
					>
						<!-- 기본 네임택 -->
						<div
							class="absolute bottom-0 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
						>
							<div
								class="bg-layer-surface px-3 py-1.5 rounded-lg text-sm text-game-primary shadow-lg group-hover:hidden"
							>
								{{ port.b_name }}
								<div
									class="absolute w-3 h-3 bg-layer-surface transform rotate-45 left-1/2 -translate-x-1/2 -bottom-1.5"
								></div>
							</div>
						</div>
						<!-- Hover 시 확장된 네임택 -->
						<div
							class="absolute bottom-0 left-1/2 transform -translate-x-1/2 whitespace-nowrap hidden group-hover:block"
						>
							<div
								class="bg-layer-surface px-3 py-1.5 rounded-lg text-sm text-game-primary shadow-lg"
							>
								<div class="font-bold">{{ port.b_name }}</div>
								<div class="text-xs text-game-secondary">
									좌표: ({{ port.f_xaxis }}, {{ port.f_yaxis }})
								</div>
								<div
									class="absolute w-3 h-3 bg-layer-surface transform rotate-45 left-1/2 -translate-x-1/2 -bottom-1.5"
								></div>
							</div>
						</div>
					</div>
				</template>

				<!-- NPC 마커 (NPC 모드일 때만 표시) -->
				<template v-else>
					<div
						v-for="npc in npcs"
						:key="npc.id"
						:style="{
							position: 'absolute',
							left: `${(parseInt(npc.x_coord) / mapData.width) * 100}%`,
							top: `${(parseInt(npc.y_coord) / mapData.height) * 100}%`,
						}"
						class="group"
					>
						<!-- 기본 네임택 -->
						<div
							class="absolute bottom-0 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
						>
							<div
								class="bg-layer-surface px-3 py-1.5 rounded-lg text-sm text-game-primary shadow-lg group-hover:hidden"
							>
								{{ npc.npc_name }}
								<div
									class="absolute w-3 h-3 bg-layer-surface transform rotate-45 left-1/2 -translate-x-1/2 -bottom-1.5"
								></div>
							</div>
						</div>
						<!-- Hover 시 확장된 네임택 -->
						<div
							class="absolute bottom-0 left-1/2 transform -translate-x-1/2 whitespace-nowrap hidden group-hover:block"
						>
							<div
								class="bg-layer-surface px-3 py-1.5 rounded-lg text-sm text-game-primary shadow-lg"
							>
								<div class="font-bold">{{ npc.npc_name }}</div>
								<div class="text-xs text-game-secondary">
									좌표: ({{ npc.x_coord }}, {{ npc.y_coord }})
								</div>
								<div
									class="absolute w-3 h-3 bg-layer-surface transform rotate-45 left-1/2 -translate-x-1/2 -bottom-1.5"
								></div>
							</div>
						</div>
					</div>
				</template>
			</div>

			<!-- 하단 리스트 섹션 -->
			<div v-if="displayMode === 'map'" class="bg-layer-surface rounded-lg p-6">
				<div class="flex items-center justify-between mb-4">
					<h2 class="text-xl font-bold">이동 가능한 포트</h2>
					<!-- 검색창 추가 -->
					<div class="relative">
						<input
							v-model="searchQuery"
							type="text"
							placeholder="포트 검색..."
							class="px-4 py-2 bg-layer-overlay rounded-lg text-game-primary focus:outline-none focus:ring-2 focus:ring-game-legendary"
						/>
					</div>
				</div>

				<div v-if="filteredPorts.length" class="space-y-4">
					<div
						v-for="port in filteredPorts"
						:key="port.id"
						class="flex items-center justify-between p-4 bg-layer-overlay rounded-lg hover:bg-layer-overlay/80 transition-colors"
					>
						<div class="flex items-center gap-4">
							<div class="text-game-secondary">
								좌표: ({{ port.f_xaxis }}, {{ port.f_yaxis }})
							</div>
							<div class="text-game-primary">{{ port.b_name }}</div>
						</div>
						<NuxtLink
							:to="`/map/all/${port.b_map_id}`"
							class="px-4 py-2 bg-layer-surface text-game-legendary rounded hover:bg-layer-overlay transition-colors"
						>
							이동
						</NuxtLink>
					</div>
				</div>
				<div v-else class="text-game-secondary text-center py-4">
					{{
						ports.length
							? '검색 결과가 없습니다.'
							: '이동 가능한 포트가 없습니다.'
					}}
				</div>
			</div>
			<div v-else class="bg-layer-surface rounded-lg p-6">
				<!-- NPC 리스트 -->
				<h2 class="text-xl font-bold mb-4">NPC 목록</h2>
				<div class="space-y-4">
					<div
						v-for="npc in npcs"
						:key="npc.id"
						class="flex items-center justify-between p-4 bg-layer-overlay rounded-lg"
					>
						<div class="flex items-center gap-4">
							<div class="text-game-secondary">
								좌표: ({{ npc.x_coord }}, {{ npc.y_coord }})
							</div>
							<div class="text-game-primary">{{ npc.npc_name }}</div>
						</div>
					</div>
				</div>
			</div>
		</template>

		<!-- 에러 상태 -->
		<div
			v-else-if="!isLoading && !mapData"
			class="text-center py-12 text-game-secondary"
		>
			맵 정보를 불러올 수 없습니다.
		</div>
	</div>
</template>

<script lang="ts" setup>
const route = useRoute();
const { data, isLoading } = useLazyAsyncData('map-detail', () =>
	$fetch(`/api/map/all/${route.params.id}`)
);

// 최근 방문 맵 상태
const recentMaps = ref([]);

// 데이터 구조 변환
const mapData = computed(() => {
	if (!data.value) return null;
	const { length, ...mapInfo } = data.value;
	return mapInfo;
});

const ports = computed(() => {
	if (!data.value?.ForwardPorts) return [];
	return data.value.ForwardPorts;
});

// 데이터 확인용 로그
watchEffect(() => {
	if (data.value) {
		console.log('Map Data:', mapData.value);
		console.log('Ports:', ports.value);
	}
});

// 검색 기능 추가
const searchQuery = ref('');
const filteredPorts = computed(() => {
	if (!searchQuery.value) return ports.value;
	const query = searchQuery.value.toLowerCase();
	return ports.value.filter(
		(port) =>
			port.b_name.toLowerCase().includes(query) ||
			`${port.f_xaxis},${port.f_yaxis}`.includes(query)
	);
});

// 포트 이동 함수
const router = useRouter();
const navigateToPort = (mapId: string) => {
	router.push(`/map/all/${mapId}`);
};

// 표시 모드 상태
const displayMode = ref<'map' | 'npc'>('map');

// NPC 데이터
const npcs = computed(() => {
	if (!data.value?.Npcs) return [];
	return data.value.Npcs;
});

// 방문 기록 관리
onMounted(() => {
	// 최근 방문 기록 불러오기
	const stored = localStorage.getItem('recentMaps') || '[]';
	recentMaps.value = JSON.parse(stored);

	// 현재 맵 데이터가 있을 때 방문 기록 추가
	watchEffect(() => {
		if (mapData.value) {
			const newRecent = recentMaps.value.filter(
				(m) => m.id !== mapData.value.id
			);

			console.log(mapData.value);
			newRecent.unshift({
				id: mapData.value.id,
				name: mapData.value.name,
			});

			recentMaps.value = newRecent.slice(0, 10);
			localStorage.setItem('recentMaps', JSON.stringify(recentMaps.value));
		}
	});
});
</script>

<style scoped>
.group {
	z-index: 1;
}

.group:hover {
	z-index: 50;
}
</style>
