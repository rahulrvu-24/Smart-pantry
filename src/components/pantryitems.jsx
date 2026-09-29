import { formatDate } from '../utils/date'

const CATEGORY_STYLES = {
  Fridge: 'bg-sky-100 text-sky-800',
  Freezer: 'bg-indigo-100 text-indigo-800',
  Pantry: 'bg-amber-100 text-amber-800',
}

// Child component: displays ONE pantry item. Everything it shows comes from the `item` prop.
function PantryItem({ item }) {
  const { name, quantity, unit, category, expiryDate } = item

  return (
    <li className="flex flex-col rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-lg font-semibold">{name}</h3>
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${CATEGORY_STYLES[category]}`}>
          {category}
        </span>
      </div>

      <dl className="mt-3 space-y-1 text-sm text-stone-600">
        <div className="flex justify-between">
          <dt>Quantity</dt>
          <dd className="font-medium text-stone-800">
            {quantity} {unit}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt>Expires</dt>
          <dd className="font-medium text-stone-800">{formatDate(expiryDate)}</dd>
        </div>
      </dl>
    </li>
  )
}

export default PantryItem