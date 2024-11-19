import { defineEventHandler, createError, getRequestHeader } from 'h3';

export default defineEventHandler(async (event) => {
	const { apiBase } = useRuntimeConfig();
	const { id } = event.context.params as { id: string };

	// 클라이언트 IP 주소 가져오기
	const clientIp =
		getRequestHeader(event, 'x-forwarded-for')?.split(',')[0] ||
		event.node.req.socket.remoteAddress?.replace(/^::ffff:/, '') ||
		'0.0.0.0';

	try {
		const data = await $fetch(`${apiBase}/item/${id}`, {
			headers: {
				'Content-Type': 'application/json',
				'X-Real-IP': clientIp, // 백엔드로 IP 전달
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
