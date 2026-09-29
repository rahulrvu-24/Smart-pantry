import { Link } from 'react-router-dom'
import PageHeader from '../components/pageheader'
import PantryList from '../components/pantrylist'

// Receives items and handlers from App and passes them down to PantryList
function Pantry({ items, onUse, onDelete, onReset }) {
  return (
    <>
      <PageHeader title="My Pantry" subtitle={`You have ${items.length} items at home.`}>
        <button
          type="button"
          onClick={onReset}
          className="rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium hover:bg-stone-100"
        >
          Reset sample data
        </button>
        <Link to="/add" className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700">
          + Add item
        </Link>
      </PageHeader>
      <PantryList items={items} onUse={onUse} onDelete={onDelete} />
    </>
  )
}

export default Pantry