import { defineEventHandler, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const { id } = event.context.params as { id: string }

  try {
    const data = await $fetch(`http://localhost:3001/api/map/${id}`)
    return data
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch map data',
    })
  }
})
    