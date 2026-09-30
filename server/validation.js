export const CATEGORIES = ['Fridge', 'Freezer', 'Pantry']
export const UNITS = ['pcs', 'pack', 'bottle', 'bunch', 'bag', 'box']

function today() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

// Returns an object of error messages; an empty object means the item is valid
export function validateItem(body) {
  const errors = {}
  const { name, quantity, unit, category, expiryDate } = body ?? {}

  if (typeof name !== 'string' || !name.trim()) {
    errors.name = 'Name is required.'
  } else if (name.trim().length > 40) {
    errors.name = 'Name must be 40 characters or fewer.'
  }

  const qty = Number(quantity)
  if (!Number.isInteger(qty) || qty < 1 || qty > 999) {
    errors.quantity = 'Quantity must be a whole number from 1 to 999.'
  }

  if (!UNITS.includes(unit)) {
    errors.unit = `Unit must be one of: ${UNITS.join(', ')}.`
  }

  if (!CATEGORIES.includes(category)) {
    errors.category = `Category must be one of: ${CATEGORIES.join(', ')}.`
  }

  if (typeof expiryDate !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(expiryDate)) {
    errors.expiryDate = 'Expiry date must be in YYYY-MM-DD format.'
  } else if (expiryDate < today()) {
    errors.expiryDate = "Expiry date can't be in the past."
  }

  return errors
}