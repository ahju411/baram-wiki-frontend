<template>
	<div
		class="bg-layer-bg min-h-screen p-4 sm:p-8 font-pretendard text-game-primary"
	>
		<div class="max-w-6xl mx-auto">
			<!-- 검색 필터 섹션 -->
			<div class="bg-layer-surface rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
				<h2 class="text-xl font-bold mb-4 sm:mb-6">아이템 검색</h2>

				<div class="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-6">
					<!-- 아이템 타입 -->
					<div>
						<h3 class="font-bold mb-2">아이템</h3>
						<div class="flex flex-wrap gap-2">
							<div
								v-for="(item, index) in [
									'무기',
									'갑옷',
									'방패',
									'투구',
									'반지',
									'목걸이',
								]"
								:key="index"
								@click="selectOption('item', index.toString())"
								:class="[
									'cursor-pointer px-3 py-2 rounded min-w-[80px] text-center',
									selectedItem === index.toString()
										? 'bg-layer-overlay text-game-legendary'
										: 'text-game-secondary',
								]"
							>
								{{ item }}
							</div>
						</div>
					</div>

					<!-- 성별 -->
					<div>
						<h3 class="font-bold mb-2">성별</h3>
						<div class="flex flex-wrap gap-2">
							<div
								v-for="(sex, index) in ['공통', '남자', '여자']"
								:key="index"
								@click="selectOption('sex', index.toString())"
								:class="[
									'cursor-pointer px-3 py-2 rounded min-w-[80px] text-center',
									selectedSex === index.toString()
										? 'bg-layer-overlay text-game-legendary'
										: 'text-game-secondary',
									sexButtonController === '1' && index !== 0
										? 'opacity-50 pointer-events-none'
										: '',
								]"
							>
								{{ sex }}
							</div>
						</div>
					</div>

					<!-- 직업 -->
					<div>
						<h3 class="font-bold mb-2">직업</h3>
						<div class="flex flex-wrap gap-2">
							<div
								v-for="(job, index) in [
									'공통',
									'전사',
									'도적',
									'주술사',
									'도사',
								]"
								:key="index"
								@click="selectOption('job', index.toString())"
								:class="[
									'cursor-pointer px-3 py-2 rounded min-w-[80px] text-center',
									selectedJob === index.toString()
										? 'bg-layer-overlay text-game-legendary'
										: 'text-game-secondary',
								]"
							>
								{{ job }}
							</div>
						</div>
					</div>

					<!-- 레벨 슬라이더 -->
					<div>
						<h3 class="font-bold mb-2">레벨 범위</h3>
						<client-only>
							<n-slider
								class="w-full"
								v-model:value="sliderValue"
								:step="10"
								:min="0"
								:max="99"
								:range="true"
								:marks="marks"
							/>
						</client-only>
					</div>
				</div>

				<!-- 검색 버튼 -->
				<div class="mt-6 flex justify-center">
					<button
						@click="searchItemList"
						class="bg-layer-overlay px-6 py-2 rounded-lg hover:bg-game-legendary hover:text-layer-bg transition-colors"
					>
						검색
					</button>
				</div>
			</div>

			<!-- 검색 결과 섹션 -->
			<div class="bg-layer-surface rounded-lg p-4 sm:p-6 mb-6">
				<div class="flex justify-between items-center">
					<h2 class="text-xl font-bold">검색 결과</h2>
					<div class="flex items-center gap-2">
						<span class="text-game-secondary">정렬:</span>
						<select
							v-model="sortOption"
							class="bg-layer-overlay px-3 py-2 rounded-lg text-sm"
							@change="sortItems"
						>
							<option value="level_asc">레벨 낮은순</option>
							<option value="level_desc">레벨 높은순</option>
							<option value="power_asc" v-if="tableFormat === '0'">
								위력 낮은순
							</option>
							<option value="power_desc" v-if="tableFormat === '0'">
								위력 높은순
							</option>
							<option value="ac_asc" v-if="tableFormat === '1'">
								AC 낮은순
							</option>
							<option value="ac_desc" v-if="tableFormat === '1'">
								AC 높은순
							</option>
						</select>
					</div>
				</div>
			</div>

			<!-- 아이템 결과 목 -->
			<div class="space-y-4">
				<div v-if="dataLoading" class="text-center py-8">
					<p>데이터 로딩중 ...</p>
				</div>

				<div v-else-if="itemtable && itemtable.length > 0">
					<div
						v-for="(item, index) in itemtable"
						:key="index"
						class="bg-layer-surface rounded-lg p-4 mb-4"
					>
						<!-- 아이템 카드 내용 -->
						<div class="flex flex-col gap-4">
							<!-- 아이템 이미지와 기본 정보 -->
							<div class="flex gap-4">
								<div
									class="w-16 h-16 bg-layer-overlay rounded-lg p-2 flex-shrink-0"
								>
									<NuxtLink :to="`/item/${item.id}`">
										<NuxtImg
											:src="`https://evfuckbgifbr27188584.gcdn.ntruss.com/item/${item.images}`"
											class="w-full h-full object-contain"
										/>
									</NuxtLink>
								</div>

								<div class="flex-1">
									<div class="flex items-center gap-2 mb-1">
										<NuxtLink
											:to="`/item/${item.id}`"
											class="text-lg font-bold hover:text-game-legendary"
										>
											{{ item.name }}
										</NuxtLink>
									</div>

									<div class="flex flex-wrap gap-x-6 gap-y-1">
										<div class="flex items-center gap-1 text-sm">
											<span class="text-game-secondary">레벨:</span>
											<span>{{ item.reqlevel }}</span>
										</div>
										<div class="flex items-center gap-1 text-sm">
											<span class="text-game-secondary">직업:</span>
											<span>{{ jobFormatter(item.reqjob) }}</span>
										</div>
										<div
											v-if="item.smin"
											class="flex items-center gap-1 text-sm"
										>
											<span class="text-game-secondary">위력:</span>
											<span
												>{{ item.smin
												}}{{ item.smax ? ` ~ ${item.smax}` : '' }}</span
											>
										</div>
										<div v-if="item.ac" class="flex items-center gap-1 text-sm">
											<span class="text-game-secondary">AC:</span>
											<span>{{ item.ac }}</span>
										</div>
									</div>
								</div>
							</div>

							<!-- 스탯 정보 섹션 -->
							<div class="border-t border-border-light pt-4">
								<div class="text-sm text-game-secondary mb-2">아이템 스탯</div>
								<div class="flex flex-wrap gap-2">
									<template v-for="(stat, label) in stats" :key="label">
										<div
											class="group relative w-10 h-10"
											v-if="hasStatValue(item[stat])"
										>
											<div
												class="w-full h-full bg-layer-overlay rounded p-1 cursor-pointer flex items-center justify-center border border-solid border-border-legendary"
											>
												<span class="text-xs text-center">{{ label }}</span>
											</div>
											<div
												class="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-layer-surface border border-border-light rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"
											>
												+{{ item[stat] }}
											</div>
										</div>
										<div
											v-else
											class="w-10 h-10 bg-layer-overlay rounded p-1 flex items-center justify-center"
										>
											<span class="text-xs text-center text-game-secondary">{{
												label
											}}</span>
										</div>
									</template>
								</div>
							</div>

							<!-- 드롭 몬스터 섹션 -->
							<div
								v-if="item.MobDrops.length > 0"
								class="border-t border-border-light pt-4"
							>
								<div class="text-sm text-game-secondary mb-2">드롭 몬스터</div>
								<div class="flex flex-wrap gap-2">
									<div
										v-for="(drop, dropIndex) in item.MobDrops"
										:key="dropIndex"
										class="group relative"
									>
										<div
											class="w-10 h-10 bg-layer-overlay rounded p-1 cursor-pointer"
										>
											<NuxtLink :to="`/monster/${drop.mob_id}`">
												<NuxtImg
													:src="`https://evfuckbgifbr27188584.gcdn.ntruss.com/monster/${drop.MobMaster.images}`"
													class="w-full h-full object-contain"
												/>
											</NuxtLink>
										</div>
										<div
											class="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-layer-surface border border-border-light rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
										>
											{{ drop.MobMaster.name }}
										</div>
									</div>
								</div>
							</div>
						</div>

						<!-- 아이템 정보 섹션 -->
						<div
							v-if="hasItemInfo(item)"
							class="border-t border-border-light mt-4 pt-4"
						>
							<div class="text-sm text-game-secondary mb-2">아이템 정보</div>
							<div class="flex flex-wrap gap-2">
								<!-- 기본 정보 -->
								<div v-if="item.info" class="group relative">
									<div
										class="px-3 py-1 bg-layer-overlay rounded cursor-pointer border border-solid border-border-legendary"
									>
										기본 정보
									</div>
									<div
										class="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-layer-surface border border-border-light rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10"
									>
										{{ item.info }}
									</div>
								</div>

								<!-- 세트 정보 -->
								<div v-if="item.setinfo" class="group relative">
									<div
										class="px-3 py-1 bg-layer-overlay rounded cursor-pointer border border-solid border-border-legendary"
									>
										세트 효과
									</div>
									<div
										class="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-layer-surface border border-border-light rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"
									>
										{{ item.setinfo }}
									</div>
								</div>

								<!-- 추가 정보 -->
								<div v-if="item.addinfo" class="group relative">
									<div
										class="px-3 py-1 bg-layer-overlay rounded cursor-pointer border border-game-highlight"
									>
										추가 효과
									</div>
									<div
										class="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-layer-surface border border-border-light rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"
									>
										{{ item.addinfo }}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div v-else class="text-center py-8">
					<p>아이템이 없습니다.</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeMount, computed } from 'vue';
import { NSlider } from 'naive-ui';
import type { AllItem } from '~/types/allitem';

/** 정의 **/
const selectedItem = ref('0');
const selectedSex = ref('0');
const selectedJob = ref('0');
const tableFormat = ref('0');
const sexButtonController = ref('1');
const itemtable = ref<AllItem[]>([]);
const sliderValue = ref([0, 99]);
const dataLoading = ref(true);
const marks = {
	0: '0',
	10: '10',
	20: '20',
	30: '30',
	40: '40',
	50: '50',
	60: '60',
	70: '70',
	80: '80',
	90: '90',
	99: '99',
};
const selectOption = (group: 'item' | 'sex' | 'job', value: string) => {
	if (group === 'item') {
		selectedItem.value = value;
		if (selectedItem.value == '1' || selectedItem.value == '3') {
			sexButtonController.value = '0';
		} else {
			sexButtonController.value = '1';
			selectedSex.value = '0';
		}
	} else if (group === 'sex') {
		selectedSex.value = value;
	} else if (group === 'job') {
		selectedJob.value = value;
	}
};

/** 세션 스토리지 관련 함수 **/
const saveToSessionStorage = () => {
	const searchState = {
		selectedItem: selectedItem.value,
		selectedSex: selectedSex.value,
		selectedJob: selectedJob.value,
		sliderValue: sliderValue.value,
		sexButtonController: sexButtonController.value,
	};
	sessionStorage.setItem('itemSearchState', JSON.stringify(searchState));
};

const loadFromSessionStorage = () => {
	const savedState = sessionStorage.getItem('itemSearchState');
	if (savedState) {
		const state = JSON.parse(savedState);
		selectedItem.value = state.selectedItem;
		selectedSex.value = state.selectedSex;
		selectedJob.value = state.selectedJob;
		sliderValue.value = state.sliderValue;
		sexButtonController.value = state.sexButtonController;
		return true;
	}
	return false;
};

/** 검색 함수 */
const searchItemList = async () => {
	const params = {
		item: selectedItem.value,
		sex: selectedSex.value,
		job: selectedJob.value,
		lmin: sliderValue.value[0],
		lmax: sliderValue.value[1],
	};

	saveToSessionStorage(); // 검색할 때마다 상태 저장

	const queryString = new URLSearchParams(params).toString();

	try {
		const data = await $fetch(`/api/allitem?${queryString}`);
		itemtable.value = data || [];

		// 검색 후 정렬 적용
		sortItems();

		if (selectedItem.value == '0') {
			tableFormat.value = '0';
		} else {
			tableFormat.value = '1';
		}
	} catch (err) {
		console.error('검색 중 오류 발생:', err);
		itemtable.value = [];
	}
};

/** 직업 함수 **/
const jobFormatter = (vals) => {
	if (vals == 0) {
		return '공통';
	} else if (vals == 1) {
		return '전사';
	} else if (vals == 2) {
		return '도적';
	} else if (vals == 3) {
		return '주술사';
	} else if (vals == 4) {
		return '도사';
	}
};

useSeoMeta({
	title: '바람위키 | 아이템 테이블 ',
	description: '바람의 나라 아이템 테이블 정보 ',
});

onMounted(() => {
	setTimeout(async () => {
		const hasStoredState = loadFromSessionStorage();
		if (hasStoredState) {
			await searchItemList();
		} else {
			await searchItemList(); // 저장된 상태가 없으면 기본값으로 검색
		}
		dataLoading.value = false;
	}, 100);
});

const sortOption = ref('level_asc');

const sortItems = () => {
	if (!itemtable.value) return;

	itemtable.value.sort((a, b) => {
		switch (sortOption.value) {
			case 'level_asc':
				return a.reqlevel - b.reqlevel;
			case 'level_desc':
				return b.reqlevel - a.reqlevel;
			case 'power_asc':
				return (a.smin || 0) - (b.smin || 0);
			case 'power_desc':
				return (b.smin || 0) - (a.smin || 0);
			case 'ac_asc':
				return (a.ac || 0) - (b.ac || 0);
			case 'ac_desc':
				return (b.ac || 0) - (a.ac || 0);
			default:
				return 0;
		}
	});
};

const hasBasicStats = (item: AllItem) => {
	return item.MHP || item.MMP || item.hr;
};

const hasMainStats = (item: AllItem) => {
	return item.M || item.W || item.G;
};

const hasCombatStats = (item: AllItem) => {
	return item.hit || item.dam || item.md;
};

// 아이템 정보 존재 여부 확인 함수 추가
const hasItemInfo = (item: AllItem) => {
	return item.info || item.setinfo || item.addinfo;
};

// 스탯 정보 매핑
const stats = {
	체력: 'MHP',
	마력: 'MMP',
	힘: 'M',
	민첩: 'W',
	지능: 'G',
	명중: 'hit',
	파괴: 'dam',
	마방: 'md',
	// 필요한 스탯 추가
};

// 스탯 값 존재 여부 체크 함수
const hasStatValue = (value: any) => {
	return value !== null && value !== undefined && value !== 0;
};
</script>

<style scoped lang="scss">
.screener-container {
	padding: 24px;
	max-width: 1400px;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	gap: 50px;
}

.screener-option-section,
.screener-table-section {
	background-color: var(--panel-bg);
	border: 2px solid var(--border-color);
	border-radius: 12px;
	padding: 20px;
	transition: transform 0.2s ease, box-shadow 0.2s ease;
	position: relative;
	overflow: hidden;
}

.screener-option-section {
	display: flex;
	flex-direction: column;
	gap: 20px;
	& > div:not(.search-button) {
		display: flex;
		width: 1200px;
		.screener-title {
			width: 100px;
			//height: 40px;
			padding: 10px 15px;
			color: var(--highlight);
			font-weight: bold;
		}
		.screener-option-box {
			display: flex;
			& > div:not(.level-slider) {
				border: 1px solid;
				display: flex;
				padding: 13px 20px;
				cursor: pointer;
			}
			& > div:hover {
				background-color: var(--secondary-bg);
			}
			.on {
				background-color: var(--secondary-bg);
			}
			.hide {
				pointer-events: none;
				opacity: 0.5;
			}
		}
	}
	.search-button:hover {
		color: var(--secondary-text);
		background-color: var(--secondary-bg);
		border-radius: 5px;
	}
	.search-button {
		display: flex;
		justify-content: center;
		//width: 100px;
		//height: 50px;
		margin: 0 auto;
		align-items: center;
		position: relative;
		cursor: pointer;
		padding: 15px 30px;
		color: var(--text-color);
		text-decoration: none;
		font-weight: bold;
		min-width: 80px;
		text-align: center;
		box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2), 0 2px 5px rgba(0, 0, 0, 0.1);
	}
	.search-button::after {
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
	.search-button::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
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
}

.screener-table-section {
	font-size: 12px;
	.allitem-table {
		width: 100%;
		thead {
			th {
				padding: 13px 10px;
				border: 1px solid var(--border-color);
				background-color: var(--secondary-bg);
			}
		}
		tbody {
			td {
				padding: 13px 10px;
				border: 1px solid var(--border-color);
				text-align: center;
				vertical-align: middle;
				img {
					width: 33px;
					height: 33px;
					object-fit: contain;
				}
			}

			td a {
				color: var(--text-color);
				text-decoration: none;
				&:hover {
					color: var(--highlight);
				}
			}
			td.lt {
				text-align: left !important;
			}
			td.monster-box {
				display: flex;
				justify-content: center;
				align-items: center;
				gap: 5px;
				.monster-card {
					position: relative;
					display: flex;
					justify-content: center;
					.monster-detail {
						img {
							width: 33px;
							height: 33px;
							cursor: pointer;
							object-fit: contain;
						}
					}
					.info {
						color: #fff;
						position: absolute;
						left: 0;
						top: -30px;
						background: rgba(0, 0, 0, 0.5);
						box-sizing: border-box;
						width: auto;
						padding: 5px;
						opacity: 0;
						transition: opacity 0.35s ease-in-out;
						p {
							text-overflow: ellipsis;
							white-space: nowrap;
							text-transform: uppercase;
						}
					}
				}
				.monster-card:hover {
					.info {
						opacity: 1;
					}
				}
			}
		}
	}
}
.level-type-pos {
	.screener-option-box {
		width: 400px;
		.level-slider {
			display: flex;
			padding: 13px 20px;
			cursor: pointer;
		}
	}
}
</style>
