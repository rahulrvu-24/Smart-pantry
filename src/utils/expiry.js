export const SOON_DAYS = 3

const MS_PER_DAY = 24 * 60 * 60 * 1000

// Midnight at the start of a given day, in local time
function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

// Whole days from today until 'YYYY-MM-DD': 0 = today, 1 = tomorrow, -1 = yesterday
export function daysUntil(dateString, today = new Date()) {
  if (!dateString) return null
  const [y, m, d] = dateString.split('-').map(Number)
  const diff = new Date(y, m - 1, d) - startOfDay(today)
  return Math.round(diff / MS_PER_DAY)
}

// Classifies an expiry date as 'fresh', 'soon' or 'expired', with a human-readable label
export function getExpiryStatus(dateString, today = new Date()) {
  const daysLeft = daysUntil(dateString, today)

  if (daysLeft === null) {
    return { status: 'unknown', daysLeft, label: 'No expiry date' }
  }
  if (daysLeft < 0) {
    const ago = -daysLeft
    return { status: 'expired', daysLeft, label: ago === 1 ? 'Expired yesterday' : `Expired ${ago} days ago` }
  }
  if (daysLeft === 0) {
    return { status: 'soon', daysLeft, label: 'Expires today' }
  }
  if (daysLeft <= SOON_DAYS) {
    return { status: 'soon', daysLeft, label: daysLeft === 1 ? 'Expires tomorrow' : `Expires in ${daysLeft} days` }
  }
  return { status: 'fresh', daysLeft, label: `${daysLeft} days left` }
}

export function countByStatus(items, today = new Date()) {
  const counts = { fresh: 0, soon: 0, expired: 0, unknown: 0 }
  for (const item of items) {
    counts[getExpiryStatus(item.expiryDate, today).status] += 1
  }
  return counts
}

export function getUrgentItems(items, today = new Date()) {
  return items
    .map((item) => ({ item, expiry: getExpiryStatus(item.expiryDate, today) }))
    .filter(({ expiry }) => expiry.status === 'soon' || expiry.status === 'expired')
    .sort((a, b) => a.expiry.daysLeft - b.expiry.daysLeft)
    .map(({ item }) => item)
}