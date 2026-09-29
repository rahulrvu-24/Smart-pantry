// Date helpers. Dates are stored as 'YYYY-MM-DD' strings (same format as <input type="date">).

// Format a Date as 'YYYY-MM-DD' using LOCAL time (toISOString would use UTC and can be off by a day in IST)
export function toDateString(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

// 'YYYY-MM-DD' string for today + n days (n can be negative)
export function daysFromNow(n) {
  const date = new Date()
  date.setDate(date.getDate() + n)
  return toDateString(date)
}

// '2026-09-30' -> '30 Sept 2026'
export function formatDate(dateString) {
  const [y, m, d] = dateString.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}