export function notFound(req, res) {
  res.status(404).json({ error: `No API route for ${req.method} ${req.originalUrl}` })
}

export function errorHandler(err, req, res, next) {
  // Malformed JSON in the request body
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Request body is not valid JSON' })
  }

  console.error(err)
  res.status(err.status || 500).json({ error: 'Something went wrong on the server' })
}