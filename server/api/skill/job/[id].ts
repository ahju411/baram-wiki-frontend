import { defineEventHandler, createError } from 'h3';

export default defineEventHandler(async (event) => {
	const { apiBase } = useRuntimeConfig();
	const { id } = event.context.params as { id: string };

	try {
		const data = await $fetch(`${apiBase}/skill/job/${id}`);
		return data;
	} catch (error) {
		throw createError({
			statusCode: 500,
			statusMessage: 'Failed to fetch skill data',
		});
	}
});
