import { createSeedItems } from '../data/pantry'

const STORAGE_KEY = 'smart-pantry-items'

// Read saved items from localStorage. Falls back to sample data on the first visit
// or if the saved value is missing/corrupted.
export function loadItems() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : createSeedItems()
  } catch {
    return createSeedItems()
  }
}

export function saveItems(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {
    // Storage can be full or blocked (e.g. private mode). The app still works in memory.
  }
}