import { defineEventHandler, createError } from 'h3';

export default defineEventHandler(async (event) => {
	const { apiBase } = useRuntimeConfig(); // 비공개 설정 사용
	const { id } = event.context.params as { id: string };

	try {
		// $fetch 호출 시 서버 비공개 API 호출
		const data = await $fetch(`${apiBase}/map/${id}`, {
			headers: {
				// Authorization: `Bearer ${token}`, // 인증 토큰이 필요하면 여기에 추가
				'Content-Type': 'application/json',
			},
		});

		if (!data) {
			throw createError({
				statusCode: 404,
				statusMessage: '맵을 찾을 수 없습니다.',
			});
		}

		return data;
	} catch (error) {
		console.error('Failed to fetch map data:', error); // 서버 콘솔에 에러 로그 남기기

		throw createError({
			statusCode: error.response?.status || 500,
			statusMessage: error.response?.statusText || 'Failed to fetch map data',
		});
	}
});
