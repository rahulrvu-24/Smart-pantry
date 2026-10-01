import express from 'express'
import mongoose from 'mongoose'
import { connectDB } from './db.js'
import itemsRouter from './routes/items.js'
import { logger } from './middleware/logger.js'
import { notFound, errorHandler } from './middleware/errors.js'
import { requireDb } from './middleware/requireDb.js'

const app = express()
const PORT = process.env.PORT || 3001

// Middleware runs in order, for every request
app.use(logger) // 1. log each request
app.use(express.json()) // 2. parse JSON request bodies into req.body

// Mongoose's numeric connection states, as words
const DB_STATES = ['disconnected', 'connected', 'connecting', 'disconnecting']

// Health check: confirms the server is up and shows whether the database is connected
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    database: DB_STATES[mongoose.connection.readyState] ?? 'unknown',
    time: new Date().toISOString(),
  })
})

// All pantry routes live in their own router file. requireDb runs first on each of them.
app.use('/api/items', requireDb, itemsRouter)

// Any /api URL that didn't match a route above -> 404 JSON
app.use('/api', notFound)

// Error handler goes LAST so it can catch errors from everything above
app.use(errorHandler)

// Connect to the database first, then start accepting requests
try {
  await connectDB(process.env.MONGODB_URI)
  app.listen(PORT, () => {
    console.log(`API server running on http://localhost:${PORT}`)
  })
} catch (err) {
  console.error(`Could not start the server: ${err.message}`)
  process.exit(1)
}