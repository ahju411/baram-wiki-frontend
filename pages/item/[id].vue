<template>
	<div class="max-w-4xl mx-auto">
		<p v-if="!item" class="text-center text-game-secondary">Loading...</p>
		<div v-else>
			<!-- 아이템 헤더 -->
			<div class="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-6 sm:mb-8">
				<!-- 아이템 이미지 -->
				<div
					class="w-24 h-24 sm:w-32 sm:h-32 bg-layer-surface border-2 border-border-primary rounded-lg p-4 flex items-center justify-center mx-auto sm:mx-0"
				>
					<NuxtImg
						:src="`https://evfuckbgifbr27188584.gcdn.ntruss.com/item/${item.images}`"
						:alt="item.name"
						class="w-full h-full object-contain"
					/>
				</div>
				<!-- 아이템 기본 정보 -->
				<div class="flex-1 text-center sm:text-left">
					<h1 class="text-xl sm:text-2xl font-bold mb-2">{{ item.name }}</h1>
					<p class="text-game-secondary mb-4">{{ item.desc }}</p>
					<div
						class="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-4 text-sm"
					>
						<div class="bg-layer-surface px-3 py-1 rounded">
							{{ getItemType(item.type) }}
						</div>
						<div class="bg-layer-surface px-3 py-1 rounded">
							{{ item.trade ? '거래 가능' : '거래 불가' }}
						</div>
					</div>
				</div>
			</div>

			<!-- 기본 정보 -->
			<div class="bg-layer-surface rounded-lg p-4 sm:p-6 mb-4 sm:mb-8">
				<h2 class="text-lg font-bold mb-4">기본 정보</h2>
				<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<div class="space-y-2">
						<div class="flex justify-between">
							<span class="text-game-secondary">가격</span>
							<span>{{ item.price }}전</span>
						</div>
						<div class="flex justify-between">
							<span class="text-game-secondary">최대 수량</span>
							<span>{{ item.maxquan }}</span>
						</div>
						<div class="flex justify-between">
							<span class="text-game-secondary">수리 가능</span>
							<span>{{ item.repair ? '가능' : '불가능' }}</span>
						</div>
						<div v-if="item.repair" class="flex justify-between">
							<span class="text-game-secondary">수리 비용</span>
							<span>{{ item.repairprice }}전</span>
						</div>
					</div>
					<div class="space-y-2">
						<div class="flex justify-between">
							<span class="text-game-secondary">보관 비용</span>
							<span>{{ item.storageprice }}전</span>
						</div>
						<div class="flex justify-between">
							<span class="text-game-secondary">작명 비용</span>
							<span>{{ item.namingprice }}전</span>
						</div>
					</div>
				</div>
			</div>

			<!-- 스탯 정보 -->
			<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mb-4 sm:mb-8">
				<!-- 기본 스탯 -->
				<div class="bg-layer-surface rounded-lg p-4 sm:p-6">
					<h2 class="text-lg font-bold mb-4">능력치</h2>
					<div class="space-y-2">
						<div v-if="item.smin || item.smax" class="flex justify-between">
							<span class="text-game-secondary">공격력</span>
							<span>{{ item.smin }} ~ {{ item.smax }}</span>
						</div>
						<div v-if="item.lmin || item.lmax" class="flex justify-between">
							<span class="text-game-secondary">마법 공격력</span>
							<span>{{ item.lmin }} ~ {{ item.lmax }}</span>
						</div>
						<div v-if="item.ac" class="flex justify-between">
							<span class="text-game-secondary">방어력</span>
							<span>{{ item.ac }}</span>
						</div>
						<div v-if="item.MHP" class="flex justify-between">
							<span class="text-game-secondary">최대 생명력</span>
							<span>+{{ item.MHP }}</span>
						</div>
						<div v-if="item.MMP" class="flex justify-between">
							<span class="text-game-secondary">최대 정신력</span>
							<span>+{{ item.MMP }}</span>
						</div>
						<div v-if="item.hit" class="flex justify-between">
							<span class="text-game-secondary">명중률</span>
							<span>+{{ item.hit }}</span>
						</div>
						<div v-if="item.dam" class="flex justify-between">
							<span class="text-game-secondary">타격치</span>
							<span>+{{ item.dam }}</span>
						</div>
						<div v-if="item.hr" class="flex justify-between">
							<span class="text-game-secondary">회복력</span>
							<span>+{{ item.hr }}</span>
						</div>
						<div v-if="item.md" class="flex justify-between">
							<span class="text-game-secondary">마법 방어력</span>
							<span>+{{ item.md }}</span>
						</div>
						<div v-if="item.M || item.W || item.G" class="flex justify-between">
							<span class="text-game-secondary">속성</span>
							<div class="text-right">
								<div v-if="item.M">무 +{{ item.M }}</div>
								<div v-if="item.W">수 +{{ item.W }}</div>
								<div v-if="item.G">지 +{{ item.G }}</div>
							</div>
						</div>
					</div>
				</div>

				<!-- 착용 조건 -->
				<div class="bg-layer-surface rounded-lg p-4 sm:p-6">
					<h2 class="text-lg font-bold mb-4">착용 조건</h2>
					<div class="space-y-2">
						<div class="flex justify-between">
							<span class="text-game-secondary">레벨 제한</span>
							<span>{{ item.reqlevel }}</span>
						</div>
						<div class="flex justify-between">
							<span class="text-game-secondary">직업</span>
							<span>{{ item.reqjob }}</span>
						</div>
						<div class="flex justify-between">
							<span class="text-game-secondary">성별</span>
							<span>{{ getGender(item.reqgender) }}</span>
						</div>
						<div class="flex justify-between">
							<span class="text-game-secondary">능력치</span>
							<div class="text-right">
								<div>힘: {{ item.reqmight }}</div>
								<div>민첩: {{ item.reqwill }}</div>
								<div>지혜: {{ item.reqgrace }}</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- 드랍 정보 -->
			<div
				v-if="item.monsterDrops?.length"
				class="bg-layer-surface rounded-lg p-4 sm:p-6 mb-4 sm:mb-8"
			>
				<h2 class="text-lg font-bold mb-4">드랍 몬스터</h2>
				<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<NuxtLink
						v-for="drop in item.monsterDrops"
						:key="drop.id"
						:to="`/monster/${drop.id}`"
						class="flex items-center gap-3 bg-layer-overlay p-3 rounded hover:bg-opacity-80 transition-all cursor-pointer border border-transparent hover:border-border-primary hover:shadow-lg hover:text-game-legendary"
					>
						<NuxtImg
							:src="`https://evfuckbgifbr27188584.gcdn.ntruss.com/monster/${drop.images}`"
							class="w-12 h-12 object-contain"
						/>
						<span>{{ drop.name }}</span>
					</NuxtLink>
				</div>
			</div>

			<!-- 조합 재료 -->
			<div
				v-if="item.ingredients?.length"
				class="bg-layer-surface rounded-lg p-4 sm:p-6 mb-4 sm:mb-8"
			>
				<h2 class="text-lg font-bold mb-4">제작 재료</h2>
				<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<NuxtLink
						v-for="ingredient in item.ingredients"
						:key="ingredient.id"
						:to="`/item/${ingredient.id}`"
						class="flex items-center gap-3 bg-layer-overlay p-3 rounded hover:bg-opacity-80 transition-all cursor-pointer border border-transparent hover:border-border-primary hover:shadow-lg hover:text-game-legendary"
					>
						<NuxtImg
							:src="`https://evfuckbgifbr27188584.gcdn.ntruss.com/item/${ingredient.images}`"
							:alt="ingredient.name"
							class="w-12 h-12 object-contain"
						/>
						<div class="flex-1">
							<span>{{ ingredient.name }}</span>
							<span class="text-sm text-game-secondary ml-2"
								>×{{ ingredient.quantity }}</span
							>
						</div>
					</NuxtLink>
				</div>
			</div>

			<!-- 제작 정보 -->
			<div
				v-if="item.usedInRecipes?.length"
				class="bg-layer-surface rounded-lg p-4 sm:p-6"
			>
				<h2 class="text-lg font-bold mb-4">제작 가능한 아이템</h2>
				<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<NuxtLink
						v-for="recipe in item.usedInRecipes"
						:key="recipe.id"
						:to="`/item/${recipe.id}`"
						class="flex items-center gap-3 bg-layer-overlay p-3 rounded hover:bg-opacity-80 transition-all cursor-pointer border border-transparent hover:border-border-primary hover:shadow-lg hover:text-game-legendary"
					>
						<NuxtImg
							:src="`https://evfuckbgifbr27188584.gcdn.ntruss.com/item/${recipe.images}`"
							:alt="recipe.name"
							class="w-12 h-12 object-contain"
						/>
						<div class="flex-1">
							<span class="block">{{ recipe.name }}</span>
							<div class="flex items-center gap-2 mt-1">
								<div
									class="flex items-center gap-2 bg-layer-surface px-2 py-1 rounded border border-border-light"
								>
									<NuxtImg
										:src="`https://evfuckbgifbr27188584.gcdn.ntruss.com/item/${item.images}`"
										:alt="item.name"
										class="w-6 h-6 object-contain"
									/>
									<span class="text-sm text-game-secondary"
										>×{{ recipe.quantity }}</span
									>
								</div>
							</div>
						</div>
					</NuxtLink>
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
