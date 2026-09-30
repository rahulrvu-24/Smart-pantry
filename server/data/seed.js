function daysFromNow(n) {
  const date = new Date()
  date.setDate(date.getDate() + n)
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function createSeedItems() {
  return [
    { id: 'seed-1', name: 'Milk', quantity: 2, unit: 'pack', category: 'Fridge', expiryDate: daysFromNow(1) },
    { id: 'seed-2', name: 'Spinach', quantity: 1, unit: 'bunch', category: 'Fridge', expiryDate: daysFromNow(2) },
    { id: 'seed-3', name: 'Eggs', quantity: 6, unit: 'pcs', category: 'Fridge', expiryDate: daysFromNow(6) },
    { id: 'seed-4', name: 'Chicken', quantity: 2, unit: 'pack', category: 'Freezer', expiryDate: daysFromNow(25) },
    { id: 'seed-5', name: 'Tomatoes', quantity: 4, unit: 'pcs', category: 'Fridge', expiryDate: daysFromNow(-1) },
    { id: 'seed-6', name: 'Rice', quantity: 1, unit: 'bag', category: 'Pantry', expiryDate: daysFromNow(180) },
    { id: 'seed-7', name: 'Butter', quantity: 1, unit: 'box', category: 'Fridge', expiryDate: daysFromNow(12) },
    { id: 'seed-8', name: 'Bread', quantity: 1, unit: 'pack', category: 'Pantry', expiryDate: daysFromNow(0) },
  ]
}