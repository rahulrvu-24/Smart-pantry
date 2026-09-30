import express from 'express'

const app = express()
const PORT = process.env.PORT || 3001

// Middleware: parse JSON request bodies so route handlers can read req.body
app.use(express.json())

// Health check: a quick way to confirm the server is up
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`)
})