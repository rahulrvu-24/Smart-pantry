import { request } from './client'

// Pantry items API (Express + MongoDB)
export const getItems = () => request('/items')

export const createItem = (item) =>
  request('/items', { method: 'POST', body: JSON.stringify(item) })

// Named "consume" rather than "use..." so React doesn't mistake it for a hook
export const consumeItem = (id) => request(`/items/${id}/use`, { method: 'PATCH' })

export const deleteItem = (id) => request(`/items/${id}`, { method: 'DELETE' })

export const resetItems = () => request('/items/reset', { method: 'POST' })