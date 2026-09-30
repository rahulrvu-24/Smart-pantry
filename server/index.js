import express from 'express'
import itemsRouter from './routes/items.js'
import { logger } from './middleware/logger.js'
import { notFound, errorHandler } from './middleware/errors.js'

const app = express()
const PORT = process.env.PORT || 3001

// Middleware runs in order, for every request
app.use(logger) // 1. log each request
app.use(express.json()) // 2. parse JSON request bodies into req.body

// Health check: a quick way to confirm the server is up
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() })
})

// All pantry routes live in their own router file
app.use('/api/items', itemsRouter)

// Any /api URL that didn't match a route above -> 404 JSON
app.use('/api', notFound)

// Error handler goes LAST so it can catch errors from everything above
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`)
})