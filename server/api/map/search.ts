import { defineEventHandler, getQuery, createError } from 'h3';

export default defineEventHandler(async (event) => {
	const { apiBase } = useRuntimeConfig();
	const query = getQuery(event);
	const { keyword } = query;

	if (!keyword) {
		throw createError({
			statusCode: 400,
			statusMessage: '검색어를 입력해주세요.',
		});
	}

	try {
		const data = await $fetch<string[]>(`${apiBase}/map/search`, {
			params: { keyword },
		});

		return data;
	} catch (error) {
		console.error('맵 검색 실패:', error);
		throw createError({
			statusCode: error.statusCode || 500,
			statusMessage: error.message || '맵 검색 중 오류가 발생했습니다.',
		});
	}
});
