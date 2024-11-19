<template>
	<div class="detail-container">
		<p v-if="!item">Loading...</p>
		<div v-else class="item-detail">
			<div class="item-image">
				<NuxtImg
					:src="`https://evfuckbgifbr27188584.gcdn.ntruss.com/item/${item.images}`"
					:alt="item.name"
					width="100"
					height="100"
				/>
				<h2>{{ item.name }}</h2>
			</div>

			<div class="item-info">
				<div class="description">
					<h3>아이템 설명</h3>
					<p>{{ item.desc }}</p>
				</div>
				<div class="stats">
					<h3>기본 정보</h3>
					<table>
						<tbody>
							<tr>
								<td>아이템 타입</td>
								<td>{{ getItemType(item.type) }}</td>
							</tr>
							<tr>
								<td>가격</td>
								<td>{{ item.price }}전</td>
							</tr>
							<tr>
								<td>내구도</td>
								<td>{{ item.maxdura }}</td>
							</tr>
							<tr>
								<td>최대 수량</td>
								<td>{{ item.maxquan }}</td>
							</tr>
							<tr>
								<td>거래 가능</td>
								<td>{{ item.trade ? '가능' : '불가능' }}</td>
							</tr>
							<tr>
								<td>수리 가능</td>
								<td>{{ item.repair ? '가능' : '불가능' }}</td>
							</tr>
							<tr v-if="item.repair">
								<td>수리 비용</td>
								<td>{{ item.repairprice }}전</td>
							</tr>
							<tr>
								<td>보관 비용</td>
								<td>{{ item.storageprice }}전</td>
							</tr>
							<tr>
								<td>작명 비용</td>
								<td>{{ item.namingprice }}전</td>
							</tr>
						</tbody>
					</table>
				</div>

				<div class="stats">
					<h3>요구 조건</h3>
					<table>
						<tbody>
							<tr>
								<td>요구 레벨</td>
								<td>{{ item.reqlevel }}</td>
							</tr>
							<tr>
								<td>요구 직업</td>
								<td>{{ item.reqjob }}</td>
							</tr>
							<tr>
								<td>요구 성별</td>
								<td>{{ getGender(item.reqgender) }}</td>
							</tr>
							<tr>
								<td>요구 능력치</td>
								<td>
									<div>힘: {{ item.reqmight }}</div>
									<div>민첩: {{ item.reqwill }}</div>
									<div>지혜: {{ item.reqgrace }}</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				<div class="stats">
					<h3>능력치</h3>
					<table>
						<tbody>
							<tr v-if="item.smin || item.smax">
								<td>공격력</td>
								<td>{{ item.smin }} ~ {{ item.smax }}</td>
							</tr>
							<tr v-if="item.lmin || item.lmax">
								<td>마법 공격력</td>
								<td>{{ item.lmin }} ~ {{ item.lmax }}</td>
							</tr>
							<tr v-if="item.ac">
								<td>방어력</td>
								<td>{{ item.ac }}</td>
							</tr>
							<tr v-if="item.MHP">
								<td>최대 생명력</td>
								<td>+{{ item.MHP }}</td>
							</tr>
							<tr v-if="item.MMP">
								<td>최대 정신력</td>
								<td>+{{ item.MMP }}</td>
							</tr>
							<tr v-if="item.hit">
								<td>명중률</td>
								<td>+{{ item.hit }}</td>
							</tr>
							<tr v-if="item.dam">
								<td>타격치</td>
								<td>+{{ item.dam }}</td>
							</tr>
							<tr v-if="item.M || item.W || item.G">
								<td>속성</td>
								<td>
									<div v-if="item.M">무 +{{ item.M }}</div>
									<div v-if="item.W">수 +{{ item.W }}</div>
									<div v-if="item.G">지 +{{ item.G }}</div>
								</td>
							</tr>
							<tr v-if="item.hr">
								<td>회복력</td>
								<td>+{{ item.hr }}</td>
							</tr>
							<tr v-if="item.md">
								<td>마법 방어력</td>
								<td>+{{ item.md }}</td>
							</tr>
						</tbody>
					</table>
				</div>

				<div class="ingredients">
					<h3>조합 재료</h3>
					<ul>
						<li v-for="ingredient in item.ingredients" :key="ingredient.id">
							<NuxtLink :to="`/item/${ingredient.id}`">
								<div class="ingredient-card">
									<NuxtImg
										:src="`https://evfuckbgifbr27188584.gcdn.ntruss.com/item/${ingredient.images}`"
										width="48"
										height="48"
									/>
									{{ ingredient.name }} * {{ ingredient.quantity }}
								</div>
							</NuxtLink>
						</li>
					</ul>
				</div>

				<div class="recipes">
					<h3>조합 가능 아이템</h3>
					<ul>
						<li v-for="recipe in item.usedInRecipes" :key="recipe.id">
							<NuxtLink :to="`/item/${recipe.id}`">
								<div class="recipe-card">
									<NuxtImg
										:src="`https://evfuckbgifbr27188584.gcdn.ntruss.com/item/${recipe.images}`"
										width="48"
										height="48"
									/>
									{{ recipe.name }}
								</div>
							</NuxtLink>
						</li>
					</ul>
				</div>

				<div class="drops">
					<h3>드랍 정보</h3>
					<ul>
						<li v-for="drop in item.monsterDrops" :key="drop.id">
							<NuxtLink :to="`/monster/${drop.id}`">
								<div class="monster-card">
									<NuxtImg
										:src="`https://evfuckbgifbr27188584.gcdn.ntruss.com/monster/${drop.images}`"
										width="48"
										height="48"
									/>
									<span>{{ drop.name }}</span>
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
import type { Item } from '~/types/item';

const id = useRoute().params.id;
const { data: item, error } = await useAsyncData<Item>('itemData', () =>
	$fetch(`/api/item/${id}`)
);

const getItemType = (type: number) => {
	const types = {
		0: '무기',
		1: '갑옷',
		2: '방패',
		3: '투구',
		4: '반지',
		5: '목걸이',
		6: '술(막걸리)',
		7: '먹는 음식',
		8: '비서',
		9: '전(돈)',
		10: '퀘스트재료',
		11: '기타',
	};
	return types[type as keyof typeof types] || '알 수 없음';
};

const getGender = (gender: number) => {
	switch (gender) {
		case 0:
			return '제한 없음';
		case 1:
			return '남자';
		case 2:
			return '여자';
		default:
			return '알 수 없음';
	}
};

useSeoMeta({
	title: '바람위키 | 아이템 - ' + item.value?.name,
	description: '바람의 나라 아이템 정보 - ' + item.value?.desc,
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

.monster-card {
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
