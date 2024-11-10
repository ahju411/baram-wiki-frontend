import { defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
	const { apiBase } = useRuntimeConfig();
	const query = getQuery(event);

	try {
		// 기본 데이터 가져오기
		const data = await $fetch(`${apiBase}/map/level-guide`, {
			params: query,
		});

		if (!data) {
			throw createError({
				statusCode: 404,
				statusMessage: '레벨 가이드를 찾을 수 없습니다.',
			});
		}

		return data;
	} catch (error) {
		console.error('레벨가이드 조회 실패:', error);
		throw createError({
			statusCode: 500,
			statusMessage: '레벨가이드 조회 실패',
		});
	}
});
