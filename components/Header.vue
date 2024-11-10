<template>
	<header class="header">
		<!-- 상단 영역 -->
		<div class="header__top">
			<div class="header__logo">
				<NuxtLink to="/">
					<NuxtImg
						src="/images/logo.png"
						alt="바람위키"
						width="100"
						height="100"
					/>
					<h1>바람위키</h1>
				</NuxtLink>
			</div>

			<!-- 모바일 햄버거 메뉴 추가 -->
			<button class="mobile-menu-trigger" @click="isMenuOpen = true">
				<span></span>
				<span></span>
				<span></span>
			</button>

			<!-- 데스크톱 네비게이션 -->
			<nav class="header__nav desktop-nav">
				<NuxtLink to="/item-table" role="button">아이템 모음집</NuxtLink>
				<div class="dropdown">
					<button class="dropdown__trigger">스킬</button>
					<ul class="dropdown__menu">
						<li><NuxtLink to="/skill/w">전사</NuxtLink></li>
						<li><NuxtLink to="/skill/p">주술사</NuxtLink></li>
						<li><NuxtLink to="/skill/n">도적</NuxtLink></li>
						<li><NuxtLink to="/skill/t">도사</NuxtLink></li>
					</ul>
				</div>
				<NuxtLink to="/map/level" role="button">레벨별 사냥터</NuxtLink>
			</nav>

			<!-- 모바일 사이드 메뉴 추가 -->
			<div class="mobile-nav" :class="{ 'is-open': isMenuOpen }">
				<div class="mobile-nav__overlay" @click="isMenuOpen = false"></div>
				<div class="mobile-nav__content">
					<button class="mobile-nav__close" @click="isMenuOpen = false">
						×
					</button>
					<ul class="mobile-nav__menu">
						<li>
							<h3>스킬</h3>
							<ul>
								<li>
									<NuxtLink
										to="/skill/w"
										@click="isMenuOpen = false"
										:class="{
											'router-link-active': $route.path === '/skill/w',
										}"
										>전사</NuxtLink
									>
								</li>
								<li>
									<NuxtLink
										to="/skill/p"
										@click="isMenuOpen = false"
										:class="{
											'router-link-active': $route.path === '/skill/p',
										}"
										>주술사</NuxtLink
									>
								</li>
								<li>
									<NuxtLink
										to="/skill/n"
										@click="isMenuOpen = false"
										:class="{
											'router-link-active': $route.path === '/skill/n',
										}"
										>도적</NuxtLink
									>
								</li>
								<li>
									<NuxtLink
										to="/skill/t"
										@click="isMenuOpen = false"
										:class="{
											'router-link-active': $route.path === '/skill/t',
										}"
										>도사</NuxtLink
									>
								</li>
							</ul>
						</li>
						<li>
							<h3>정보요약</h3>
							<ul>
								<li>
									<NuxtLink
										to="/item-table"
										@click="isMenuOpen = false"
										:class="{
											'router-link-active': $route.path === '/item-table',
										}"
										role="button"
										>아이템 모음집</NuxtLink
									>
								</li>
								<li>
									<NuxtLink
										to="/map/level"
										@click="isMenuOpen = false"
										:class="{
											'router-link-active': $route.path === '/map/level',
										}"
										role="button"
										>레벨별 사냥터</NuxtLink
									>
								</li>
							</ul>
						</li>

						<!-- 추가 메뉴 항목들은 여기에 -->
					</ul>
				</div>
			</div>
		</div>

		<!-- 하단 검색 영역 -->
		<div v-if="!isMainPage" class="header__bottom">
			<div class="search__container">
				<div class="search__bar">
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
						class="search__input"
					/>
				</div>
				<div class="search__results" v-show="keyword">
					<template v-if="isLoading">
						<ul v-if="results.length > 0" class="search__list">
							<li
								v-for="(result, index) in results"
								:key="`result-${result.id}`"
								:class="[
									'search__item',
									{ 'search__item--active': index === resultIndex },
								]"
								:data-index="index"
								@click="handleItemClick(result)"
								role="button"
							>
								<NuxtImg
									:src="`/remote/${result.type}/${result.image}`"
									:alt="result.name"
									width="32"
									height="32"
									class="search__item-image"
									:placeholder="[32, 32]"
								/>
								<NuxtLink
									:to="`/${result.type}/${result.id}`"
									class="search__item-link"
									@click="
										keyword = '';
										results = [];
										resultIndex = 0;
									"
								>
									<strong class="search__item-type">
										{{
											result.type === 'item'
												? '아이템'
												: result.type === 'map'
												? '맵'
												: '몬스터'
										}}:
									</strong>
									<span class="search__item-name">{{ result.name }}</span>
								</NuxtLink>
							</li>
						</ul>
						<div v-else class="search__loading">검색 중...</div>
					</template>
					<template v-else>
						<ul v-if="results.length > 0" class="search__list">
							<li
								v-for="(result, index) in results"
								:key="`result-${result.id}`"
								:class="[
									'search__item',
									{ 'search__item--active': index === resultIndex },
								]"
								:data-index="index"
								@click="handleItemClick(result)"
								role="button"
							>
								<NuxtImg
									:src="`/remote/${result.type}/${result.image}`"
									:alt="result.name"
									width="32"
									height="32"
									class="search__item-image"
									:placeholder="[32, 32]"
								/>
								<NuxtLink
									:to="`/${result.type}/${result.id}`"
									class="search__item-link"
									@click="
										keyword = '';
										results = [];
										resultIndex = 0;
									"
								>
									<strong class="search__item-type">
										{{
											result.type === 'item'
												? '아이템'
												: result.type === 'map'
												? '맵'
												: '몬스터'
										}}:
									</strong>
									<span class="search__item-name">{{ result.name }}</span>
								</NuxtLink>
							</li>
						</ul>
						<p v-else class="search__no-results">검색 결과가 없습니다.</p>
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

// ref 추가
const searchInput = ref<HTMLInputElement | null>(null);

// 검색 결과가 있는지 확인하는 computed 속성
const hasResults = computed(() => results.value.length > 0);

const handleInput = (e: Event) => {
	keyword.value = (e.target as HTMLInputElement).value;
	if (!keyword.value) {
		results.value = [];
		return;
	}
};

// 검색결과 키보드 이동 처리
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

// 엔터키 처리 함수 추가
const handleEnter = () => {
	if (hasResults.value && results.value[resultIndex.value]) {
		const selectedResult = results.value[resultIndex.value];
		keyword.value = '';
		results.value = [];
		resultIndex.value = 0;
		window.location.href = `/${selectedResult.type}/${selectedResult.id}`;

		// navigateTo(`/${selectedResult.type}/${selectedResult.id}`);
	}
};

// 아이템 클릭 처리 함수 추가
const handleItemClick = (result: Search) => {
	keyword.value = '';
	results.value = [];
	resultIndex.value = 0;
	// navigateTo(`/${result.type}/${result.id}`);
	window.location.href = `/${result.type}/${result.id}`;
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

// 컴포넌트 마운트 시 검색창 포커스
onMounted(() => {
	searchInput.value?.focus();
});

const isMenuOpen = ref(false);

// 모바일 메뉴가 열려있을 때 스크롤 방지
onMounted(() => {
	watchEffect(() => {
		if (isMenuOpen.value) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	});
});
</script>

<style lang="scss" scoped>
// Variables & Mixins
$header-padding: 20px;
$mobile-breakpoint: 768px;
$small-mobile-breakpoint: 480px;
$border-radius: 8px;
$transition-duration: 0.3s;

@mixin mobile {
	@media (max-width: $mobile-breakpoint) {
		@content;
	}
}

@mixin small-mobile {
	@media (max-width: $small-mobile-breakpoint) {
		@content;
	}
}

// Common Styles
%scroll-style {
	scrollbar-width: thin;
	scrollbar-color: var(--border-color) rgba(0, 0, 0, 0.1);

	&::-webkit-scrollbar {
		width: 8px;

		&-track {
			background: rgba(0, 0, 0, 0.1);
			border-radius: 4px;
		}

		&-thumb {
			background: var(--border-color);
			border-radius: 4px;
		}
	}
}

%paper-style {
	&::before {
		content: '';
		position: absolute;
		inset: 0;
		background: var(--secondary-bg);
		clip-path: polygon(
			0% 15%,
			15% 0%,
			85% 0%,
			100% 15%,
			100% 85%,
			85% 100%,
			15% 100%,
			0% 85%
		);
		border: 1px solid var(--border-color);
		transform: scale(1.02);
		z-index: -2;
	}

	&::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(
			45deg,
			transparent 48%,
			var(--border-color) 48%,
			var(--border-color) 52%,
			transparent 52%
		);
		background-size: 5px 5px;
		clip-path: polygon(
			0% 15%,
			15% 0%,
			85% 0%,
			100% 15%,
			100% 85%,
			85% 100%,
			15% 100%,
			0% 85%
		);
		opacity: 0.1;
		z-index: -1;
	}
}

// Header Component
.header {
	&__top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: 1200px;
		margin: 0 auto 40px;
		padding: 0 $header-padding;

		@include mobile {
			margin-top: 15px;
			gap: 15px;
		}
	}

	&__bottom {
		width: 100%;
		display: flex;
		justify-content: center;
	}

	&__logo {
		display: flex;
		align-items: center;
		gap: 10px;
		white-space: nowrap;
		cursor: pointer;

		@include mobile {
			margin-left: 0;
			align-self: flex-start;
		}

		a {
			display: flex;
			align-items: center;
			font-size: 1.5em;
			font-weight: bold;
			margin: 0;
			white-space: nowrap;
			text-decoration: none;
			color: var(--text-color);

			@include mobile {
				font-size: 1.3em;
			}
		}

		img {
			height: 60px;
			object-fit: contain;
		}
	}

	&__nav {
		display: flex;
		gap: 25px;
		padding: 10px;

		@include mobile {
			margin: 15px 0;
			flex-wrap: wrap;
			justify-content: center;
		}

		a {
			position: relative;
			padding: 15px 30px;
			color: var(--text-color);
			text-decoration: none;
			font-weight: bold;
			min-width: 80px;
			text-align: center;
			font-family: inherit;
			font-size: inherit;
			@extend %paper-style;

			&:hover {
				color: var(--highlight);
				transform: translateY(-2px);

				&::before {
					border-color: var(--highlight);
					box-shadow: 0 0 15px rgba(178, 145, 98, 0.3);
				}
			}

			&.router-link-active {
				color: var(--highlight);

				&::before {
					background: var(--secondary-panel);
					border-color: var(--highlight);
					box-shadow: 0 0 15px rgba(178, 145, 98, 0.3),
						inset 0 0 20px rgba(178, 145, 98, 0.2);
				}
			}
		}
	}
}

// Search Component
.search {
	&__container {
		width: 100%;
		max-width: 600px;
		margin: 0 auto;
		position: relative;
		padding: 0 15px;
	}

	&__bar {
		position: relative;
		width: 100%;
		max-width: 600px;
		margin: 0 auto;
		display: flex;
	}

	&__input {
		width: 100%;
		padding: 15px 20px;
		font-size: 16px;
		background: var(--main-bg);
		border: 2px solid var(--border-color);
		border-radius: $border-radius;
		color: var(--text-color);
		transition: all $transition-duration ease;

		&:focus {
			outline: none;
			border-color: var(--highlight);
			box-shadow: 0 0 8px rgba(178, 145, 98, 0.4);
		}
	}

	&__results {
		position: absolute;
		top: calc(100% + 10px);
		left: 50%;
		width: calc(100% - 30px);
		transform: translateX(-50%);
		max-width: 600px;
		background: rgba(60, 47, 37, 0.95);
		border-radius: $border-radius;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
		z-index: 100;
		backdrop-filter: blur(8px);

		@include mobile {
			position: absolute;
			left: 0;
			transform: none;
			width: 100%;
		}
	}

	&__list {
		max-height: 400px;
		overflow-y: auto;
		padding: 10px;
		@extend %scroll-style;

		@include mobile {
			max-height: 300px;
		}
	}

	&__item {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 10px;
		border-radius: $border-radius;
		transition: background-color $transition-duration ease;
		cursor: pointer;

		&:hover {
			background-color: rgba(178, 145, 98, 0.15);
		}

		&-image {
			width: 32px;
			height: 32px;
			object-fit: contain;
		}

		&-link {
			display: flex;
			gap: 5px;
			color: var(--text-color);
			text-decoration: none;

			&:hover {
				color: var(--highlight);
			}
		}

		&--active {
			background-color: rgba(178, 145, 98, 0.15);
			border-left: 3px solid var(--highlight);
			padding-left: 7px;
		}
	}

	&__loading,
	&__no-results {
		padding: 20px;
		text-align: center;
		color: var(--text-color);
	}
}

// Dropdown Component
.dropdown {
	position: relative;

	&__trigger {
		position: relative;
		padding: 15px 30px;
		color: var(--text-color);
		background: none;
		border: none;
		font-weight: bold;
		min-width: 80px;
		text-align: center;
		cursor: pointer;
		font-family: inherit;
		font-size: inherit;
		@extend %paper-style;

		&:hover {
			color: var(--highlight);
			transform: translateY(-2px);

			&::before {
				border-color: var(--highlight);
				box-shadow: 0 0 15px rgba(178, 145, 98, 0.3);
			}
		}
	}

	&__menu {
		position: absolute;
		top: 100%;
		left: 50%;
		transform: translateX(-50%);
		min-width: 150px;
		margin-top: 10px;
		padding: 0;
		list-style: none;
		background: var(--secondary-bg);
		border-radius: 8px;
		opacity: 0;
		visibility: hidden;
		transform-origin: top center;
		transition: all 0.3s ease;
		z-index: 9999;

		li {
			height: 0;
			overflow: hidden;
			transition: height 0.3s ease;

			a {
				display: block;
				padding: 12px 20px;
				color: var(--text-color);
				text-decoration: none;
				transition: all 0.2s ease;
				text-align: center;

				&:hover {
					color: var(--highlight);
					background: var(--hover-highlight);
				}
			}
		}
	}

	&:hover {
		.dropdown__menu {
			opacity: 1;
			visibility: visible;

			li {
				height: 45px;

				@for $i from 1 through 4 {
					&:nth-child(#{$i}) {
						transition-delay: $i * 0.05s;
					}
				}
			}
		}
	}
}

// Mobile Navigation
.mobile-menu-trigger {
	display: none;
	flex-direction: column;
	justify-content: space-between;
	width: 30px;
	height: 20px;
	background: none;
	border: none;
	padding: 0;
	cursor: pointer;
	z-index: 100;

	span {
		display: block;
		width: 100%;
		height: 2px;
		background-color: var(--text-color);
		transition: all 0.3s ease;
	}

	@include mobile {
		display: flex;
		margin-right: 2rem;
	}
}

.mobile-nav {
	display: none;

	@include mobile {
		display: block;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		visibility: hidden;
		z-index: 1000;
		transition: visibility 0s linear 0.3s;

		&.is-open {
			visibility: visible;
			transition-delay: 0s;

			.mobile-nav__overlay {
				opacity: 1;
			}

			.mobile-nav__content {
				transform: translateX(0);
				visibility: visible;
			}
		}
	}

	&__overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	&__content {
		position: fixed;
		top: 0;
		left: 0;
		width: 80%;
		max-width: 300px;
		height: 100%;
		background: var(--main-bg);
		padding: 20px;
		transform: translateX(-100%);
		transition: all 0.3s ease;
		overflow-y: auto;
		box-shadow: 2px 0 15px rgba(0, 0, 0, 0.3);
		@extend %paper-style;

		&::before {
			clip-path: none;
			border-radius: 0;
		}
	}

	&__close {
		position: absolute;
		top: 15px;
		right: 15px;
		background: none;
		border: none;
		font-size: 28px;
		color: var(--text-color);
		cursor: pointer;
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		transition: all 0.3s ease;

		&:hover {
			background: var(--hover-highlight);
			color: var(--highlight);
			transform: rotate(90deg);
		}
	}

	&__menu {
		margin-top: 40px;

		h3 {
			color: var(--highlight);
			margin-bottom: 15px;
			font-size: 1.2em;
			padding: 0 15px;
			position: relative;

			&::after {
				content: '';
				position: absolute;
				bottom: -5px;
				left: 15px;
				width: 30px;
				height: 2px;
				background: var(--highlight);
			}
		}

		ul {
			list-style: none;
			padding: 0;
			margin: 0 0 25px 0;
		}

		li {
			margin: 5px 0;

			a {
				display: block;
				padding: 12px 20px;
				color: var(--text-color);
				text-decoration: none;
				transition: all 0.3s ease;
				position: relative;
				border-radius: 6px;
				margin: 0 8px;

				&:hover {
					color: var(--highlight);
					background: var(--hover-highlight);
					transform: translateX(5px);
				}

				&.router-link-active {
					color: var(--highlight);
					background: var(--secondary-panel);
					border-left: 3px solid var(--highlight);
					padding-left: 17px;

					&::before {
						content: '';
						position: absolute;
						inset: 0;
						background: var(--secondary-panel);
						border: 1px solid var(--highlight);
						border-radius: 6px;
						opacity: 0.2;
						z-index: -1;
					}
				}
			}
		}
	}
}

// Responsive Utilities
.desktop-nav {
	@include mobile {
		display: none;
	}
}
</style>
