import { defineEventHandler, createError } from 'h3';

export default defineEventHandler(async (event) => {
	const { apiBase } = useRuntimeConfig();
	try {
		const data = await $fetch(`${apiBase}/search/popular-items`);

		if (!data) {
			throw createError({
				statusCode: 404,
				statusMessage: '인기 아이템을 찾을 수 없습니다.',
			});
		}
		return data;
	} catch (error) {
		throw createError({
			statusCode: 500,
			statusMessage: 'Failed to fetch popular items',
		});
	}
});
