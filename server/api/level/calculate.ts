import { defineEventHandler, getQuery, createError } from 'h3';

export default defineEventHandler(async (event) => {
	const { apiBase } = useRuntimeConfig();
	const query = getQuery(event);
	const job = query.job as string;
	const mobName = query.mobName as string;

	try {
		const data = await $fetch(`${apiBase}/level/calculate`, {
			query: {
				job,
				mobName,
			},
		});
		if (!data) {
			throw createError({
				statusCode: 404,
				statusMessage: '계산 결과를 찾을 수 없습니다.',
			});
		}

		return data;
	} catch (error) {
		console.error('계산 중 오류 발생:', error);
		throw createError({
			statusCode: 500,
			statusMessage: '계산 중 오류가 발생했습니다.',
		});
	}
});
