export async function request(path, options = {}) {
  const offline = new Error('Could not reach the server. Is the Express server running? (npm run dev)')

  let res
  try {
    res = await fetch(`/api${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    })
  } catch {
    throw offline
  }

  if (res.status === 204) return null

  const data = await res.json().catch(() => null)
  if (!res.ok) {
    if (data === null) throw offline
    
    const message = data?.details ? Object.values(data.details).join(' ') : data?.error
    throw new Error(message || `Request failed (${res.status})`)
  }
  return data
}