<template>
	<div class="exp-card" v-if="props.data && props.data.length > 0">
		<div class="title">{{ titleFormat(props.data[0].job) }} 필요 경험치</div>
		<div class="level-table">
			<div v-for="(group, index) in chunkData(props.data, 25)" :key="index">
				<table :class="{ highlight: index % 2 !== 0 }">
					<thead>
						<tr>
							<th>레벨</th>
							<th>필요경험치</th>
							<th>토탈경험치</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item, index) in group" :key="index">
							<td class="ct">{{ item.level }}</td>
							<td class="rt">{{ formatNumber(item.exp) }}</td>
							<td class="rt">{{ formatNumber(item.total) }}</td>
						</tr>
						<tr v-if="group.length < 25">
							<td>-</td>
							<td>-</td>
							<td>-</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
	data: {
		type: Array,
		required: true,
	},
});

// 숫자 포맷팅
const formatNumber = (num: number) => {
	return new Intl.NumberFormat().format(num);
};

// 직업명 포맷팅
const titleFormat = (vals) => {
	if (vals == 'w') return '전사';
	else if (vals == 'n') return '도적';
	else if (vals == 'p') return '주술사';
	else return '도사';
};

// 데이터를 25개씩 분할하는 함수
const chunkData = (data: any[], size: number) => {
	const result = [];
	for (let i = 0; i < data.length; i += size) {
		result.push(data.slice(i, i + size));
	}
	return result;
};
</script>

<style scoped lang="scss">
.exp-card {
	font-size: 13px;

	.title {
		font-size: 18px;
		margin-bottom: 24px;
		font-weight: bold;
		color: var(--highlight);
		text-align: center;
	}

	.level-table {
		width: 100%;
		display: flex;
		flex-direction: row;
		gap: 16px;
		justify-content: flex-start;
		overflow-x: auto;
		padding-bottom: 12px;

		.highlight {
			background-color: rgba(44, 34, 25, 0.6);
		}

		table {
			min-width: 280px;
			border-collapse: collapse;

			thead {
				position: sticky;
				top: 0;
				z-index: 1;

				tr th {
					border: 1px solid var(--border-color);
					padding: 8px 10px;
					text-align: left;
					background-color: var(--main-bg);
					white-space: nowrap;
				}
			}

			tbody {
				tr {
					.ct {
						text-align: center;
					}
					.rt {
						text-align: right;
					}

					td {
						border: 1px solid var(--border-color);
						padding: 8px 10px;
						white-space: nowrap;
					}

					&:hover {
						background-color: var(--hover-highlight);
					}
				}
			}
		}
	}
}

@media screen and (max-width: 768px) {
	.exp-card {
		font-size: 12px;

		.title {
			font-size: 16px;
			margin-bottom: 16px;
		}

		.level-table {
			flex-direction: column;
			gap: 12px;

			> div {
				width: 100%;
			}

			table {
				width: 100%;
				min-width: 100%;

				thead tr th,
				tbody tr td {
					padding: 6px 8px;
				}
			}
		}
	}
}
</style>
