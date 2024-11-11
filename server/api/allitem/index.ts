import { defineEventHandler, getQuery, createError } from 'h3';

export default defineEventHandler(async (event) => {
	const { apiBase } = useRuntimeConfig();
	const query = getQuery(event);

	// 쿼리 파라미터 추출
	const {
		item = '0', // 아이템 타입 (무기, 갑옷 등)
		sex = '0', // 성별 (공통, 남자, 여자)
		job = '0', // 직업 (공통, 전사, 도적 등)
		lmin = 0, // 최소 레벨
		lmax = 99, // 최대 레벨
	} = query;

	try {
		// 백엔드 API로 검색 요청
		const data = await $fetch(`${apiBase}/allitem`, {
			params: {
				item,
				sex,
				job,
				lmin,
				lmax,
			},
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!data) {
			throw createError({
				statusCode: 404,
				statusMessage: '아이템을 찾을 수 없습니다.',
			});
		}

		return data;
	} catch (error) {
		console.error('아이템 데이터 조회 실패:', error);

		throw createError({
			statusCode: error.statusCode || 500,
			statusMessage:
				error.message || '아이템 데이터를 가져오는데 실패했습니다.',
		});
	}
});
