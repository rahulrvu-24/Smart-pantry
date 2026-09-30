import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/pageheader'
import PantryFilters from '../components/pantryfilters'
import PantryList from '../components/pantrylist'

// Receives items and handlers from App and passes them down to PantryList
function Pantry({ items, onUse, onDelete, onReset }) {
  // Search text only matters on this page, so the state lives here (not in App)
  const [search, setSearch] = useState('')

  // Derived data: calculated from state on every render, never stored in its own state
  const query = search.trim().toLowerCase()
  const visibleItems = items.filter((item) => item.name.toLowerCase().includes(query))

  const hasItems = items.length > 0
  const noMatches = hasItems && visibleItems.length === 0

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

      {hasItems && <PantryFilters search={search} onSearchChange={setSearch} />}

      {noMatches ? (
        <div className="rounded-xl border border-stone-200 bg-white p-10 text-center">
          <p className="text-stone-600">No items match “{search}”.</p>
          <button
            type="button"
            onClick={() => setSearch('')}
            className="mt-3 font-medium text-brand-700 hover:underline"
          >
            Clear search
          </button>
        </div>
      ) : (
        <PantryList items={visibleItems} onUse={onUse} onDelete={onDelete} />
      )}
    </>
  )
}

export default Pantry