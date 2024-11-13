<template>
	<div class="calculator">
		<div class="calculator__header">
			<h2>레벨업 계산기</h2>
			<p>직업과 몬스터를 선택하여 레벨업에 필요한 사냥 수를 확인하세요!</p>
		</div>

		<div class="calculator__content">
			<!-- 직업 선택 -->
			<div class="job-selector">
				<h3>직업 선택</h3>
				<div class="job-buttons">
					<button
						v-for="job in jobs"
						:key="job.value"
						:class="['job-button', { active: selectedJob === job.value }]"
						@click="selectedJob = job.value"
					>
						{{ job.label }}
					</button>
				</div>
			</div>

			<!-- 몬스터 검색 -->
			<div class="monster-search">
				<h3>몬스터 검색</h3>
				<div class="search__bar">
					<input
						ref="searchInput"
						type="text"
						v-model="keyword"
						placeholder="몬스터 이름을 입력하세요"
						@input="handleInput"
						@keydown.esc="keyword = ''"
						@keydown.up="handleKeyDown"
						@keydown.down="handleKeyDown"
						@keydown.enter="handleEnter"
						@focus="handleFocus"
						class="search__input"
					/>
				</div>
				<div class="search__results" v-show="keyword">
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
							v-show="result.type === 'monster'"
						>
							<NuxtImg
								:src="`https://evfuckbgifbr27188584.gcdn.ntruss.com/${result.type}/${result.image}`"
								:alt="result.name"
								width="32"
								height="32"
								class="search__item-image"
							/>
							<span class="search__item-name">{{ result.name }}</span>
						</li>
					</ul>
					<p v-else-if="!isLoading" class="search__no-results">
						검색 결과가 없습니다.
					</p>
					<p v-else class="search__loading">검색 중...</p>
				</div>
			</div>

			<!-- 계산 결과 -->
			<div v-if="calculations.length" class="calculation-results">
				<h3>레벨업 정보</h3>
				<div class="selected-info">
					<div class="monster-info">
						<NuxtImg
							:src="`https://evfuckbgifbr27188584.gcdn.ntruss.com/monster/${selectedMonsterImage}`"
							:alt="selectedMonster"
							width="48"
							height="48"
							class="monster-image"
						/>
						<div>
							<p>
								선택한 몬스터: <span>{{ selectedMonster }}</span>
							</p>
							<p>
								몬스터 경험치:
								<span>{{ formatValue(selectedMonsterExp) }}</span>
							</p>
							<p>
								선택한 직업: <span>{{ selectedJobLabel }}</span>
							</p>
						</div>
					</div>
				</div>
				<div class="results-grid">
					<div
						v-for="calc in calculations"
						:key="calc.level"
						:class="['result-card', { 'level-divider': calc.level % 10 === 0 }]"
					>
						<div class="level-info">
							<span class="level">Lv.{{ calc.level }}</span>
							<span class="exp">{{ formatValue(calc.requiredExp) }} EXP</span>
						</div>
						<div class="monster-count">
							<NuxtImg
								:src="`https://evfuckbgifbr27188584.gcdn.ntruss.com/monster/${selectedMonsterImage}`"
								:alt="selectedMonster"
								width="32"
								height="32"
							/>
							<span>× {{ formatValue(calc.monstersNeeded) }}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Search } from '~/types/search';
import { formatValue } from '~/utils/format';

const jobs = [
	{ label: '전사', value: 'w' },
	{ label: '주술사', value: 'p' },
	{ label: '도적', value: 'n' },
	{ label: '도사', value: 't' },
];

const selectedJob = ref('w');
const selectedJobLabel = computed(
	() => jobs.find((job) => job.value === selectedJob.value)?.label
);

const keyword = ref('');
const results = ref<Search[]>([]);
const isLoading = ref(false);
const resultIndex = ref(0);
const searchInput = ref<HTMLInputElement | null>(null);
const selectedMonster = ref('');
const calculations = ref([]);
const selectedMonsterImage = ref('');
const selectedMonsterExp = ref(0);
// 검색 관련 함수들
const handleInput = async (e: Event) => {
	keyword.value = (e.target as HTMLInputElement).value;
	if (!keyword.value) {
		results.value = [];
		return;
	}

	isLoading.value = true;
	try {
		const { results: searchResults } = await $fetch<{ results: Search[] }>(
			`/api/search/${encodeURIComponent(keyword.value)}`
		);
		results.value = searchResults.filter((result) => result.type === 'monster');
	} catch (error) {
		console.error('검색 중 오류 발생:', error);
		results.value = [];
	} finally {
		isLoading.value = false;
	}
};

const handleKeyDown = (e: KeyboardEvent) => {
	if (!results.value.length) return;

	if (e.key === 'ArrowUp') {
		e.preventDefault();
		resultIndex.value =
			resultIndex.value <= 0 ? results.value.length - 1 : resultIndex.value - 1;
	} else if (e.key === 'ArrowDown') {
		e.preventDefault();
		resultIndex.value =
			resultIndex.value >= results.value.length - 1 ? 0 : resultIndex.value + 1;
	}
};

const handleEnter = async () => {
	if (results.value[resultIndex.value]) {
		await selectMonster(results.value[resultIndex.value]);
	}
};

const handleItemClick = async (result: Search) => {
	await selectMonster(result);
};

const selectMonster = async (monster: Search) => {
	selectedMonster.value = monster.name;
	selectedMonsterImage.value = monster.image;

	keyword.value = '';
	results.value = [];
	resultIndex.value = 0;

	try {
		const response = await $fetch(
			`/api/level/calculate?job=${
				selectedJob.value
			}&mobName=${encodeURIComponent(monster.name)}`
		);
		selectedMonsterExp.value = response.monsterExp;
		calculations.value = response.calculations;
	} catch (error) {
		console.error('계산 중 오류 발생:', error);
	}
};

watch(selectedJob, async () => {
	if (selectedMonster.value) {
		try {
			const response = await $fetch(
				`/api/level/calculate?job=${
					selectedJob.value
				}&mobName=${encodeURIComponent(selectedMonster.value)}`
			);
			selectedMonsterExp.value = response.monsterExp;
			calculations.value = response.calculations;
		} catch (error) {
			console.error('계산 중 오류 발생:', error);
		}
	}
});

useSeoMeta({
    title: '바람위키 | 경험치 계산기',
    description: '바람의 나라 경험치 계산기',
});

const handleFocus = () => {
	// 모바일 환경에서만 스크롤 실행
	if (window.innerWidth <= 768) {
		searchInput.value?.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
	}
};
</script>

<style lang="scss" scoped>
.calculator {
	display: flex;
	flex-direction: column;
	gap: 20px;
	max-width: 800px;
	margin: 0 auto;
	padding: 20px;

	&__header {
		text-align: center;
		margin-bottom: 40px;

		h2 {
			font-size: 1.5rem;
			font-weight: bold;
			color: var(--highlight);
			margin-bottom: 10px;
		}

		p {
			color: var(--secondary-text);
		}
	}
}

.job-selector {
	margin-bottom: 30px;

	h3 {
		margin-bottom: 15px;
		color: var(--text-color);
	}

	.job-buttons {
		display: flex;
		gap: 15px;
		flex-wrap: wrap;
	}

	.job-button {
		padding: 10px 20px;
		background: var(--secondary-bg);
		border: 1px solid var(--border-color);
		color: var(--text-color);
		border-radius: 6px;
		cursor: pointer;
		transition: all 0.3s ease;

		&:hover {
			background: var(--hover-highlight);
			border-color: var(--highlight);
		}

		&.active {
			background: var(--panel-bg);
			border-color: var(--highlight);
			color: var(--highlight);
		}
	}
}

.monster-search {
	margin-bottom: 30px;
	max-width: 500px;
	margin: 0 auto 30px;

	h3 {
		margin-bottom: 15px;
		color: var(--text-color);
	}

	.search__bar {
		position: relative;
		display: flex;
	}

	.search__input {
		width: 100%;
		padding: 8px 12px;
		background: var(--secondary-bg);
		border: 1px solid var(--border-color);
		border-radius: 6px;
		color: var(--text-color);
		font-size: 0.9rem;

		&:focus {
			outline: none;
			border-color: var(--highlight);
		}
	}

	.search__results {
		width: 100%;
		max-height: 300px;
		overflow-y: auto;
		background: var(--panel-bg);
		border: 1px solid var(--border-color);
		border-radius: 6px;
		margin-top: 5px;
		z-index: 10;
	}

	.search__item {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 10px;
		cursor: pointer;
		transition: background 0.3s ease;

		&:hover {
			background: var(--hover-highlight);
		}

		&--active {
			background: var(--hover-highlight);
		}
	}
}

.calculation-results {
	h3 {
		margin-bottom: 15px;
		color: var(--text-color);
	}

	.selected-info {
		margin-bottom: 20px;
		padding: 15px;
		background: var(--secondary-bg);
		border-radius: 6px;

		p {
			margin: 5px 0;

			span {
				color: var(--highlight);
				font-weight: bold;
			}
		}
	}

	.results-grid {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 15px;
		margin-top: 20px;

		.result-card {
			background: var(--secondary-bg);
			border: 1px solid var(--border-color);
			border-radius: 8px;
			padding: 15px;

			.level-info {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				margin-bottom: 10px;

				.level {
					font-weight: bold;
					color: var(--highlight);
				}

				.exp {
					color: var(--secondary-text);
					font-size: 0.9rem;
				}
			}

			.monster-count {
				display: flex;
				align-items: center;
				gap: 8px;
				font-size: 1.1rem;

				img {
					background: var(--panel-bg);
					border-radius: 4px;
					padding: 2px;
				}
			}

			&.level-divider {
				border-bottom: 4px solid var(--highlight);
				padding-bottom: 20px;
				margin-bottom: 5px;
			}
		}
	}

	.monster-info {
		display: flex;
		align-items: center;
		gap: 15px;

		.monster-image {
			border-radius: 8px;
			background: var(--secondary-bg);
			padding: 4px;
		}
	}

	@media screen and (max-width: 1200px) {
		.results-grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	@media screen and (max-width: 992px) {
		.results-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media screen and (max-width: 768px) {
		.results-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media screen and (max-width: 480px) {
		.results-grid {
			grid-template-columns: 1fr;
		}
	}
}
</style>
