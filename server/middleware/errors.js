// Runs when no route matched an /api URL
export function notFound(req, res) {
  res.status(404).json({ error: `No API route for ${req.method} ${req.originalUrl}` })
}

export function errorHandler(err, req, res, _next) {
  // Malformed JSON in the request body
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Request body is not valid JSON' })
  }

  // Mongoose schema validation failed (a second safety net behind validateItem)
  if (err.name === 'ValidationError') {
    const details = Object.fromEntries(Object.entries(err.errors).map(([field, e]) => [field, e.message]))
    return res.status(400).json({ error: 'Validation failed', details })
  }

  if (err.status) {
    return res.status(err.status).json({ error: err.message })
  }

  console.error(err)
  res.status(500).json({ error: 'Something went wrong on the server' })
}