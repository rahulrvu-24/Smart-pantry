import mongoose from 'mongoose'

import dns from 'node:dns'

dns.setServers(['1.1.1.1', '8.8.8.8'])

export async function connectDB(uri) {
  if (!uri) {
    throw new Error('MONGODB_URI is not set. Copy .env.example to .env and add your Atlas connection string.')
  }

  mongoose.connection.on('disconnected', () => console.warn('MongoDB disconnected'))
  mongoose.connection.on('reconnected', () => console.log('MongoDB reconnected'))

  await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 })
  console.log(`MongoDB connected: ${mongoose.connection.host}/${mongoose.connection.name}`)
}