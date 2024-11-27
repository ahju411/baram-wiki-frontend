<template>
	<div class="main-container">
		<!-- 배경 파티클 효과 유지 -->
		<div class="particles">
			<div v-for="n in 20" :key="n" class="particle"></div>
		</div>

		<!-- 메인 컨텐츠 -->
		<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
			<!-- 중앙 로고 및 검색 섹션 -->
			<div class="text-center mb-12">
				<!-- 로고 이미지 -->
				<div class="mb-8">
					<h1 class="text-3xl sm:text-4xl font-bold text-game-legendary mt-4">
						바람위키
					</h1>
					<p class="text-game-secondary mt-2">
						바람의나라 클래식 게임 정보 모음
					</p>
				</div>

				<!-- 검색창 -->
				<div class="max-w-2xl mx-auto relative">
					<div class="relative">
						<input
							type="text"
							v-model="keyword"
							@input="handleInput"
							@keydown.esc="keyword = ''"
							@keydown.up="handleKeyDown"
							@keydown.down="handleKeyDown"
							@keydown.enter="handleEnter"
							placeholder="아이템 이름을 검색하세요"
							class="w-full px-4 py-3 bg-layer-overlay border border-border-light rounded-lg focus:outline-none focus:border-game-legendary text-game-primary placeholder-game-secondary"
						/>
						<button
							class="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-layer-surface text-game-primary rounded hover:text-game-legendary transition-colors"
							@click="handleEnter"
						>
							검색
						</button>
					</div>

					<!-- 검색 결과 -->
					<div
						v-show="keyword"
						class="absolute left-0 right-0 mt-1 bg-layer-surface border border-border-light rounded-lg shadow-lg z-50"
					>
						<div class="max-h-60 overflow-y-auto divide-y divide-border-light">
							<template v-if="isLoading">
								<div class="p-4 text-center text-game-secondary">
									<div class="loading-spinner"></div>
									<span>검색 중...</span>
								</div>
							</template>
							<template v-else>
								<div
									v-for="(result, index) in filteredResults"
									:key="result.id"
									:class="[
										'p-3 hover:bg-layer-overlay cursor-pointer',
										{ 'bg-layer-overlay': index === resultIndex },
									]"
									@click="handleItemClick(result)"
									@mouseenter="resultIndex = index"
								>
									<div class="flex items-center gap-3">
										<NuxtImg
											:src="`https://evfuckbgifbr27188584.gcdn.ntruss.com/${result.type}/${result.image}`"
											:alt="result.name"
											class="w-10 h-10 object-contain"
										/>
										<div>
											<div class="text-sm text-game-legendary text-start">
												{{
													result.type === 'item'
														? '아이템'
														: result.type === 'map'
														? '맵'
														: '몬스터'
												}}
											</div>
											<div class="font-medium">{{ result.name }}</div>
										</div>
									</div>
								</div>
							</template>
						</div>
					</div>

					<!-- 실시간 인기 검색어 -->
					<div
						v-if="!isLoadingPopular && popularItems?.length"
						class="mt-6 inline-flex flex-col sm:flex-row items-center gap-4 bg-layer-surface rounded-lg px-6 py-4"
					>
						<span class="text-sm text-game-secondary whitespace-nowrap"
							>실시간 인기 검색</span
						>
						<div class="flex flex-wrap justify-center gap-4">
							<NuxtLink
								v-for="(item, index) in popularItems.slice(0, 5)"
								:key="item.item_id"
								:to="`/item/${item.item_id}`"
								class="flex items-center gap-2"
							>
								<span
									:class="[
										'font-bold',
										index < 3 ? 'text-game-legendary' : 'text-game-secondary',
									]"
									>{{ index + 1 }}</span
								>
								<span class="text-sm hover:text-game-hover">{{
									item.name
								}}</span>
							</NuxtLink>
						</div>
					</div>
				</div>
			</div>
			<div class="bg-layer-surface rounded-lg p-6">
				<h2 class="text-xl font-bold mb-4">최근 업데이트</h2>
				<div class="space-y-4">
					<a href="info-detail.html">
						<div
							class="flex items-center gap-4 hover:bg-layer-overlay transition-colors"
						>
							<div
								class="bg-layer-overlay px-2 py-1 rounded text-sm text-game-secondary whitespace-nowrap"
							>
								11/26
							</div>
							<div>
								<p class="text-sm">새로운 아이템 30종이 추가되었습니다.</p>
							</div>
						</div>
					</a>
					<div class="flex items-center gap-4">
						<div
							class="bg-layer-overlay px-2 py-1 rounded text-sm text-game-secondary whitespace-nowrap"
						>
							11/25
						</div>
						<div>
							<p class="text-sm">경험치 계산기가 업데이트 되었습니다.</p>
						</div>
					</div>
					<div class="flex items-center gap-4">
						<div
							class="bg-layer-overlay px-2 py-1 rounded text-sm text-game-secondary whitespace-nowrap"
						>
							11/24
						</div>
						<div>
							<p class="text-sm">레벨별 맵 정보가 추가되었습니다.</p>
						</div>
					</div>
				</div>
			</div>
		</main>
	</div>
</template>

<script setup lang="ts">
import type { Search } from '~/types/search';
import type { PopularItem } from '~/types/popularItem';

// 1. 상태 관리 (State Management)
const keyword = ref('');
const results = ref<Search[]>([]);
const isLoading = ref(false);
const resultIndex = ref(0);
const searchInput = ref<HTMLInputElement | null>(null);
const isKeyboardVisible = ref(false);
let prevVisualViewport = 0;

// 인기 아이템 상태 추가 및 API 호출 부분 수정
const { data: popularItems, pending: isLoadingPopular } = await useAsyncData<
	PopularItem[]
>('popularItems', () => $fetch('/api/search/popular-items'));

// 3. Computed Properties
const hasResults = computed(() => results.value.length > 0);

const isIOS = computed(
	() =>
		/iPad|iPhone|iPod/.test(navigator?.userAgent) ||
		(navigator?.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
);

const isSearching = computed(() =>
	Boolean(keyword.value && window.innerWidth <= 768)
);

const filteredResults = computed(() => {
	if (!window?.innerWidth || window.innerWidth > 768) return results.value;

	return [...results.value]
		.sort((a, b) => {
			const aExact = a.name === keyword.value ? -1 : 0;
			const bExact = b.name === keyword.value ? -1 : 0;
			return aExact - bExact;
		})
		.slice(0, 5);
});

// 4. 검색 관련 함수 (Search Functions)
const handleInput = (e: Event) => {
	keyword.value = (e.target as HTMLInputElement).value;
	if (!keyword.value) {
		results.value = [];
		return;
	}

	if (isIOS.value && keyword.value.length === 1) {
		scrollToSearchContainer();
	}
};

const handleKeyDown = (e: KeyboardEvent) => {
	if (!hasResults.value) return;

	if (e.key === 'ArrowUp') {
		e.preventDefault();
		resultIndex.value =
			resultIndex.value <= 0 ? results.value.length - 1 : resultIndex.value - 1;
	} else if (e.key === 'ArrowDown') {
		e.preventDefault();
		resultIndex.value =
			resultIndex.value >= results.value.length - 1 ? 0 : resultIndex.value + 1;
	}

	document
		.querySelector(`[data-index="${resultIndex.value}"]`)
		?.scrollIntoView({ block: 'nearest' });
};

const handleEnter = () => {
	if (hasResults.value && results.value[resultIndex.value]) {
		const selectedResult = results.value[resultIndex.value];
		resetSearchState();
		navigateTo(`/${selectedResult.type}/${selectedResult.id}`);
	}
};

const handleItemClick = (result: Search) => {
	resetSearchState();
	navigateTo(`/${result.type}/${result.id}`);
};

// 5. 유틸리티 함수 (Utility Functions)
const resetSearchState = () => {
	keyword.value = '';
	results.value = [];
	resultIndex.value = 0;
	isKeyboardVisible.value = false;
};

const scrollToSearchContainer = () => {
	setTimeout(() => {
		const searchContainer = document.querySelector('.search-container');
		if (searchContainer) {
			const containerRect = searchContainer.getBoundingClientRect();
			const scrollTop = window.pageYOffset + containerRect.top - 20;
			window.scrollTo({ top: scrollTop, behavior: 'smooth' });
		}
	}, 100);
};

const handleVisualViewportResize = () => {
	if (!window?.visualViewport) return;

	const currentVisualViewport = window.visualViewport.height;
	const windowHeight = window.innerHeight;
	const newKeyboardVisible = isIOS.value
		? currentVisualViewport !== windowHeight
		: currentVisualViewport < windowHeight * 0.8;

	if (newKeyboardVisible !== isKeyboardVisible.value && keyword.value) {
		isKeyboardVisible.value = newKeyboardVisible;
		if (isKeyboardVisible.value) {
			isIOS.value
				? setTimeout(scrollToSearchContainer, 100)
				: scrollToSearchContainer();
		}
	}

	prevVisualViewport = currentVisualViewport;
};

// 6. 라이프사이클 훅 (Lifecycle Hooks)
onMounted(async () => {
	searchInput.value?.focus();
	if (window?.visualViewport) {
		prevVisualViewport = window.visualViewport.height;
		window.visualViewport.addEventListener(
			'resize',
			handleVisualViewportResize
		);
		window.addEventListener('resize', handleVisualViewportResize);
	}
});

onUnmounted(() => {
	if (window?.visualViewport) {
		window.visualViewport.removeEventListener(
			'resize',
			handleVisualViewportResize
		);
		window.removeEventListener('resize', handleVisualViewportResize);
	}
});

// 7. 검색 API 호출 (API Calls)
watchEffect(async () => {
	if (!keyword.value) {
		results.value = [];
		return;
	}

	isLoading.value = true;
	try {
		const { results: searchResults } = await $fetch<{ results: Search[] }>(
			`/api/search/${encodeURIComponent(keyword.value)}`
		);
		results.value = searchResults;
	} catch (error) {
		console.error('검색 중 오류 발생:', error);
		results.value = [];
	} finally {
		isLoading.value = false;
	}
});
</script>

<style scoped lang="scss">
@use '@/assets/main.scss';

.keyword-chip {
	display: inline-flex;
	align-items: center;
	padding: 0.5rem 1rem;
	margin: 0.25rem;
	background: #f8f9fa;
	border-radius: 20px;
	text-decoration: none;
	color: #495057;
	font-size: 0.9rem;
	transition: all 0.2s ease;

	&:hover {
		background: #e9ecef;
	}

	.rank {
		margin-right: 0.5rem;
		font-weight: bold;
		color: #ff6b6b;
	}
}

.keyword-list {
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
	margin-top: 1rem;
}
</style>
