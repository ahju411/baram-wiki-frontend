<!-- error.vue -->
<template>
	<div class="error-container">
		<div class="error-content">
			<h1 v-if="error.statusCode === 404" class="error-title">
				페이지를 찾을 수 없습니다
			</h1>
			<h1 v-else class="error-title">오류가 발생했습니다</h1>
			<p class="error-message">{{ error.message }}</p>
			<button class="error-button" @click="handleError">
				메인으로 돌아가기
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	error: Object,
});

const handleError = () => {
	// 에러를 초기화하고 홈으로 이동
	clearError();
	navigateTo('/');
};
</script>

<style scoped lang="scss">
.error-container {
	min-height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 2rem;
	background: radial-gradient(
		circle at center,
		var(--secondary-bg) 0%,
		var(--main-bg) 100%
	);
}

.error-content {
	text-align: center;
	padding: 2rem;
	background: rgba(60, 47, 37, 0.9);
	border: 2px solid var(--border-color);
	border-radius: 12px;
	backdrop-filter: blur(10px);
	max-width: 500px;
	width: 100%;
}

.error-title {
	color: var(--highlight);
	font-size: 2rem;
	margin-bottom: 1rem;
}

.error-message {
	color: var(--text-color);
	margin-bottom: 2rem;
	opacity: 0.8;
}

.error-button {
	background: none;
	border: 2px solid var(--border-color);
	color: var(--text-color);
	padding: 0.8rem 1.5rem;
	border-radius: 8px;
	cursor: pointer;
	font-size: 1rem;
	transition: all 0.3s ease;

	&:hover {
		background: var(--hover-highlight);
		border-color: var(--highlight);
		color: var(--highlight);
	}
}

// 반응형
@media (max-width: 768px) {
	.error-title {
		font-size: 1.5rem;
	}

	.error-content {
		padding: 1.5rem;
	}
}
</style>
