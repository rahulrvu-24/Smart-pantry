import { Link } from 'react-router-dom'
import ExpiryBadge from './ExpiryBadge'
import { SOON_DAYS } from '../utils/expiry'

function UseItSoonList({ items, onUse }) {
  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-stone-200 bg-white p-8 text-center">
        <p className="text-3xl" aria-hidden="true">🎉</p>
        <p className="mt-2 font-medium">Nothing is expiring in the next {SOON_DAYS} days.</p>
        <p className="mt-1 text-sm text-stone-500">Your pantry is in good shape.</p>
      </div>
    )
  }

  return (
    <ul className="divide-y divide-stone-100 overflow-hidden rounded-xl border border-stone-200 bg-white">
      {items.map((item) => (
        <li key={item.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="font-semibold">{item.name}</p>
            <p className="text-sm text-stone-500">
              {item.quantity} {item.unit} · {item.category}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <ExpiryBadge expiryDate={item.expiryDate} />
            <Link
              to={`/recipes?ingredient=${encodeURIComponent(item.name)}`}
              className="shrink-0 rounded-lg bg-amber-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-amber-600"
            >
              Find recipes
            </Link>
            <button
              type="button"
              onClick={() => onUse(item.id)}
              className="shrink-0 rounded-lg border border-brand-600 px-3 py-1.5 text-sm font-medium text-brand-700 hover:bg-brand-50"
            >
              {item.quantity === 1 ? 'Use last one' : 'Use 1'}
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default UseItSoonList