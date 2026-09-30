import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import PantryFilters from '../components/PantryFilters'
import PantryList from '../components/PantryList'
import { CATEGORIES } from '../data/pantry'

function Pantry({ items, loading, onUse, onDelete, onReset }) {

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  // Derived data: calculated from state on every render, never stored in its own state
  const query = search.trim().toLowerCase()
  const visibleItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(query) && (category === 'All' || item.category === category),
  )

  // How many items are in each category, e.g. { All: 8, Fridge: 5, Freezer: 1, Pantry: 2 }
  const counts = { All: items.length }
  for (const c of CATEGORIES) {
    counts[c] = items.filter((item) => item.category === c).length
  }

  const hasItems = items.length > 0
  const noMatches = hasItems && visibleItems.length === 0
  const isFiltering = query !== '' || category !== 'All'

  const clearFilters = () => {
    setSearch('')
    setCategory('All')
  }

  return (
    <>
      <PageHeader
        title="My Pantry"
        subtitle={loading ? 'Loading your pantry…' : `You have ${items.length} items at home.`}
      >
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

      {hasItems && (
        <PantryFilters
          search={search}
          onSearchChange={setSearch}
          category={category}
          onCategoryChange={setCategory}
          counts={counts}
        />
      )}

      {isFiltering && !noMatches && (
        <p className="mb-3 text-sm text-stone-500">
          Showing {visibleItems.length} of {items.length} items ·{' '}
          <button type="button" onClick={clearFilters} className="font-medium text-brand-700 hover:underline">
            Clear filters
          </button>
        </p>
      )}

      {loading ? (
        <div className="rounded-xl border border-stone-200 bg-white p-10 text-center text-stone-500">
          Loading your pantry…
        </div>
      ) : noMatches ? (
        <div className="rounded-xl border border-stone-200 bg-white p-10 text-center">
          <p className="text-stone-600">No items match your search and filters.</p>
          <button type="button" onClick={clearFilters} className="mt-3 font-medium text-brand-700 hover:underline">
            Clear filters
          </button>
        </div>
      ) : (
        <PantryList items={visibleItems} onUse={onUse} onDelete={onDelete} />
      )}
    </>
  )
}

export default Pantry