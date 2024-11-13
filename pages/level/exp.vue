<template>
	<div class="exp-container">
		<div class="job-tabs">
			<button
				v-for="job in jobs"
				:key="job.code"
				:class="{ active: currentJob === job.code }"
				@click="currentJob = job.code"
			>
				{{ job.name }}
			</button>
		</div>

		<div
			v-for="job in jobs"
			:key="job.code"
			:class="[
				'exp-box',
				`exp-${job.code}`,
				{ active: currentJob === job.code },
			]"
		>
			<exp-card :data="lvlData[job.code]" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import ExpCard from '@/components/level/ExpCard.vue';

const currentJob = ref('w');
const jobs = [
	{ code: 'w', name: '전사' },
	{ code: 'n', name: '도적' },
	{ code: 'p', name: '주술사' },
	{ code: 't', name: '도사' },
];

const lvlData = ref({
	w: [],
	n: [],
	p: [],
	t: [],
});

const { data: levelData } = await useAsyncData(
	'levelData',
	() => $fetch('/api/level'),
	{
		server: true, // SSR 활성화
		immediate: true, // 즉시 데이터 fetch
	}
);

useSeoMeta({
    title: '바람위키 | 레벨별 경험치표',
    description: '바람의 나라 레벨별 경험치표',
});

// levelData를 watch하여 변경사항 감지 및 반영
watch(
	levelData,
	(newData) => {
		if (newData) {
			lvlData.value = newData;
		}
	},
	{ immediate: true }
);
</script>

<style scoped lang="scss">
.exp-title {
  color: var(--highlight);
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}
.exp-container {
	padding: 16px;
	max-width: 1400px;
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 20px;
	margin: 0 auto;

	.job-tabs {
		display: none;
		gap: 8px;
		margin-bottom: 16px;

		button {
			padding: 8px 16px;
			border: 1px solid var(--border-color);
			background-color: var(--panel-bg);
			color: var(--text-color);
			border-radius: 8px;
			cursor: pointer;

			&.active {
				background-color: var(--highlight);
				color: white;
			}
		}
	}

	.exp-box {
		width: 100%;
		height: auto;
		min-height: 500px;
		background-color: var(--panel-bg);
		border: 2px solid var(--border-color);
		border-radius: 12px;
		padding: 12px;
	}
}

@media screen and (max-width: 768px) {
	.exp-container {
		padding: 8px;
		gap: 12px;

		.job-tabs {
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
		}

		.exp-box {
			display: none;
			width: auto;
			padding: 8px;
			border-radius: 8px;

			&.active {
				display: block;
			}
		}
	}
}
</style>
