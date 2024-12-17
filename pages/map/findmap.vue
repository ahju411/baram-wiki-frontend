<template>
	<div class="max-w-7xl mx-auto px-4 py-8 min-h-screen">
		<!-- 안내 문구 -->
		<div class="mb-6 text-center text-game-secondary">
			<p class="text-lg">
				제시되는 경로는 참고용이며, 실제와 다를 수 있습니다.
				<br />여러 경로 중 여러분의 상황에 가장 적합한 길을 선택하여 여정을
				떠나보세요! <br />*경로를 선택할 경우 가장 첫번째 경로로 이동됩니다!*
			</p>
		</div>

		<!-- 검색 폼 -->
		<div class="bg-layer-surface rounded-lg p-6 mb-6">
			<div class="flex flex-col md:flex-row gap-4">
				<!-- 출발지 검색 -->
				<div class="flex-1 relative">
					<input
						v-model="startPoint"
						type="text"
						placeholder="출발지를 입력하세요"
						class="w-full px-4 py-2 bg-layer-overlay rounded-lg text-game-primary focus:outline-none focus:ring-2 focus:ring-game-legendary"
						@input="(e) => searchMapNames('start', e)"
						@keydown.down="navigateSuggestions('start', 1)"
						@keydown.up="navigateSuggestions('start', -1)"
						@keydown.enter="selectSuggestion('start')"
						@blur="hideSuggestionsDelayed('start')"
					/>
					<!-- 출발지 검색 제안 -->
					<div
						v-if="showStartSuggestions && startSuggestions.length > 0"
						class="absolute z-50 w-full mt-1 bg-layer-surface rounded-lg shadow-lg"
					>
						<div
							v-for="(suggestion, index) in startSuggestions"
							:key="index"
							:class="[
								'px-4 py-2 cursor-pointer hover:bg-layer-overlay',
								selectedStartIndex === index ? 'bg-layer-overlay' : '',
							]"
							@mousedown="selectMapName('start', suggestion)"
						>
							{{ suggestion }}
						</div>
					</div>
				</div>

				<!-- 도착지 검색 -->
				<div class="flex-1 relative">
					<input
						v-model="endPoint"
						type="text"
						placeholder="도착지를 입력하세요"
						class="w-full px-4 py-2 bg-layer-overlay rounded-lg text-game-primary focus:outline-none focus:ring-2 focus:ring-game-legendary"
						@input="(e) => searchMapNames('end', e)"
						@keydown.down="navigateSuggestions('end', 1)"
						@keydown.up="navigateSuggestions('end', -1)"
						@keydown.enter="handleEndPointEnter"
						@blur="hideSuggestionsDelayed('end')"
					/>
					<!-- 도착지 검색 제안 -->
					<div
						v-if="showEndSuggestions && endSuggestions.length > 0"
						class="absolute z-50 w-full mt-1 bg-layer-surface rounded-lg shadow-lg"
					>
						<div
							v-for="(suggestion, index) in endSuggestions"
							:key="index"
							:class="[
								'px-4 py-2 cursor-pointer hover:bg-layer-overlay',
								selectedEndIndex === index ? 'bg-layer-overlay' : '',
							]"
							@mousedown="selectMapName('end', suggestion)"
						>
							{{ suggestion }}
						</div>
					</div>
				</div>

				<button
					ref="searchButton"
					@click="searchRoutes"
					class="px-6 py-2 bg-layer-overlay text-game-legendary rounded-lg hover:bg-opacity-80 transition-colors"
				>
					길찾기
				</button>
			</div>
		</div>

		<!-- 검색 결과 -->
		<div v-if="routes.length > 0" class="space-y-6">
			<div class="text-game-secondary mb-4">
				총 {{ routes.length }}개의 경로를 찾았습니다
			</div>

			<div
				v-for="route in routes"
				:key="route.route_number"
				class="bg-layer-surface rounded-lg p-6 hover:bg-layer-overlay transition-colors cursor-pointer"
				@click="selectRoute(route)"
			>
				<div class="flex justify-between items-center mb-4">
					<div class="flex items-center gap-4">
						<span class="text-2xl font-bold text-game-legendary"
							>경로 {{ route.route_number }}</span
						>
						<div
							class="px-3 py-1 bg-layer-overlay rounded-full text-game-secondary"
						>
							{{ route.steps }} 단계
						</div>
					</div>
				</div>

				<div
					class="flex items-center gap-2"
					style="flex-wrap: wrap; align-items: flex-start"
				>
					<template v-for="(step, index) in route.path" :key="index">
						<div class="flex items-center mb-2">
							<span class="text-game-primary">{{ step.name }}</span>
							<template v-if="index < route.path.length - 1">
								<svg
									class="w-5 h-5 mx-2 text-game-secondary"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 5l7 7-7 7"
									/>
								</svg>
							</template>
						</div>
					</template>
				</div>
			</div>
		</div>

		<!-- 검색 결과 없음 또는 에러 메시지 -->
		<div v-if="showNoResults" class="text-center py-12">
			<p class="text-game-secondary text-3xl">검색된 경로가 없습니다.</p>
			<p class="text-game-secondary mt-2 text-xl">다른 지역을 검색해보세요.</p>
		</div>

		<!-- 로딩 상태 -->
		<div v-if="isLoading" class="text-center py-12">
			<div class="loading-spinner"></div>
			<p class="text-game-secondary mt-4">경로를 검색하는 중...</p>
		</div>
	</div>
</template>

<script lang="ts" setup>
const startPoint = ref('');
const endPoint = ref('');
const routes = ref([]);
const isLoading = ref(false);
const searchButton = ref<HTMLButtonElement | null>(null);

// 검색 제안 관련 상태
const startSuggestions = ref<string[]>([]);
const endSuggestions = ref<string[]>([]);
const showStartSuggestions = ref(false);
const showEndSuggestions = ref(false);
const selectedStartIndex = ref(-1);
const selectedEndIndex = ref(-1);

const showNoResults = ref(false);

// 맵 이름 검색 함수
const searchMapNames = async (type: 'start' | 'end', e: Event) => {
	const searchTerm = (e.target as HTMLInputElement).value;
	if (searchTerm.length < 1) {
		if (type === 'start') {
			startSuggestions.value = [];
			showStartSuggestions.value = false;
			selectedStartIndex.value = -1;
		} else {
			endSuggestions.value = [];
			showEndSuggestions.value = false;
			selectedEndIndex.value = -1;
		}
		return;
	}

	try {
		const { data: response } = await useAsyncData<string[]>(
			`mapSearch-${type}-${searchTerm}`,
			() => $fetch('/api/map/search', { params: { keyword: searchTerm } })
		);

		if (type === 'start') {
			startSuggestions.value = response.value || [];
			showStartSuggestions.value = true;
		} else {
			endSuggestions.value = response.value || [];
			showEndSuggestions.value = true;
		}
	} catch (error) {
		console.error('맵 검색 실패:', error);
	}
};

// 제안 목록 네비게이션
const navigateSuggestions = (type: 'start' | 'end', direction: number) => {
	const suggestions =
		type === 'start' ? startSuggestions.value : endSuggestions.value;
	const currentIndex =
		type === 'start' ? selectedStartIndex.value : selectedEndIndex.value;

	let newIndex = currentIndex + direction;
	if (newIndex < 0) newIndex = suggestions.length - 1;
	if (newIndex >= suggestions.length) newIndex = 0;

	if (type === 'start') {
		selectedStartIndex.value = newIndex;
	} else {
		selectedEndIndex.value = newIndex;
	}
};

// 제안 선택
const selectSuggestion = (type: 'start' | 'end') => {
	const suggestions =
		type === 'start' ? startSuggestions.value : endSuggestions.value;
	const selectedIndex =
		type === 'start' ? selectedStartIndex.value : selectedEndIndex.value;

	if (selectedIndex >= 0 && suggestions[selectedIndex]) {
		selectMapName(type, suggestions[selectedIndex]);
	}
};

// 맵 이름 선택
const selectMapName = (type: 'start' | 'end', name: string) => {
	if (type === 'start') {
		startPoint.value = name;
		showStartSuggestions.value = false;
	} else {
		endPoint.value = name;
		showEndSuggestions.value = false;
	}
};

// 제안 숨기기 (딜레이 적용)
const hideSuggestionsDelayed = (type: 'start' | 'end') => {
	setTimeout(() => {
		if (type === 'start') {
			showStartSuggestions.value = false;
		} else {
			showEndSuggestions.value = false;
		}
	}, 200);
};

// 도착지 엔터 키 처리
const handleEndPointEnter = () => {
	if (showEndSuggestions.value && selectedEndIndex.value >= 0) {
		selectSuggestion('end');
	} else if (startPoint.value && endPoint.value) {
		searchButton.value?.click();
	}
};

const searchRoutes = async () => {
	if (!startPoint.value || !endPoint.value) return;

	isLoading.value = true;
	showNoResults.value = false;

	try {
		const response = await $fetch('/api/map/path', {
			params: {
				start_name: startPoint.value,
				end_name: endPoint.value,
			},
		});

		routes.value = response.paths;
		showNoResults.value = !response.paths || response.paths.length === 0;
	} catch (error) {
		console.error('경로 검색 실패:', error);
		routes.value = [];
		showNoResults.value = true;
	} finally {
		isLoading.value = false;
	}
};

const router = useRouter();
const selectRoute = (route) => {
	// 첫 번째 맵의 ID로 이동
	if (route.path && route.path.length > 0) {
		const firstMapId = route.path[0].id;
		router.push(`/map/all/${firstMapId}`);
	}
};
</script>

<style scoped>
.loading-spinner {
	/* ... existing spinner styles ... */
}
</style>
