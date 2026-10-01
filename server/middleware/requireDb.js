import mongoose from 'mongoose'

export function requireDb(req, res, next) {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ error: 'The database is unavailable right now. Please try again shortly.' })
  }
  next()
}