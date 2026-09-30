import express from 'express'
import itemsRouter from './routes/items.js'

const app = express()
const PORT = process.env.PORT || 3001

// Middleware: parse JSON request bodies so route handlers can read req.body
app.use(express.json())

// Health check: a quick way to confirm the server is up
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() })
})

// All pantry routes live in their own router file
app.use('/api/items', itemsRouter)

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`)
})