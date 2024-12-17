<template>
	<header class="border-b border-border-light sticky top-0 bg-layer-bg z-50">
		<!-- Mobile Menu -->
		<div class="lg:hidden relative">
			<div class="flex items-center justify-between px-4 h-14">
				<NuxtLink
					to="/"
					class="text-game-legendary font-bold text-xl flex items-center gap-2"
				>
					<NuxtImg
						src="/images/logo.png"
						alt="바람위키"
						width="40"
						height="40"
						class="h-10 w-10 object-contain"
					/>
					바람위키
				</NuxtLink>
				<button
					class="text-game-primary hover:text-game-legendary transition-colors p-2"
					@click="isMenuOpen = !isMenuOpen"
				>
					<span v-if="!isMenuOpen">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
							/>
						</svg>
					</span>
					<span v-else>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</span>
				</button>
			</div>

			<!-- Mobile Dropdown Menu -->
			<div
				class="absolute top-full left-0 right-0 bg-layer-surface shadow-lg border-t border-border-light transition-all duration-300"
				:class="[
					isMenuOpen
						? 'max-h-[500px] opacity-100 z-50'
						: 'max-h-0 opacity-0 pointer-events-none',
				]"
			>
				<nav class="px-4 py-2">
					<div class="space-y-1">
						<NuxtLink
							to="/item-table"
							class="block py-2 hover:text-game-legendary transition-colors"
							@click="closeMenu"
						>
							아이템 모음집
						</NuxtLink>

						<!-- Skills Dropdown -->
						<div class="submenu-container overflow-hidden">
							<button
								class="flex items-center justify-between w-full py-2 hover:text-game-legendary transition-colors"
								@click="toggleSubmenu('skills')"
							>
								<span>스킬</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-4 h-4 transition-transform duration-200"
									:class="{ 'rotate-180': activeSubmenu === 'skills' }"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M19.5 8.25l-7.5 7.5-7.5-7.5"
									/>
								</svg>
							</button>
							<div
								class="submenu ml-4 space-y-1 transition-all duration-200 overflow-hidden"
								:class="[
									activeSubmenu === 'skills'
										? 'max-h-[160px] opacity-100'
										: 'max-h-0 opacity-0',
								]"
							>
								<NuxtLink
									v-for="(skill, type) in skills"
									:key="type"
									:to="`/skill/${type}`"
									class="block py-2 text-sm hover:text-game-legendary transition-colors"
									@click="closeMenu"
								>
									{{ skill }}
								</NuxtLink>
							</div>
						</div>

						<!-- 맵 Dropdown -->
						<div class="submenu-container overflow-hidden">
							<button
								class="flex items-center justify-between w-full py-2 hover:text-game-legendary transition-colors"
								@click="toggleSubmenu('map')"
							>
								<span>맵</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-4 h-4 transition-transform duration-200"
									:class="{ 'rotate-180': activeSubmenu === 'map' }"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M19.5 8.25l-7.5 7.5-7.5-7.5"
									/>
								</svg>
							</button>
							<div
								class="submenu ml-4 space-y-1 transition-all duration-200 overflow-hidden"
								:class="[
									activeSubmenu === 'map'
										? 'max-h-[160px] opacity-100'
										: 'max-h-0 opacity-0',
								]"
							>
								<NuxtLink
									to="/map/all"
									class="block py-2 text-sm hover:text-game-legendary transition-colors"
									@click="closeMenu"
								>
									대표맵
								</NuxtLink>
								<NuxtLink
									to="/map/findmap"
									class="block py-2 text-sm hover:text-game-legendary transition-colors"
									@click="closeMenu"
								>
									길찾기
								</NuxtLink>
								<NuxtLink
									to="/map/level"
									class="block py-2 text-sm hover:text-game-legendary transition-colors"
									@click="closeMenu"
								>
									레벨별 사냥터
								</NuxtLink>
							</div>
						</div>

						<!-- Experience Dropdown -->
						<div class="submenu-container overflow-hidden">
							<button
								class="flex items-center justify-between w-full py-2 hover:text-game-legendary transition-colors"
								@click="toggleSubmenu('exp')"
							>
								<span>경험치</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-4 h-4 transition-transform duration-200"
									:class="{ 'rotate-180': activeSubmenu === 'exp' }"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M19.5 8.25l-7.5 7.5-7.5-7.5"
									/>
								</svg>
							</button>
							<div
								class="submenu ml-4 space-y-1 transition-all duration-200 overflow-hidden"
								:class="[
									activeSubmenu === 'exp'
										? 'max-h-[160px] opacity-100'
										: 'max-h-0 opacity-0',
								]"
							>
								<NuxtLink
									to="/level/exp"
									class="block py-2 text-sm hover:text-game-legendary transition-colors"
									@click="closeMenu"
								>
									레벨별
								</NuxtLink>
								<NuxtLink
									to="/level/king"
									class="block py-2 text-sm hover:text-game-legendary transition-colors"
									@click="closeMenu"
								>
									왕퀘스트
								</NuxtLink>
								<NuxtLink
									to="/level/calc"
									class="block py-2 text-sm hover:text-game-legendary transition-colors"
									@click="closeMenu"
								>
									계산기
								</NuxtLink>
							</div>
						</div>
					</div>
				</nav>
			</div>
		</div>

		<!-- Desktop Menu -->
		<div class="hidden lg:block">
			<div class="max-w-7xl mx-auto px-4">
				<div class="flex items-center justify-between h-16">
					<NuxtLink
						to="/"
						class="text-game-legendary font-bold text-xl flex items-center gap-2"
					>
						<NuxtImg
							src="/images/logo.png"
							alt="바람위키"
							width="40"
							height="40"
							class="h-10 w-10 object-contain"
						/>
						바람위키
					</NuxtLink>

					<nav class="flex items-center gap-8 z-50">
						<NuxtLink
							to="/item-table"
							class="hover:text-game-legendary transition-colors"
							>아이템 모음집</NuxtLink
						>

						<!-- Skills Dropdown -->
						<div class="group relative">
							<button
								class="flex items-center gap-1 hover:text-game-legendary transition-colors py-2"
							>
								스킬
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-4 h-4 transition-transform group-hover:rotate-180"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M19.5 8.25l-7.5 7.5-7.5-7.5"
									/>
								</svg>
							</button>
							<div
								class="absolute top-full -left-4 hidden group-hover:block bg-layer-surface border border-border-light rounded-lg py-2 min-w-[160px] shadow-lg"
							>
								<NuxtLink
									to="/skill/w"
									class="block px-4 py-2 hover:bg-layer-overlay transition-colors"
									>전사</NuxtLink
								>
								<NuxtLink
									to="/skill/p"
									class="block px-4 py-2 hover:bg-layer-overlay transition-colors"
									>주술사</NuxtLink
								>
								<NuxtLink
									to="/skill/n"
									class="block px-4 py-2 hover:bg-layer-overlay transition-colors"
									>도적</NuxtLink
								>
								<NuxtLink
									to="/skill/t"
									class="block px-4 py-2 hover:bg-layer-overlay transition-colors"
									>도사</NuxtLink
								>
							</div>
						</div>

						<!-- 맵 Dropdown -->

						<div class="group relative">
							<button
								class="flex items-center gap-1 hover:text-game-legendary transition-colors py-2"
							>
								맵
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-4 h-4 transition-transform group-hover:rotate-180"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M19.5 8.25l-7.5 7.5-7.5-7.5"
									/>
								</svg>
							</button>
							<div
								class="absolute top-full -left-4 hidden group-hover:block bg-layer-surface border border-border-light rounded-lg py-2 min-w-[160px] shadow-lg"
							>
								<NuxtLink
									to="/map/all"
									class="block px-4 py-2 hover:bg-layer-overlay transition-colors"
									>대표맵</NuxtLink
								>
								<NuxtLink
									to="/map/findmap"
									class="block px-4 py-2 hover:bg-layer-overlay transition-colors"
									>길찾기</NuxtLink
								>
								<NuxtLink
									to="/map/level"
									class="block px-4 py-2 hover:bg-layer-overlay transition-colors"
									>레벨별 사냥터</NuxtLink
								>
							</div>
						</div>

						<!-- Experience Dropdown -->
						<div class="group relative">
							<button
								class="flex items-center gap-1 hover:text-game-legendary transition-colors py-2"
							>
								경험치
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-4 h-4 transition-transform group-hover:rotate-180"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M19.5 8.25l-7.5 7.5-7.5-7.5"
									/>
								</svg>
							</button>
							<div
								class="absolute top-full -left-4 hidden group-hover:block bg-layer-surface border border-border-light rounded-lg py-2 min-w-[160px] shadow-lg"
							>
								<NuxtLink
									to="/level/exp"
									class="block px-4 py-2 hover:bg-layer-overlay transition-colors"
									>레벨별</NuxtLink
								>
								<NuxtLink
									to="/level/king"
									class="block px-4 py-2 hover:bg-layer-overlay transition-colors"
									>왕퀘스트</NuxtLink
								>
								<NuxtLink
									to="/level/calc"
									class="block px-4 py-2 hover:bg-layer-overlay transition-colors"
									>계산기</NuxtLink
								>
							</div>
						</div>
					</nav>
				</div>
			</div>
		</div>

		<!-- Search Section -->
		<div
			v-if="!isMainPage"
			class="px-4 py-2 bg-layer-bg border-b border-border-light relative max-w-3xl mx-auto"
		>
			<div class="relative">
				<input
					ref="searchInput"
					type="text"
					v-model="keyword"
					placeholder="아이템/맵/몬스터 이름을 입력하세요"
					@input="handleInput"
					@keydown.esc="keyword = ''"
					@keydown.up="handleKeyDown"
					@keydown.down="handleKeyDown"
					@keydown.enter="handleEnter"
					@focus="searchFocused = true"
					@blur="handleSearchBlur"
					class="w-full px-4 py-2 bg-layer-overlay border border-border-light rounded-lg focus:outline-none focus:border-game-legendary text-game-primary placeholder-game-secondary"
				/>
				<div
					v-show="showSearchResults"
					class="absolute left-0 right-0 mt-1 bg-layer-surface border border-border-light rounded-lg shadow-lg z-50 max-h-[300px] overflow-y-auto"
				>
					<template v-if="isLoading">
						<div class="p-4 text-center text-game-secondary">
							<div class="loading-spinner"></div>
							<span>검색 중...</span>
						</div>
					</template>
					<template v-else>
						<ul
							v-if="filteredResults.length > 0"
							class="divide-y divide-border-light"
						>
							<li
								v-for="(result, index) in filteredResults"
								:key="`result-${result.id}`"
								:class="[
									'flex items-center gap-2 p-2 hover:bg-layer-overlay transition-colors cursor-pointer',
									{ 'bg-layer-overlay': index === resultIndex },
								]"
								:data-index="index"
								@click="handleItemClick(result)"
							>
								<NuxtImg
									:src="`https://evfuckbgifbr27188584.gcdn.ntruss.com/${result.type}/${result.image}`"
									:alt="result.name"
									class="w-8 h-8 object-contain"
									:placeholder="[32, 32]"
								/>
								<div class="flex-1">
									<div class="text-sm text-game-legendary">
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
							</li>
						</ul>
						<div v-else class="p-4 text-center text-game-secondary">
							검색 결과가 없습니다
						</div>
					</template>
				</div>
			</div>
		</div>
	</header>
</template>

<script setup lang="ts">
import { ref, watchEffect, computed, onMounted } from 'vue';
import type { Search } from '~/types/search';

const keyword = ref('');
const results = ref<Search[]>([]);
const isLoading = ref(false);
const resultIndex = ref(0);
const route = useRoute();
const isMainPage = computed(() => route.path === '/');
const isMenuOpen = ref(false);
const activeSubmenu = ref<string | null>(null);
const searchInput = ref<HTMLInputElement | null>(null);
const searchFocused = ref(false);
let blurTimeout: NodeJS.Timeout;

// 메뉴 관련 데이터
const skills = {
	w: '전사',
	p: '주술사',
	n: '도적',
	t: '도사',
};

// 검색 결과 표시 여부
const showSearchResults = computed(() => {
	return searchFocused.value && keyword.value;
});

// 메뉴 관련 함수
const toggleMenu = () => {
	isMenuOpen.value = !isMenuOpen.value;
	if (!isMenuOpen.value) {
		activeSubmenu.value = null;
	}
};

const toggleSubmenu = (menu: string) => {
	if (activeSubmenu.value === menu) {
		activeSubmenu.value = null;
	} else {
		activeSubmenu.value = menu;
	}
};

const closeMenu = () => {
	isMenuOpen.value = false;
	activeSubmenu.value = null;
};

// 검색 관련 함수
const handleSearchBlur = () => {
	blurTimeout = setTimeout(() => {
		searchFocused.value = false;
	}, 200);
};

const hasResults = computed(() => results.value.length > 0);

const handleInput = (e: Event) => {
	keyword.value = (e.target as HTMLInputElement).value;
	if (!keyword.value) {
		results.value = [];
		return;
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

	const selectedItem = document.querySelector(
		`[data-index="${resultIndex.value}"]`
	);
	selectedItem?.scrollIntoView({ block: 'nearest' });
};

const handleEnter = () => {
	if (hasResults.value && results.value[resultIndex.value]) {
		const selectedResult = results.value[resultIndex.value];
		clearSearch();
		navigateTo(`/${selectedResult.type}/${selectedResult.id}`);
	}
};

const handleItemClick = (result: Search) => {
	clearTimeout(blurTimeout);
	clearSearch();
	navigateTo(`/${result.type}/${result.id}`);
};

const clearSearch = () => {
	keyword.value = '';
	results.value = [];
	resultIndex.value = 0;
	searchFocused.value = false;
};

watchEffect(async () => {
	if (keyword.value) {
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
	} else {
		results.value = [];
	}
});

// 검색 관련 설정
const setupSearchClickOutside = () => {
	const handleClickOutside = (e: MouseEvent) => {
		const target = e.target as HTMLElement;
		const searchContainer = document.querySelector('.search-container');
		if (searchContainer && !searchContainer.contains(target)) {
			searchFocused.value = false;
		}
	};

	document.addEventListener('click', handleClickOutside);
	onUnmounted(() => {
		document.removeEventListener('click', handleClickOutside);
	});
};

// 모바일 메뉴 관련 설정
const setupMobileMenu = () => {
	const handleResize = () => {
		if (window.innerWidth >= 1024) {
			// lg breakpoint
			isMenuOpen.value = false;
			activeSubmenu.value = null;
		}
	};

	window.addEventListener('resize', handleResize);
	onUnmounted(() => {
		window.removeEventListener('resize', handleResize);
	});
};

// mounted 시 설정
onMounted(() => {
	// 스크롤 락
	watchEffect(() => {
		if (isMenuOpen.value) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	});

	// 검색창 포커스 (메인 페이지가 아닐 경우)
	if (!isMainPage.value) {
		searchInput.value?.focus();
	}

	// 검색 영역 외 클릭 감지 설정
	setupSearchClickOutside();

	// 모바일 메뉴 리사이즈 대응
	setupMobileMenu();
});

// 검색 결과 필터링 로직 추가
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
</script>

<style scoped>
.submenu-container {
	position: relative;
	overflow: hidden;
}

.submenu {
	transition: all 0.3s ease;
}

.submenu:not(.active),
.submenu.active {
	opacity: initial;
}
</style>
