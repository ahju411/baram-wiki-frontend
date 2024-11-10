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
			<nav class="header__nav">
				<NuxtLink to="/skill/w">전사</NuxtLink>
				<NuxtLink to="/skill/p">주술사</NuxtLink>
				<NuxtLink to="/skill/n">도적</NuxtLink>
				<NuxtLink to="/skill/t">도사</NuxtLink>
			</nav>
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
									:src="`/images/${result.type}/${result.image}`"
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
									:src="`/images/${result.type}/${result.image}`"
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
</script>

<style lang="scss" scoped>
// Variables
$header-padding: 20px;
$mobile-breakpoint: 768px;
$small-mobile-breakpoint: 480px;
$border-radius: 8px;
$transition-duration: 0.3s;

// Mixins
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

// Styles
.header {
	// display: flex;
	// flex-direction: column;
	// padding: $header-padding 0;
	// gap: 40px;

	&__top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: 1200px;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 40px;

		@include mobile {
			margin-top: 15px;
			flex-direction: column;
			gap: 15px;
			align-items: flex-start;
			width: 100%;
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
			margin-left: 0; // 왼쪽 마진 제거
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

			// 주문서 배경
			&::before {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				background: var(--secondary-bg);
				clip-path: polygon(
					0% 15%,
					// 왼쪽 상단 굴곡
					15% 0%,
					// 상단 왼쪽 굴곡
					85% 0%,
					// 상단 오른쪽 굴곡
					100% 15%,
					// 오른쪽 상단 굴곡
					100% 85%,
					// 오른쪽 하단 굴곡
					85% 100%,
					// 하단 오른쪽 굴곡
					15% 100%,
					// 하단 왼쪽 굴곡
					0% 85% // 왼쪽 하단 굴곡
				);
				border: 1px solid var(--border-color);
				transform: scale(1.02);
				z-index: -2;
			}

			// 주문서 테두리 효과
			&::after {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
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

			// 주문서 내부 그림자
			box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2),
				0 2px 5px rgba(0, 0, 0, 0.1);

			// 호버 효과
			&:hover {
				color: var(--highlight);
				transform: translateY(-2px);

				&::before {
					border-color: var(--highlight);
					box-shadow: 0 0 15px rgba(178, 145, 98, 0.3);
				}
			}

			// 활성화 상태
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
		margin: 0 auto;
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

@include mobile {
	.search {
		&__input-wrapper {
			max-width: 100%;
			padding: 10px;
		}

		&__results {
			width: calc(100% - 20px);
			left: 10px;
		}

		&__list {
			max-height: 300px;
		}
	}
}
</style>
