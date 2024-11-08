# index.vue
<template>
	<div class="main-container">
		<!-- 배경 파티클 효과 유지 -->
		<div class="particles">
			<div v-for="n in 20" :key="n" class="particle"></div>
		</div>

		<div class="content-wrapper">
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
							<ul v-if="results.length > 0" class="search-results-list">
								<li
									v-for="(result, index) in results"
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
					<h3 class="section-title">최근 업데이트</h3>
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

const keyword = ref('');
const results = ref<Search[]>([]);
const isLoading = ref(false);
const resultIndex = ref(0);
const trendingKeywords = ref([
	{
		id: 'I627884',
		name: '도토리',
		type: 'item',
	},
	{
		id: 'MO110645',
		name: '다람쥐',
		type: 'monster',
	},
	{
		id: 'MO181712',
		name: '토끼',
		type: 'monster',
	},
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

		navigateTo(`/${selectedResult.type}/${selectedResult.id}`);
	}
};

const closeSearchResults = () => {
	keyword.value = '';
	results.value = [];
	resultIndex.value = 0;
};

// 아이템 클릭 처리 함수 추가
const handleItemClick = (result: Search) => {
	keyword.value = '';
	results.value = [];
	resultIndex.value = 0;
	navigateTo(`/${result.type}/${result.id}`);
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

// 검색 상태 관리를 위한 ref 추가
const isSearching = computed(() => {
	return Boolean(keyword.value && window.innerWidth <= 768);
});
</script>

<style scoped lang="scss">
.main-container {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	background: radial-gradient(
		circle at center,
		var(--secondary-bg) 0%,
		var(--main-bg) 100%
	);
	position: relative;
}

.particles {
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	overflow: hidden;
	z-index: 1;
	pointer-events: none;
}

.particle {
	position: absolute;
	width: 2px;
	height: 2px;
	background: var(--border-color);
	border-radius: 50%;
	opacity: 0.3;
	animation: float 15s infinite linear;

	// 20개의 파티클에 대해 각각 다른 위치와 크기 지정
	&:nth-child(1) {
		width: 3px;
		height: 3px;
		left: 10%;
		top: 20%;
		animation-delay: 0s;
		animation-duration: 25s;
	}
	&:nth-child(2) {
		width: 2px;
		height: 2px;
		left: 20%;
		top: 40%;
		animation-delay: 0.3s;
		animation-duration: 22s;
	}
	&:nth-child(3) {
		width: 4px;
		height: 4px;
		left: 30%;
		top: 60%;
		animation-delay: 0.5s;
		animation-duration: 28s;
	}
	&:nth-child(4) {
		width: 2px;
		height: 2px;
		left: 40%;
		top: 80%;
		animation-delay: 0.5s;
		animation-duration: 20s;
	}
	&:nth-child(5) {
		width: 3px;
		height: 3px;
		left: 50%;
		top: 25%;
		animation-delay: 0.7s;
		animation-duration: 24s;
	}
	&:nth-child(6) {
		width: 2px;
		height: 2px;
		left: 60%;
		top: 45%;
		animation-delay: 0.7s;
		animation-duration: 26s;
	}
	&:nth-child(7) {
		width: 4px;
		height: 4px;
		left: 70%;
		top: 65%;
		animation-delay: 1.2s;
		animation-duration: 23s;
	}
	&:nth-child(8) {
		width: 3px;
		height: 3px;
		left: 80%;
		top: 85%;
		animation-delay: 1.4s;
		animation-duration: 27s;
	}
	&:nth-child(9) {
		width: 2px;
		height: 2px;
		left: 90%;
		top: 15%;
		animation-delay: 1.6s;
		animation-duration: 21s;
	}
	&:nth-child(10) {
		width: 3px;
		height: 3px;
		left: 15%;
		top: 35%;
		animation-delay: 1.8s;
		animation-duration: 29s;
	}
	&:nth-child(11) {
		width: 4px;
		height: 4px;
		left: 25%;
		top: 55%;
		animation-delay: 2s;
		animation-duration: 24s;
	}
	&:nth-child(12) {
		width: 2px;
		height: 2px;
		left: 35%;
		top: 75%;
		animation-delay: 2.2s;
		animation-duration: 26s;
	}
	&:nth-child(13) {
		width: 3px;
		height: 3px;
		left: 45%;
		top: 30%;
		animation-delay: 2.4s;
		animation-duration: 22s;
	}
	&:nth-child(14) {
		width: 2px;
		height: 2px;
		left: 55%;
		top: 50%;
		animation-delay: 2.6s;
		animation-duration: 25s;
	}
	&:nth-child(15) {
		width: 4px;
		height: 4px;
		left: 65%;
		top: 70%;
		animation-delay: 2.8s;
		animation-duration: 28s;
	}
	&:nth-child(16) {
		width: 3px;
		height: 3px;
		left: 75%;
		top: 90%;
		animation-delay: 3s;
		animation-duration: 23s;
	}
	&:nth-child(17) {
		width: 2px;
		height: 2px;
		left: 85%;
		top: 10%;
		animation-delay: 3.2s;
		animation-duration: 27s;
	}
	&:nth-child(18) {
		width: 4px;
		height: 4px;
		left: 95%;
		top: 30%;
		animation-delay: 3.4s;
		animation-duration: 24s;
	}
	&:nth-child(19) {
		width: 3px;
		height: 3px;
		left: 5%;
		top: 50%;
		animation-delay: 3.6s;
		animation-duration: 26s;
	}
	&:nth-child(20) {
		width: 2px;
		height: 2px;
		left: 15%;
		top: 70%;
		animation-delay: 3.8s;
		animation-duration: 25s;
	}
}

@keyframes float {
	0% {
		transform: translateY(0) rotate(0deg);
		opacity: 0;
	}
	50% {
		opacity: 0.5;
	}
	100% {
		transform: translateY(-100vh) rotate(360deg);
		opacity: 0;
	}
}

.content-wrapper {
	width: 100%;
	max-width: 800px;
	z-index: 2;
	padding: 2rem;
	margin-top: 4rem;
	position: relative;
}

.search-section {
	text-align: center;
	position: relative;

	.main-title {
		width: 50rem;
		font-size: 3rem;
		color: var(--highlight);
		margin-bottom: 1rem;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
		animation: fadeInDown 1s ease-out;
	}

	.search-description {
		font-size: 1.2rem;
		color: var(--text-color);
		margin-bottom: 2rem;
		animation: fadeIn 1s ease-out 0.5s both;
	}
}

.search-container {
	position: relative;
	width: 100%;
	max-width: 600px;
	margin: 0 auto;
	display: flex;

	.search-input {
		width: 100%;
		padding: 1.5rem 4rem 1.5rem 2rem;
		background: rgba(60, 47, 37, 0.9);
		border: 2px solid var(--border-color);
		border-radius: 12px;
		color: var(--text-color);
		font-size: 1.1rem;
		backdrop-filter: blur(10px);
		transition: all 0.3s ease;

		&:focus {
			outline: none;
			border-color: var(--highlight);
			box-shadow: 0 0 15px rgba(178, 145, 98, 0.3);
		}

		&::placeholder {
			color: var(--secondary-text);
		}
	}

	.search-button {
		position: absolute;
		right: 1rem;
		top: 50%;
		transform: translateY(-50%);
		background: none;
		border: none;
		color: var(--border-color);
		cursor: pointer;
		padding: 0.5rem;
		transition: color 0.3s ease;

		&:hover {
			color: var(--highlight);
		}
	}
}

.trending-searches {
	margin-top: 3rem;

	.trending-title {
		color: var(--highlight);
		font-size: 1.2rem;
		margin-bottom: 1rem;
	}

	.keyword-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.8rem;
		justify-content: center;
	}

	.keyword-chip {
		background: rgba(60, 47, 37, 0.9);
		border: 1px solid var(--border-color);
		color: var(--text-color);
		padding: 0.5rem 1rem;
		border-radius: 20px;
		cursor: pointer;
		transition: all 0.3s ease;

		&:hover {
			background: var(--hover-highlight);
			border-color: var(--highlight);
			color: var(--highlight);
		}
	}
}

.recent-updates {
	margin-top: 4rem;

	.section-title {
		color: var(--highlight);
		font-size: 1.5rem;
		margin-bottom: 2rem;
	}

	.updates-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1.5rem;
	}

	.update-card {
		background: rgba(60, 47, 37, 0.9);
		border: 1px solid var(--border-color);
		border-radius: 12px;
		padding: 1rem;
		display: flex;
		align-items: center;
		gap: 1rem;
		transition: all 0.3s ease;

		&:hover {
			transform: translateY(-3px);
			border-color: var(--highlight);
			box-shadow: 0 8px 24px rgba(178, 145, 98, 0.2);
		}

		.update-image {
			width: 48px;
			height: 48px;
			border-radius: 8px;
			object-fit: cover;
		}

		.update-info {
			text-align: left;

			h4 {
				color: var(--highlight);
				margin: 0 0 0.5rem;
			}

			p {
				color: var(--text-color);
				font-size: 0.9rem;
				margin: 0;
			}
		}
	}
}

// 반응형 디자인
@media (max-width: 768px) {
	.content-wrapper {
		padding: 1rem;
		margin-top: 2rem;
	}

	.search-section {
		position: static;
		.main-title {
			font-size: 2.5rem;
			width: 100%;
		}
	}

	.search-container {
		z-index: 1001;

		&.is-searching {
			position: fixed;
			width: calc(100% - 2rem);
			left: 1rem;
			right: 1rem;
			top: 1rem;
			background: var(--secondary-bg);
			border-radius: 12px;
			padding: 0.5rem;
			box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
		}
		.search-input {
			padding: 1rem 3.5rem 1rem 1.5rem;
			font-size: 1rem;
		}
	}

	.update-card {
		flex-direction: column;
		text-align: center;

		.update-info {
			text-align: center;
		}
	}
}

// 애니메이션
@keyframes fadeInDown {
	from {
		opacity: 0;
		transform: translateY(-20px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

@keyframes fadeIn {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

.search-results-container {
	position: absolute;
	width: 100%;
	z-index: 1000;
	left: 0;
	right: 0;
}

.search-results-backdrop {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.5);
	backdrop-filter: blur(4px);
	z-index: 999;
}

.search-results {
	position: absolute;
	top: 0.5rem;
	left: 0;
	right: 0;
	background: var(--secondary-bg);
	border: 2px solid var(--border-color);
	border-radius: 12px;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
	z-index: 1000;
	max-height: 80vh;
	overflow-y: auto;
	margin: 0 1rem;

	&::-webkit-scrollbar {
		width: 8px;
	}

	&::-webkit-scrollbar-track {
		background: var(--main-bg);
		border-radius: 4px;
	}

	&::-webkit-scrollbar-thumb {
		background: var(--border-color);
		border-radius: 4px;

		&:hover {
			background: var(--highlight);
		}
	}
}

.search-loading {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 2rem;
	color: var(--text-color);
	gap: 1rem;

	.loading-spinner {
		width: 24px;
		height: 24px;
		border: 3px solid var(--border-color);
		border-top-color: var(--highlight);
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}
}

.search-results-list {
	list-style: none;
	padding: 0;
	margin: 0;
}

.search-result-item {
	display: flex;
	align-items: center;
	padding: 1rem;
	gap: 1rem;
	border-bottom: 1px solid var(--border-color);
	cursor: pointer;
	transition: all 0.2s ease;

	&:last-child {
		border-bottom: none;
	}

	&:hover,
	&--active {
		background: var(--hover-highlight);

		.result-type {
			color: var(--highlight);
		}
	}

	.result-icon {
		width: 48px;
		height: 48px;
		border-radius: 8px;
		overflow: hidden;
		background: var(--main-bg);
		border: 1px solid var(--border-color);
		flex-shrink: 0;

		&-img {
			width: 100%;
			height: 100%;
			object-fit: contain;
		}
	}

	.result-info {
		flex: 1;
		min-width: 0;
	}

	.result-type {
		font-size: 0.9rem;
		color: var(--text-color);
		opacity: 0.8;
		margin-bottom: 0.2rem;
	}

	.result-name {
		font-size: 1.1rem;
		color: var(--highlight);
		margin-bottom: 0.2rem;
		font-weight: bold;
	}

	.result-description {
		font-size: 0.9rem;
		color: var(--text-color);
		opacity: 0.9;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.result-shortcut {
		font-size: 0.8rem;
		color: var(--text-color);
		opacity: 0.7;
		padding: 0.3rem 0.6rem;
		background: rgba(0, 0, 0, 0.2);
		border-radius: 4px;
	}
}

.search-no-results {
	padding: 2rem;
	text-align: center;
	color: var(--text-color);

	.no-results-icon {
		margin-bottom: 1rem;
		color: var(--border-color);
	}

	p {
		margin-bottom: 1rem;
		font-size: 1.1rem;
		color: var(--highlight);
	}

	.search-suggestions {
		list-style: none;
		padding: 0;
		font-size: 0.9rem;
		opacity: 0.8;

		li {
			margin: 0.5rem 0;
		}
	}
}

@keyframes spin {
	to {
		transform: rotate(360deg);
	}
}

// 반응형 스타일
@media (max-width: 768px) {
	.search-results-container {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1000;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		pointer-events: none;
	}

	.search-results-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(4px);
		z-index: 999;
		pointer-events: auto;
	}

	.search-results {
		position: relative;
		background: var(--secondary-bg);
		border-radius: 20px 20px 0 0;
		border: none;
		box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.2);
		max-height: 85vh;
		margin: 0;
		padding: 1rem 0;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		pointer-events: auto;
		transform: translateZ(0);
		will-change: transform;

		// 스크롤바 스타일 수정
		&::-webkit-scrollbar {
			width: 4px;
		}

		&::-webkit-scrollbar-track {
			background: transparent;
		}

		&::-webkit-scrollbar-thumb {
			background: var(--border-color);
			border-radius: 4px;
		}
	}

	// iOS 안전 영역 대응
	@supports (-webkit-touch-callout: none) {
		.search-results {
			padding-bottom: calc(env(safe-area-inset-bottom) + 1rem);
		}
	}

	.search-loading {
		padding: 2rem 1rem;
	}

	.search-result-item {
		padding: 0.8rem 1rem;
		gap: 0.8rem;

		.result-icon {
			width: 42px;
			height: 42px;
			border-radius: 6px;
		}

		.result-info {
			.result-type {
				font-size: 0.8rem;
				margin-bottom: 0.1rem;
			}

			.result-name {
				font-size: 1rem;
				margin-bottom: 0.1rem;
			}

			.result-description {
				font-size: 0.85rem;
			}
		}

		.result-shortcut {
			display: none;
		}

		&:active {
			background: var(--hover-highlight);
			.result-type {
				color: var(--highlight);
			}
		}
	}

	.search-no-results {
		padding: 2rem 1rem;

		p {
			font-size: 1rem;
		}

		.search-suggestions {
			font-size: 0.85rem;

			li {
				margin: 0.4rem 0;
			}
		}
	}
}
</style>
