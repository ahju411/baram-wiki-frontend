<template>
	<div class="detail-container">
		<p v-if="!map">Loading...</p>
		<div v-else class="map-detail">
			<div class="map-image">
				<NuxtImg
					:src="`/images/map/${map.images}`"
					:alt="map.name"
					width="150"
					height="150"
				/>
				<h2>{{ map.name }}</h2>
			</div>
			<div class="map-info">
				<div class="description">
					<h3>맵 설명</h3>
					<p>{{ map.information }}</p>
				</div>

				<div class="map-stats stats">
					<h3>기본 정보</h3>
					<table>
						<tbody>
							<tr>
								<td>레벨</td>
								<td>{{ map.level }}</td>
							</tr>
						</tbody>
					</table>
				</div>

				<div class="spawned-monsters">
					<h3>스폰된 몬스터</h3>
					<ul>
						<li v-for="spawn in map.spawnedMonsters" :key="spawn.mob_id">
							<NuxtLink :to="`/monster/${spawn.monster.id}`">
								<div class="monster-card">
									<NuxtImg
										:src="`/images/monster/${spawn.monster.images}`"
										width="48"
										height="48"
									/>
									<span>{{ spawn.monster.name }}</span>
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
import type { Map, DropItem, Location } from '~/types/map';

const id = useRoute().params.id as string;
const { data: map } = await useAsyncData<Map>('mapData', () =>
	$fetch(`/api/map/${id}`)
);

useSeoMeta({
	title: `바람위키 | 맵 - ${map.value?.name}`,
	description: `바람의 나라 맵 정보 - ${map.value?.information}`,
});
</script>

<style scoped lang="scss" src="@/assets/detail.css"></style>
