import { defineEventHandler, createError } from 'h3';

export default defineEventHandler(async (event) => {
	const { apiBase } = useRuntimeConfig();
	try {
		// 백엔드 API로 검색 요청
		const data = await $fetch(`${apiBase}/level`, {
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!data) {
			throw createError({
				statusCode: 404,
				statusMessage: '레벨 데이터가 존재하지 않습니다.',
			});
		}

		return data;
	} catch (error) {
		console.error('레벨 데이터 조회 실패:', error);

		throw createError({
			statusCode: error.statusCode || 500,
			statusMessage: error.message || '레벨 데이터를 가져오는데 실패 했습니다.',
		});
	}
});
