import { formatDate } from '../utils/date'

const CATEGORY_STYLES = {
  Fridge: 'bg-sky-100 text-sky-800',
  Freezer: 'bg-indigo-100 text-indigo-800',
  Pantry: 'bg-amber-100 text-amber-800',
}

// Child component: displays ONE pantry item. Everything it shows comes from the `item` prop.
// It doesn't change state itself; it calls the onUse / onDelete functions its parent passed in.
function PantryItem({ item, onUse, onDelete }) {
  const { id, name, quantity, unit, category, expiryDate } = item

  const handleDeleteClick = () => {
    if (window.confirm(`Remove ${name} from your pantry?`)) {
      onDelete(id)
    }
  }

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

      <div className="mt-4 flex gap-2 pt-1">
        <button
          type="button"
          onClick={() => onUse(id)}
          className="flex-1 rounded-lg bg-brand-600 px-3 py-2 text-sm font-medium text-white hover:bg-brand-700"
        >
          {quantity === 1 ? 'Use last one' : 'Use 1'}
        </button>
        <button
          type="button"
          onClick={handleDeleteClick}
          className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
        >
          Delete
        </button>
      </div>
    </li>
  )
}

export default PantryItem