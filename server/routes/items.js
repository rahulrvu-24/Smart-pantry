import { Router } from 'express'
import { readItems, writeItems } from '../store.js'
import { createSeedItems } from '../data/seed.js'

const router = Router()

// GET /api/items -> all pantry items
router.get('/', async (req, res) => {
  const items = await readItems()
  res.json(items)
})

// POST /api/items -> add a new item (data comes from req.body)
router.post('/', async (req, res) => {
  const { name, quantity, unit, category, expiryDate } = req.body
  const newItem = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: String(name).trim(),
    quantity: Number(quantity),
    unit,
    category,
    expiryDate,
  }

  const items = await readItems()
  items.unshift(newItem) // newest first
  await writeItems(items)

  res.status(201).json(newItem) // 201 Created
})

// POST /api/items/reset -> restore the sample data
router.post('/reset', async (req, res) => {
  const items = createSeedItems()
  await writeItems(items)
  res.json(items)
})

// PATCH /api/items/:id/use -> use one; the item is removed when quantity reaches 0
router.patch('/:id/use', async (req, res) => {
  const { id } = req.params
  const items = await readItems()
  const item = items.find((i) => i.id === id)

  if (!item) {
    return res.status(404).json({ error: `Item ${id} not found` })
  }

  item.quantity -= 1
  const remaining = item.quantity > 0 ? items : items.filter((i) => i.id !== id)
  await writeItems(remaining)

  res.json(item)
})

// DELETE /api/items/:id -> remove an item
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const items = await readItems()
  const remaining = items.filter((i) => i.id !== id)

  if (remaining.length === items.length) {
    return res.status(404).json({ error: `Item ${id} not found` })
  }

  await writeItems(remaining)
  res.status(204).end()
})

export default router