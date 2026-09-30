async function request(path, options = {}) {
  const offline = new Error('Could not reach the server. Is the Express server running? (npm run dev)')

  let res
  try {
    res = await fetch(`/api${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    })
  } catch {
    throw offline // network failure: no response at all
  }

  if (res.status === 204) return null // No Content (e.g. after DELETE)

  const data = await res.json().catch(() => null)
  if (!res.ok) {
    if (data === null) throw offline
    // Use the server's error message when it sent one
    const message = data?.details ? Object.values(data.details).join(' ') : data?.error
    throw new Error(message || `Request failed (${res.status})`)
  }
  return data
}

export const getItems = () => request('/items')

export const createItem = (item) =>
  request('/items', { method: 'POST', body: JSON.stringify(item) })

// Named "consume" rather than "use..." so React doesn't mistake it for a hook
export const consumeItem = (id) => request(`/items/${id}/use`, { method: 'PATCH' })

export const deleteItem = (id) => request(`/items/${id}`, { method: 'DELETE' })

export const resetItems = () => request('/items/reset', { method: 'POST' })