import { Link } from 'react-router-dom'
import PantryItem from './pantryitems'

// Parent of PantryItem: receives the whole array and renders one child per item.
function PantryList({ items }) {
  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-stone-200 bg-white p-10 text-center">
        <p className="text-4xl" aria-hidden="true">🧺</p>
        <p className="mt-3 text-stone-600">Your pantry is empty.</p>
        <Link to="/add" className="mt-4 inline-block font-medium text-brand-700 hover:underline">
          Add your first item →
        </Link>
      </div>
    )
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        // key lets React track each item between renders
        <PantryItem key={item.id} item={item} />
      ))}
    </ul>
  )
}

export default PantryList