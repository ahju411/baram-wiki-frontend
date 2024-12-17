import { defineEventHandler, getQuery, createError } from 'h3';

interface PathResponse {
	total_routes: number;
	paths: {
		route_number: number;
		path: string[];
		steps: number;
	}[];
}

export default defineEventHandler(async (event) => {
	const { apiBase } = useRuntimeConfig();
	const query = getQuery(event);
	const { start_name, end_name } = query;

	if (!start_name || !end_name) {
		throw createError({
			statusCode: 400,
			statusMessage: '출발지와 도착지를 모두 입력해주세요.',
		});
	}

	try {
		const data = await $fetch<PathResponse>(`${apiBase}/map/path`, {
			params: {
				start_name,
				end_name,
			},
		});

		if (!data) {
			throw createError({
				statusCode: 404,
				statusMessage: '경로를 찾을 수 없습니다.',
			});
		}

		return data;
	} catch (error) {
		console.error('경로 검색 실패:', error);
		throw createError({
			statusCode: error.statusCode || 500,
			statusMessage: error.message || '경로 검색 중 오류가 발생했습니다.',
		});
	}
});
