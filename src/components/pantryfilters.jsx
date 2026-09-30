function PantryFilters({ search, onSearchChange }) {
  return (
    <div className="mb-5">
      <label htmlFor="search" className="sr-only">Search items</label>
      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-stone-400" aria-hidden="true">
          🔍
        </span>
        <input
          id="search"
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search your pantry…"
          className="w-full rounded-lg border border-stone-300 bg-white py-2 pl-10 pr-3 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100 sm:max-w-sm"
        />
      </div>
    </div>
  )
}

export default PantryFilters