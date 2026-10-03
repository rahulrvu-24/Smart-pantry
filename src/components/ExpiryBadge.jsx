import { getExpiryStatus } from '../utils/expiry'

const STYLES = {
  fresh: { badge: 'bg-green-100 text-green-800', dot: 'bg-green-500' },
  soon: { badge: 'bg-amber-100 text-amber-900', dot: 'bg-amber-500' },
  expired: { badge: 'bg-red-100 text-red-800', dot: 'bg-red-500' },
  unknown: { badge: 'bg-stone-100 text-stone-600', dot: 'bg-stone-400' },
}

// Reusable badge: give it an expiry date and it shows a coloured status pill
function ExpiryBadge({ expiryDate }) {
  const { status, label } = getExpiryStatus(expiryDate)
  const style = STYLES[status]

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${style.badge}`}>
      <span className={`h-2 w-2 rounded-full ${style.dot}`} aria-hidden="true" />
      {label}
    </span>
  )
}

export default ExpiryBadge