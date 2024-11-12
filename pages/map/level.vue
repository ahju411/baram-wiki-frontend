<template>
	<div class="level-guide">
		<!-- 탭 네비게이션 추가 -->
		<div class="level-tabs">
			<button
				v-for="tab in tabs"
				:key="tab.id"
				:class="['tab-button', { active: activeTab === tab.id }]"
				@click="activeTab = tab.id"
			>
				{{ tab.name }}
			</button>
		</div>

		<!-- 탭 컨텐츠 -->
		<div v-for="tab in tabs" :key="tab.id" v-show="activeTab === tab.id">
			<ul class="level-list">
				<li v-for="level in groupedLevels" :key="level.id" class="level-item">
					<div class="level-header">
						<h3 class="level-name">
							{{ level.name }} ({{ level.xcoord }}, {{ level.ycoord }})
						</h3>
						<span class="level-range">{{ level.level }}</span>
					</div>
					<div class="level-content">
						<div class="level-image">
							<NuxtLink :to="`/map/${level.id}`">
								<NuxtImg
									:src="`https://evfuckbgifbr27188584.gcdn.ntruss.com/map/${level.images}`"
									:alt="level.name"
									width="300"
									height="300"
								/>
							</NuxtLink>
						</div>
						<p class="level-info">{{ level.information }}</p>

						<!-- 몬스터 리스트 부분만 수정 -->
						<div class="monster-list">
							<table>
								<thead>
									<tr>
										<th>이미지</th>
										<th>몬스터명</th>
										<th>경험치</th>
										<th colspan="3">드롭 아이템</th>
									</tr>
								</thead>
								<tbody>
									<tr
										v-for="(monsterData, index) in level.monsters"
										:key="index"
									>
										<td class="monster-image">
											<NuxtLink :to="`/monster/${monsterData.monster.id}`">
												<NuxtImg
													:src="`https://evfuckbgifbr27188584.gcdn.ntruss.com/monster/${monsterData.monster.images}`"
													:alt="monsterData.monster.name"
													width="48"
													height="48"
												/>
											</NuxtLink>
										</td>
										<td>
											<NuxtLink
												:to="`/monster/${monsterData.monster.id}`"
												class="monster-name"
											>
												{{ monsterData.monster.name }}
											</NuxtLink>
										</td>
										<td>{{ monsterData.monster.exp }}</td>
										<td class="drop-items" colspan="3">
											<div class="drop-item-list">
												<NuxtLink
													v-for="drop in monsterData.monster.dropItems"
													:key="drop.item.id"
													:to="`/item/${drop.item.id}`"
													class="drop-item"
												>
													<NuxtImg
														:src="`https://evfuckbgifbr27188584.gcdn.ntruss.com/item/${drop.item.images}`"
														:alt="drop.item.name"
														width="32"
														height="32"
													/>
													<span class="drop-name">{{ drop.item.name }}</span>
													<span class="drop-price"
														>{{ drop.item.price }}전</span
													>
												</NuxtLink>
											</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script lang="ts" setup>
import type { MapLevel } from '~/types/map';

// 탭 설정 정의
const tabs = [
	{ id: 1, name: '초급사냥터' },
	{ id: 2, name: '중급사냥터' },
	{ id: 3, name: '고급사냥터' },
	// { id: 4, name: '길림성' },
	// { id: 5, name: '일본' },
	// { id: 6, name: '용궁' },
	// { id: 7, name: '중국' },
	// { id: 8, name: '도삭산' },
	// { id: 9, name: '중국남부' },
	// { id: 10, name: '4차신전' },
	// { id: 11, name: '환상의섬' },
	// { id: 12, name: '12지신' },
	// { id: 13, name: '북방대초원' },
];

const activeTab = ref(1);

// API 호출 함수
const fetchLevelData = async (range: number) => {
	return await $fetch(`/api/map/level-guide?range=${range}`);
};

// 초기 데이터 로드 및 탭 변경시 데이터 갱신
const { data: groupedLevels } = await useAsyncData(
	'map-level',
	() => fetchLevelData(activeTab.value),
	{
		watch: [activeTab],
	}
);

// SEO 메타 설정
useSeoMeta({
	title: `바람위키 | 맵 레벨 가이드 - ${tabs[activeTab.value - 1].name}`,
	description: `바람의 나라 맵 레벨 가이드 - ${tabs[activeTab.value - 1].name}`,
});
</script>

<style lang="scss" scoped>
.level-guide {
	padding: 20px;

	.level-tabs {
		display: flex;
		gap: 10px;
		margin-bottom: 20px;

		.tab-button {
			padding: 10px 20px;
			border: 1px solid var(--border-color);
			border-radius: 4px;
			background: var(--panel-bg);
			cursor: pointer;
			transition: all 0.2s ease;
			color: var(--secondary-text);

			&.active {
				background: var(--button-gradient);
				color: var(--text-color);
			}
		}
	}

	.level-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.level-item {
		background-color: var(--panel-bg);
		border: 1px solid var(--border-color);
		border-radius: 8px;
		overflow: hidden;
		transition: transform 0.2s ease;

		&:hover {
			transform: translateY(-2px);
			box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
		}
	}

	.level-header {
		background: var(--button-gradient);
		padding: 12px 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.level-name {
			margin: 0;
			color: var(--text-color);
			font-size: 1.2rem;
		}

		.level-range {
			color: var(--text-color);
			font-size: 0.9rem;
		}
	}

	.level-content {
		padding: 20px;

		.level-image {
			width: 300px;
			height: 300px;
			margin: 0 auto 15px;

			img {
				width: 100%;
				height: 100%;
				object-fit: contain;
				border-radius: 4px;
			}

			&:hover {
				opacity: 0.8;
			}
		}

		.level-info {
			color: var(--text-color);
			margin-bottom: 20px;
			line-height: 1.6;
		}
	}

	.monster-list {
		margin-top: 20px;
		overflow-x: auto;

		table {
			width: 100%;
			border-collapse: collapse;
			background-color: var(--secondary-bg);
			border-radius: 8px;
			overflow: hidden;

			th,
			td {
				padding: 12px;
				text-align: left;
				border-bottom: 1px solid var(--border-color);
				vertical-align: middle;
			}

			th {
				background-color: var(--button-gradient);
				color: var(--text-color);
				font-weight: 600;
				text-align: center;
			}

			td {
				text-align: center;
			}

			.monster-image {
				width: 48px;
				height: 48px;
				padding: 4px;

				img {
					width: 100%;
					height: 100%;
					object-fit: contain;
					vertical-align: middle;
				}

				&:hover {
					opacity: 0.8;
				}
			}

			.monster-name {
				color: var(--text-color);

				&:hover {
					color: var(--secondary-highlight);
				}
			}

			.drop-items {
				.drop-item-list {
					display: flex;
					flex-wrap: wrap;
					gap: 10px;
					justify-content: center;
					align-items: center;
				}

				.drop-item {
					display: inline-flex;
					align-items: center;
					gap: 8px;

					img {
						width: 32px;
						height: 32px;
						vertical-align: middle;
					}

					.drop-name {
						color: var(--text-color);
					}

					.drop-price {
						color: var(--secondary-text);
					}

					&:hover {
						.drop-name {
							color: var(--secondary-highlight);
						}
					}
				}
			}
		}
	}

	.drop-items {
		margin-top: 10px;

		h5 {
			font-size: 0.9rem;
			margin-bottom: 5px;
		}

		.drop-item-list {
			display: flex;
			flex-wrap: wrap;
			gap: 8px;
		}

		.drop-item {
			display: flex;
			align-items: center;
			gap: 5px;
			font-size: 0.8rem;

			img {
				width: 32px;
				height: 32px;
			}

			.drop-name {
				color: var(--text-color);
			}

			.drop-price {
				color: var(--secondary-text);
			}
		}
	}
}

@media screen and (max-width: 768px) {
	.level-guide {
		padding: 0px;
		padding-top: 12px;
	}
}
</style>
