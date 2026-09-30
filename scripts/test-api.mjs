// run:  node scripts/test-api.mjs
const BASE = process.env.API_URL || 'http://localhost:3001/api'

function inDays(n) {
  const d = new Date()
  d.setDate(d.getDate() + n)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

async function call(method, path, body) {
  const res = await fetch(BASE + path, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : typeof body === 'string' ? body : JSON.stringify(body),
  })
  const text = await res.text()
  let data = text
  try {
    data = JSON.parse(text)
  } catch {
    /* not JSON */
  }
  return { status: res.status, data }
}

function show(label, expected, { status, data }) {
  const ok = status === expected ? '✓' : '✗'
  const preview = typeof data === 'string' ? data : JSON.stringify(data)
  console.log(`${ok} ${label.padEnd(38)} ${status}  ${preview.slice(0, 90)}`)
}

try {
  show('GET    /health', 200, await call('GET', '/health'))
  show('POST   /items/reset', 200, await call('POST', '/items/reset'))

  const list = await call('GET', '/items')
  show(`GET    /items  (${list.data.length} items)`, 200, list)

  const created = await call('POST', '/items', {
    name: 'Paneer', quantity: 2, unit: 'pack', category: 'Fridge', expiryDate: inDays(3),
  })
  show('POST   /items  (valid)', 201, created)
  show('POST   /items  (invalid -> 400)', 400, await call('POST', '/items', { name: '', quantity: 0 }))
  show('POST   /items  (broken JSON -> 400)', 400, await call('POST', '/items', '{oops'))

  show('PATCH  /items/:id/use', 200, await call('PATCH', `/items/${created.data.id}/use`))
  show('DELETE /items/:id', 204, await call('DELETE', `/items/${created.data.id}`))
  show('DELETE /items/:id  (missing -> 404)', 404, await call('DELETE', '/items/does-not-exist'))
  show('GET    /nope  (unknown route -> 404)', 404, await call('GET', '/nope'))
} catch {
  console.error(`Could not reach ${BASE}. Start the server first: npm run server`)
  process.exitCode = 1
}