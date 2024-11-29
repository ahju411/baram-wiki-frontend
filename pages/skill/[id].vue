<template>
	<div class="skill-container">
		<h2 class="skill-title">스킬 목록</h2>
		<div class="skill-tabs">
			<button
				v-for="tab in tabs"
				:key="tab.value"
				:class="['tab-button', { active: currentTab === tab.value }]"
				@click="currentTab = tab.value"
			>
				{{ tab.label }}
			</button>
		</div>
		<div class="skill-grid">
			<div v-if="!filteredSkills.length" class="loading">
				해당 승급 단계의 스킬이 없습니다.
			</div>
			<div v-for="item in filteredSkills" :key="item.id" class="skill-card">
				<div class="skill-header">
					<div class="skill-image-container">
						<NuxtImg
							:src="`https://evfuckbgifbr27188584.gcdn.ntruss.com/skill/${item.images}`"
							:alt="item.name"
							width="100"
							height="100"
							class="skill-image"
						/>
					</div>
					<div class="skill-level-badge">Lv.{{ item.level }}</div>
				</div>
				<h3 class="skill-name">{{ item.name }}</h3>
				<p class="skill-info">{{ item.information }}</p>
				<p v-if="item.cool" class="skill-cooltime">쿨타임: {{ item.cool }}초</p>
				<div v-if="item.details.length" class="skill-details">
					<h4 class="required-items">
						필요 아이템: 총 비용
						{{ formatPrice(calculateTotalCost(item.details)) }} 전
					</h4>
					<ul class="item-list">
						<li
							v-for="detail in item.details"
							:key="detail.item_id"
							class="item"
						>
							<NuxtLink
								v-if="detail.item"
								:to="`/item/${detail.item.id}`"
								class="item-container"
							>
								<NuxtImg
									:src="`https://evfuckbgifbr27188584.gcdn.ntruss.com/item/${detail.item.images}`"
									:alt="detail.item.name"
									width="24"
									height="24"
									class="item-image"
								/>
								<span class="item-name"
									>{{ detail.item.name }} * {{ detail.val }}개</span
								>
								<span
									class="item-price"
									v-if="detail.item && detail.item.price !== null"
								>
									{{ detail.item.price * detail.val }}전
								</span>
								<span class="item-price" v-else>가격 정보 없음</span>
							</NuxtLink>
							<div v-else class="item-container">
								<span class="item-name">아이템 정보 없음</span>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { Skill, SkillDetail } from '~/types/skill';

const id = useRoute().params.id;
const { data: skill } = await useAsyncData<Skill[]>('skillData', () =>
	$fetch(`/api/skill/job/${id}`)
);

const typeMatch = (id: string) => {
	return id === 'w'
		? '전사'
		: id === 'p'
		? '주술사'
		: id === 'n'
		? '도적'
		: '도사';
};

// 총 비용 계산 함수
const calculateTotalCost = (details: SkillDetail[]) => {
	return details.reduce((total, detail) => {
		if (!detail.item || detail.item.price === null) {
			return total;
		}
		return total + detail.item.price * detail.val;
	}, 0);
};

// 가격 포맷팅 함수 (1000단위 콤마)
const formatPrice = (price: number) => {
	return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

useSeoMeta({
	title: '바람위키 | 스킬 - ' + typeMatch(id as string),
	description: '바람의 나라 스킬 정보 - ' + typeMatch(id as string),
});

// 탭 정의를 문자열로 변경
const tabs = [
	{ label: '기본', value: '0' },
	{ label: '1차 승급', value: '1' },
	{ label: '2차 승급', value: '2' },
	{ label: '3차 승급', value: '3' },
	{ label: '4차 승급', value: '4' },
];

// 현재 선택된 탭도 문자열로 초기화
const currentTab = ref('0');

// 필터링된 스킬 목록
const filteredSkills = computed(() => {
	if (!skill.value) return [];

	const filtered = skill.value.filter((s) => {
		// 두 값을 문자열로 변환하여 비교
		return String(s.advence) === String(currentTab.value);
	});

	return filtered;
});
</script>

<style scoped lang="scss">
.skill-container {
	padding: 24px;
	max-width: 1200px;
	margin: 0 auto;
}

.skill-title {
	color: var(--highlight);
	font-size: 2rem;
	margin-bottom: 2rem;
	text-align: center;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.loading {
	text-align: center;
	color: var(--text-color);
	font-size: 1.2rem;
	padding: 2rem;
}

.skill-grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr); /* 3열로 고정 */
	gap: 24px;

	@media (max-width: 1200px) {
		grid-template-columns: repeat(2, 1fr); /* 태블릿에서 2열 */
	}

	@media (max-width: 768px) {
		grid-template-columns: 1fr; /* 모바일에서 1열 */
	}
}

.skill-card {
	background-color: var(--panel-bg);
	border: 2px solid var(--border-color);
	border-radius: 12px;
	padding: 20px;
	transition: transform 0.2s ease, box-shadow 0.2s ease;
	position: relative;
	overflow: hidden;
	display: flex; /* Flexbox 사용 */
	flex-direction: column; /* 세로 방향 정렬 */

	&:hover {
		transform: translateY(-4px);
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
		border-color: var(--highlight);
	}
}

.skill-header {
	position: relative;
	margin-bottom: 1rem;
}

.skill-image-container {
	display: flex;
	justify-content: center;
	align-items: center;
	background: var(--secondary-bg);
	border-radius: 8px;
	padding: 12px;
	margin-bottom: 1rem;
}

.skill-image {
	border-radius: 8px;
	object-fit: cover;
}

.skill-level-badge {
	position: absolute;
	top: 8px;
	right: 8px;
	background: var(--button-gradient);
	color: var(--text-color);
	padding: 4px 8px;
	border-radius: 12px;
	font-size: 0.9rem;
	font-weight: bold;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.skill-name {
	color: var(--highlight);
	font-size: 1.4rem;
	margin: 0.5rem 0;
	text-align: center;
}

.skill-info {
	color: var(--text-color);
	font-size: 1rem;
	margin-bottom: 1.5rem;
	line-height: 1.6;
}

.skill-details {
	background-color: var(--secondary-bg);
	border-radius: 8px;
	padding: 16px;
	margin-top: auto; /* 나머지 공간을 위쪽에 배치 */
}

.required-items {
	color: var(--secondary-highlight);
	font-size: 1.1rem;
	margin-bottom: 1rem;
}

.item-list {
	list-style: none;
	padding: 0;
	margin: 0;
}

.item {
	margin-bottom: 0.5rem;

	&:last-child {
		margin-bottom: 0;
	}
}

.item-container {
	display: flex;
	align-items: center;
	gap: 12px;
	padding: 8px;
	border-radius: 6px;
	background-color: var(--secondary-panel);
	transition: background-color 0.2s ease;

	&:hover {
		background-color: var(--hover-highlight);
	}
}

.item-image {
	border-radius: 4px;
	border: 1px solid var(--secondary-border);
}

.item-name {
	flex-grow: 1;
	color: var(--secondary-text);
}

.item-price {
	color: var(--highlight);
	font-weight: bold;
}

.skill-tabs {
	display: flex;
	justify-content: center;
	gap: 8px;
	margin-bottom: 24px;
	flex-wrap: wrap;
}

.tab-button {
	padding: 8px 16px;
	border: 2px solid var(--border-color);
	border-radius: 8px;
	background: var(--panel-bg);
	color: var(--text-color);
	cursor: pointer;
	transition: all 0.2s ease;
	font-weight: 500;

	&:hover {
		background: var(--secondary-bg);
		border-color: var(--highlight);
	}

	&.active {
		background: var(--button-gradient);
		border-color: var(--highlight);
		color: var(--highlight);
		font-weight: bold;
	}
}

.skill-cooltime {
	color: var(--secondary-highlight);
	font-size: 0.9rem;
	margin-bottom: 1rem;
	padding: 4px 8px;
	background-color: var(--secondary-bg);
	border-radius: 4px;
	display: inline-block;
}

@media (max-width: 768px) {
	.skill-grid {
		grid-template-columns: 1fr;
	}

	.skill-container {
		padding: 16px;
	}

	.skill-card {
		padding: 16px;
	}

	.skill-tabs {
		gap: 4px;
	}

	.tab-button {
		padding: 6px 12px;
		font-size: 0.9rem;
	}
}
</style>
