import { CATEGORIES } from '../data/pantry'

const FILTER_OPTIONS = ['All', ...CATEGORIES]

function PantryFilters({ search, onSearchChange, category, onCategoryChange, counts }) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative sm:w-72">
        <label htmlFor="search" className="sr-only">Search items</label>
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-stone-400" aria-hidden="true">
          🔍
        </span>
        <input
          id="search"
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search your pantry…"
          className="w-full rounded-lg border border-stone-300 bg-white py-2 pl-10 pr-3 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100"
        />
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        {FILTER_OPTIONS.map((option) => {
          const isActive = option === category
          return (
            <button
              key={option}
              type="button"
              onClick={() => onCategoryChange(option)}
              aria-pressed={isActive}
              className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'border-brand-600 bg-brand-600 text-white'
                  : 'border-stone-300 bg-white text-stone-600 hover:border-brand-600 hover:text-brand-700'
              }`}
            >
              {option} <span className={isActive ? 'text-brand-100' : 'text-stone-400'}>{counts[option]}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default PantryFilters