import { readFile, writeFile } from 'node:fs/promises'
import { createSeedItems } from './data/seed.js'

// The pantry is saved as JSON in this file (created automatically on first run)
const DATA_FILE = new URL('./data/items.json', import.meta.url)

export async function readItems() {
  try {
    const text = await readFile(DATA_FILE, 'utf8')
    return JSON.parse(text)
  } catch {
    // File missing or unreadable: start with the sample data
    const items = createSeedItems()
    await writeItems(items)
    return items
  }
}

export async function writeItems(items) {
  await writeFile(DATA_FILE, JSON.stringify(items, null, 2))
}