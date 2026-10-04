import { useState } from 'react'

function RecipeSearchForm({ initial, onSearch }) {
  const [query, setQuery] = useState(initial)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) onSearch(query.trim())
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 sm:max-w-md">
      <label htmlFor="ingredient" className="sr-only">Ingredient</label>
      <input
        id="ingredient"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type an ingredient, e.g. spinach"
        className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100"
      />
      <button type="submit" className="rounded-lg bg-brand-600 px-4 py-2 font-medium text-white hover:bg-brand-700">
        Search
      </button>
    </form>
  )
}

export default RecipeSearchForm