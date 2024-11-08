<template>
	<div class="level-guide">
		<!-- 탭 네비게이션 추가 -->
		<div class="level-tabs">
			<button
				v-for="(group, title) in groupedLevels"
				:key="title"
				:class="['tab-button', { active: activeTab === title }]"
				@click="activeTab = title"
			>
				{{ title }}
			</button>
		</div>

		<!-- 탭 컨텐츠 -->
		<div
			v-for="(group, title) in groupedLevels"
			:key="title"
			v-show="activeTab === title"
		>
			<ul class="level-list">
				<li v-for="level in group" :key="level.id" class="level-item">
					<div class="level-header">
						<h3 class="level-name">{{ level.name }}</h3>
						<span class="level-range">{{ level.level }}</span>
					</div>
					<div class="level-content">
						<div class="level-image">
							<NuxtImg
								:src="`/images/map/${level.images}`"
								:alt="level.name"
								width="300"
								height="300"
							/>
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
											<NuxtImg
												:src="`/images/monster/${monsterData.monster.images}`"
												:alt="monsterData.monster.name"
												width="48"
												height="48"
											/>
										</td>
										<td>{{ monsterData.monster.name }}</td>
										<td>{{ monsterData.monster.exp }}</td>
										<td class="drop-items" colspan="3">
											<div class="drop-item-list">
												<div
													v-for="drop in monsterData.monster.dropItems"
													:key="drop.item.id"
													class="drop-item"
												>
													<NuxtImg
														:src="`/images/item/${drop.item.images}`"
														:alt="drop.item.name"
														width="32"
														height="32"
													/>
													<span class="drop-name">{{ drop.item.name }}</span>
													<span class="drop-price"
														>{{ drop.item.price }}전</span
													>
												</div>
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

const { data } = await useAsyncData<MapLevel>('map-level', () =>
	$fetch('/api/map/level-guide')
);

const groupedLevels = computed(() => {
	if (!data.value) return {};

	return data.value.reduce((acc, level) => {
		// 레벨 범위에서 첫 번째 숫자 추출
		const startLevel = parseInt(level.level.split('~')[0].trim());

		let group = '그 외';
		if (!isNaN(startLevel)) {
			if (startLevel <= 40) group = '1 ~ 40';
			else if (startLevel <= 60) group = '41 ~ 60';
			else group = '61 이상';
		}

		// 몬스터 경험치 기준으로 정렬
		const sortedMonsters = {
			...level,
			monsters: [...level.monsters].sort(
				(a, b) => a.monster.exp - b.monster.exp
			),
		};

		if (!acc[group]) acc[group] = [];
		acc[group].push(sortedMonsters);
		return acc;
	}, {} as Record<string, MapLevel[]>);
});

const activeTab = ref('1 ~ 40'); // 기본 활성 탭 설정

useSeoMeta({
	title: `바람위키 | 맵 레벨 가이드`,
	description: `바람의 나라 맵 레벨 가이드`,
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

			&.active {
				background: var(--button-gradient);
				color: var(--text-color);
			}

			&:hover {
				background: var(--hover-highlight);
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
			color: var(--secondary-text);
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
</style>
