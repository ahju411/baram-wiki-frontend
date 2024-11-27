<template>
	<main class="max-w-4xl mx-auto px-4 py-8">
		<!-- 뒤로가기 -->
		<NuxtLink
			to="/"
			class="inline-flex items-center text-game-secondary hover:text-game-legendary mb-6 transition-colors"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-5 h-5 mr-1"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
				/>
			</svg>
			메인으로 돌아가기
		</NuxtLink>

		<article v-if="notice" class="bg-layer-surface rounded-lg overflow-hidden">
			<!-- 공지 헤더 -->
			<div class="border-b border-border-light p-6">
				<div class="flex items-center gap-3 mb-4">
					<div class="bg-red-500 text-white px-2 py-1 rounded text-sm">
						업데이트
					</div>
					<span class="text-sm text-game-secondary">{{ notice.date }}</span>
				</div>
				<h1 class="text-2xl font-bold mb-2">{{ notice.title }}</h1>
				<div class="flex items-center gap-4 text-sm text-game-secondary">
					<span class="flex items-center gap-1">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-4 h-4"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
							/>
						</svg>
						조회수 {{ notice.views.toLocaleString() }}
					</span>
				</div>
			</div>

			<!-- 공지 본문 -->
			<div class="p-6" v-html="notice.content"></div>
		</article>
	</main>
</template>

<script setup lang="ts">
import type { Notice } from '~/types/notice';

const route = useRoute();
const { notices } = useNotices();
const notice = computed<Notice | undefined>(() =>
	notices.value.find((notice) => notice.id === Number(route.params.id))
);
</script>
