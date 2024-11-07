<template>
	<div class="detail-container">
		<p v-if="!monster">Loading...</p>
		<div v-else class="monster-detail">
			<div class="monster-image">
				<NuxtImg
					:src="`/images/monster/${monster.images}`"
					:alt="monster.name"
					width="100"
					height="100"
				/>
				<h2>{{ monster.name }}</h2>
			</div>

			<div class="monster-info">
				<div class="description">
					<h3>몬스터 설명</h3>
					<p>{{ monster.information }}</p>
				</div>
				<div class="stats">
					<h3>기본 정보</h3>
					<table>
						<tbody>
							<tr>
								<td>레벨</td>
								<td>{{ monster.level }}</td>
							</tr>
							<tr>
								<td>HP</td>
								<td>{{ monster.hp }}</td>
							</tr>
							<tr>
								<td>MP</td>
								<td>{{ monster.mp }}</td>
							</tr>
							<tr>
								<td>경험치</td>
								<td>{{ monster.exp }}</td>
							</tr>
							<tr>
								<td>방어력</td>
								<td>{{ monster.defense }}</td>
							</tr>
							<tr>
								<td>마법 방어력</td>
								<td>{{ monster.mdefense }}</td>
							</tr>
							<tr>
								<td>몬스터 타입</td>
								<td>{{ monster.mtype }}</td>
							</tr>
							<tr>
								<td>리스폰 시간</td>
								<td>{{ monster.respawn }}</td>
							</tr>
						</tbody>
					</table>
				</div>

				<div class="drops">
					<h3>드랍 아이템</h3>
					<ul>
						<li v-for="drop in monster.drops" :key="drop.item_id">
							<NuxtLink :to="`/item/${drop.item.id}`">
								<div class="item-card">
									<NuxtImg :src="drop.item.iconUrl" width="48" height="48" />
									<span>{{ drop.item.name }}</span>
								</div>
							</NuxtLink>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { Monster } from '~/types/monster';
const id = useRoute().params.id;
const { data: monster } = await useAsyncData<Monster>('monsterData', () =>
	$fetch(`/api/monster/${id}`)
);

useSeoMeta({
	title: '바람위키 | 몬스터 - ' + monster.value?.name,
	description: '바람의 나라 몬스터 정보 - ' + monster.value?.information,
});
</script>

<style scoped lang="scss">
@import '@/assets/detail.css';

.stats td span {
	margin-right: 10px;
}

.stats td div {
	margin: 2px 0;
}

.item-card {
	display: flex;
	align-items: center;
	padding: 10px;
	border: 1px solid var(--border-color);
	border-radius: 5px;
	margin-bottom: 10px;
	transition: background-color 0.3s, border-color 0.3s;
	background-color: var(--panel-bg);
	color: var(--text-color);

	&:hover {
		background-color: var(--hover-highlight);
		border-color: var(--highlight);
	}
	img {
		margin-right: 10px;
	}
	span {
		font-weight: bold;
	}
}
</style>
