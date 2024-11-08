# index.vue
<template>
	<div class="main-container">
		<!-- 배경 파티클 효과 유지 -->
		<div class="particles">
			<div v-for="n in 20" :key="n" class="particle"></div>
		</div>

		<div class="content-wrapper">
			<!-- 공지사항 섹션 추가 -->
			<section class="notice-section">
				<div class="notice-container">
					<span class="notice-badge">공지</span>
					<div class="notice-content">
						<span class="notice-text">바람위키에 오신 것을 환영합니다!</span>
						<span class="notice-date">2024.11.08</span>
					</div>
				</div>
			</section>

			<!-- 메인 검색 섹션 -->
			<section class="search-section">
				<h1 class="main-title">바람위키</h1>
				<p class="search-description">아이템, 스킬 정보를 검색해보세요</p>

				<div class="search-container" :class="{ 'is-searching': isSearching }">
					<input
						type="text"
						class="search-input"
						placeholder="검색어를 입력하세요 (예: 천의무봉검, 돌격진)"
						v-model="keyword"
						@input="handleInput"
						@keydown.esc="keyword = ''"
						@keydown.up="handleKeyDown"
						@keydown.down="handleKeyDown"
						@keydown.enter="handleEnter"
					/>
					<button class="search-button">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<circle cx="11" cy="11" r="8"></circle>
							<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
						</svg>
					</button>
				</div>

				<div v-show="keyword" class="search-results-container">
					<div
						class="search-results-backdrop"
						@click="closeSearchResults"
					></div>
					<div class="search-results">
						<template v-if="isLoading">
							<div class="search-loading">
								<div class="loading-spinner"></div>
								<span>검색 중...</span>
							</div>
						</template>
						<template v-else>
							<ul v-if="filteredResults.length > 0" class="search-results-list">
								<li
									v-for="(result, index) in filteredResults"
									:key="result.id"
									:class="[
										'search-result-item',
										{ 'search-result-item--active': index === resultIndex },
									]"
									@click="handleItemClick(result)"
									@mouseenter="resultIndex = index"
								>
									<div class="result-icon">
										<NuxtImg
											:src="`/images/${result.type}/${result.image}`"
											:alt="result.name"
											class="result-icon-img"
										/>
									</div>
									<div class="result-info">
										<div class="result-type">
											{{
												result.type === 'item'
													? '아이템'
													: result.type === 'map'
													? '맵'
													: '몬스터'
											}}
										</div>
										<div class="result-name">{{ result.name }}</div>
										<div class="result-description" v-if="result.description">
											{{ result.description }}
										</div>
									</div>
									<div class="result-shortcut" v-if="index === resultIndex">
										Enter를 눌러 이동
									</div>
								</li>
							</ul>
							<div v-else-if="keyword && !isLoading" class="search-no-results">
								<div class="no-results-icon">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
									>
										<circle cx="12" cy="12" r="10"></circle>
										<line x1="12" y1="8" x2="12" y2="12"></line>
										<line x1="12" y1="16" x2="12" y2="16"></line>
									</svg>
								</div>
								<p>'{{ keyword }}'에 대한 검색 결과가 없습니다</p>
								<ul class="search-suggestions">
									<li>다른 검색어를 입력해보세요</li>
									<li>맞춤법을 확인해보세요</li>
									<li>더 일반적인 검색어를 사용해보세요</li>
								</ul>
							</div>
						</template>
					</div>
				</div>

				<!-- 실시간 인기 검색어 -->
				<div class="trending-searches" v-if="trendingKeywords.length">
					<h3 class="trending-title">실시간 인기 검색어</h3>
					<div class="keyword-list">
						<NuxtLink
							v-for="keyword in trendingKeywords"
							:key="keyword.id"
							class="keyword-chip"
							:to="`/${keyword.type}/${keyword.id}`"
							as="button"
						>
							{{ keyword.name }}
						</NuxtLink>
					</div>
				</div>

				<!-- 최근 업데이트 정보 -->
				<div v-if="recentUpdates.length" class="recent-updates">
					<h3 class="section-title">최근 업데이트 hi</h3>
					<div class="updates-grid">
						<NuxtLink
							v-for="update in recentUpdates"
							:key="update.id"
							:to="`/${update.type}/${update.id}`"
							class="update-card"
						>
							<NuxtImg
								:src="`/images/${update.type}/${update.images}`"
								:alt="update.name"
								class="update-image"
							/>
							<div class="update-info">
								<h4>{{ update.name }}</h4>
								<p>{{ update.desc }}</p>
							</div>
						</NuxtLink>
					</div>
				</div>
			</section>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { Search } from '~/types/search';

// 1. 상태 관리 (State Management)
const keyword = ref('');
const results = ref<Search[]>([]);
const isLoading = ref(false);
const resultIndex = ref(0);
const searchInput = ref<HTMLInputElement | null>(null);
const isKeyboardVisible = ref(false);
let prevVisualViewport = 0;

// 2. 정적 데이터 (Static Data)
const trendingKeywords = ref([
	{ id: 'I627884', name: '도토리', type: 'item' },
	{ id: 'MO110645', name: '다람쥐', type: 'monster' },
	{ id: 'MO181712', name: '토끼', type: 'monster' },
]);

const recentUpdates = ref([
	{
		id: 'I091985',
		name: '목검',
		type: 'item',
		desc: '신규 아이템이 추가되었습니다.',
		images: 'I091985.png',
	},

	{
		id: 'I018598',
		name: '금남자도복',
		type: 'item',
		desc: '신규 아이템이 추가되었습니다.',
		images: 'I018598.png',
	},
]);

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
onMounted(() => {
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
</style>
