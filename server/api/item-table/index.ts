import { defineEventHandler, createError } from 'h3';

export default defineEventHandler(async (event) => {
    const { apiBase } = useRuntimeConfig();
    const { id } = event.context.params as { item: string, sex: string, job: string, lmin: string, lmax: string };

    console.log('id', id)
    try {
        const data = await $fetch(`${apiBase}/allitem?${id}`);
        return data;
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to fetch all item data',
        });
    }
});
