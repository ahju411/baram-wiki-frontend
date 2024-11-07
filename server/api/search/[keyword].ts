import { defineEventHandler, createError } from 'h3';

export default defineEventHandler(async (event) => {
	const keyword = event.context.params?.keyword;
	const { apiBase } = useRuntimeConfig();
	if (!keyword) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Keyword is required',
		});
	}

	try {
		const data = await $fetch(
			`${apiBase}/search?keyword=${encodeURIComponent(keyword)}`
		);
		return data;
	} catch (error) {
		throw createError({
			statusCode: 500,
			statusMessage: 'Failed to fetch search results',
		});
	}
});
