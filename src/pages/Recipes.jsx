import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import RecipeCard from '../components/RecipeCard'
import RecipeSearchForm from '../components/RecipeSearchForm'
import { searchRecipes } from '../api/recipes'
import { getUrgentItems } from '../utils/expiry'

function Recipes({ items }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const ingredient = searchParams.get('ingredient') || ''

  // The latest finished search. `for` records which ingredient these results belong to.
  const [result, setResult] = useState({ for: null, recipes: [], error: null })

  // Side effect: fetch recipes whenever the ingredient in the URL changes
  useEffect(() => {
    if (!ingredient) return
    let ignore = false

    searchRecipes(ingredient)
      .then((data) => {
        if (!ignore) setResult({ for: ingredient, recipes: data.recipes, error: null })
      })
      .catch((err) => {
        if (!ignore) setResult({ for: ingredient, recipes: [], error: err.message })
      })

    return () => {
      ignore = true
    }
  }, [ingredient])

  // Derived: we're loading while the shown results belong to a different ingredient
  const loading = ingredient !== '' && result.for !== ingredient

  // Suggest the pantry items that are expiring soonest
  const suggestions = [...new Set(getUrgentItems(items).map((item) => item.name))].slice(0, 6)

  const search = (value) => setSearchParams({ ingredient: value })

  return (
    <>
      <PageHeader title="Recipe Rescue" subtitle="Recipes that use up what's about to expire." />

      <RecipeSearchForm key={ingredient} initial={ingredient} onSearch={search} />

      {suggestions.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
          <span className="text-stone-500">Use these up first:</span>
          {suggestions.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => search(name)}
              className="rounded-full border border-amber-300 bg-amber-50 px-3 py-1 font-medium text-amber-900 hover:bg-amber-100"
            >
              {name}
            </button>
          ))}
        </div>
      )}

      <section className="mt-6" aria-live="polite">
        {!ingredient && (
          <p className="rounded-xl border border-stone-200 bg-white p-8 text-center text-stone-600">
            Search for an ingredient, or pick one of your expiring items above.
          </p>
        )}

        {loading && <p className="p-8 text-center text-stone-500">Finding recipes with {ingredient}…</p>}

        {!loading && ingredient && result.error && (
          <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-800">
            {result.error}
          </p>
        )}

        {!loading && ingredient && !result.error && result.recipes.length === 0 && (
          <p className="rounded-xl border border-stone-200 bg-white p-8 text-center text-stone-600">
            No recipes found for “{ingredient}”. Try a simpler name, e.g. “chicken” instead of “chicken curry cut”.
          </p>
        )}

        {!loading && result.recipes.length > 0 && result.for === ingredient && (
          <>
            <p className="mb-3 text-sm text-stone-500">
              {result.recipes.length} recipes with <strong className="text-stone-800">{ingredient}</strong>
            </p>
            <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {result.recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} ingredient={ingredient} />
              ))}
            </ul>
          </>
        )}
      </section>
    </>
  )
}

export default Recipes