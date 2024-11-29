import { defineEventHandler } from 'h3';
import type { NewMapDetail } from '~/types/newMap';

export default defineEventHandler(async (event) => {
	const { apiBase } = useRuntimeConfig();
	const { id } = event.context.params as { id: string };

	try {
		const data = await $fetch<NewMapDetail>(`${apiBase}/map/all/${id}`);

		if (!data) {
			throw createError({
				statusCode: 404,
				statusMessage: '맵 정보를 찾을 수 없습니다.',
			});
		}

		return data;
	} catch (error) {
		console.error('맵 정보 조회 실패:', error);
		throw createError({
			statusCode: 500,
			statusMessage: '맵 정보 조회 실패',
		});
	}
});
