import { Router } from 'express'
import mongoose from 'mongoose'
import Item from '../models/Item.js'
import { createSeedItems } from '../data/seed.js'
import { validateItem } from '../validation.js'

const router = Router()

async function insertSeedItems() {
  await Item.insertMany(createSeedItems().reverse())
}

// GET /api/items -> all pantry items, newest first
router.get('/', async (req, res) => {
  if ((await Item.countDocuments()) === 0) {
    await insertSeedItems()
  }
  const items = await Item.find().sort({ _id: -1 }) // _id contains the creation time
  res.json(items)
})

// POST /api/items -> add a new item (data comes from req.body)
router.post('/', async (req, res) => {
  const errors = validateItem(req.body)
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ error: 'Validation failed', details: errors }) // 400 Bad Request
  }

  const { name, quantity, unit, category, expiryDate } = req.body
  const newItem = await Item.create({ name, quantity: Number(quantity), unit, category, expiryDate })

  res.status(201).json(newItem) // 201 Created
})

// POST /api/items/reset -> delete everything and restore the sample data
router.post('/reset', async (req, res) => {
  await Item.deleteMany({})
  await insertSeedItems()
  const items = await Item.find().sort({ _id: -1 })
  res.json(items)
})

// PATCH /api/items/:id/use -> use one; the item is removed when quantity reaches 0
router.patch('/:id/use', async (req, res) => {
  const { id } = req.params
  // A malformed id can't exist in the database, so treat it as "not found"
  const item = mongoose.isValidObjectId(id) ? await Item.findById(id) : null

  if (!item) {
    return res.status(404).json({ error: `Item ${id} not found` })
  }

  item.quantity -= 1
  if (item.quantity > 0) {
    await item.save()
  } else {
    await item.deleteOne()
  }

  res.json(item)
})

// DELETE /api/items/:id -> remove an item
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const deleted = mongoose.isValidObjectId(id) ? await Item.findByIdAndDelete(id) : null

  if (!deleted) {
    return res.status(404).json({ error: `Item ${id} not found` })
  }

  res.status(204).end() // 204 No Content
})

export default router