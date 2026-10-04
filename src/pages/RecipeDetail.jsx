import { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { getRecipe } from '../api/recipes'

// Does the pantry contain something matching this recipe ingredient? ("Chicken" matches "chicken breast")
function inPantry(ingredientName, items) {
  const a = ingredientName.toLowerCase()
  return items.some((item) => {
    const b = item.name.toLowerCase()
    return a.includes(b) || b.includes(a)
  })
}

function RecipeDetail({ items }) {
  const { id } = useParams() // from the URL: /recipes/:id
  const location = useLocation()
  const fromIngredient = location.state?.ingredient // set by RecipeCard's Link

  const [result, setResult] = useState({ for: null, recipe: null, error: null })

  // Side effect: load this recipe whenever the id in the URL changes
  useEffect(() => {
    let ignore = false
    getRecipe(id)
      .then((recipe) => {
        if (!ignore) setResult({ for: id, recipe, error: null })
      })
      .catch((err) => {
        if (!ignore) setResult({ for: id, recipe: null, error: err.message })
      })
    return () => {
      ignore = true
    }
  }, [id])

  const loading = result.for !== id
  const { recipe, error } = result
  const backTo = fromIngredient ? `/recipes?ingredient=${encodeURIComponent(fromIngredient)}` : '/recipes'

  const backLink = (
    <Link to={backTo} className="rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium hover:bg-stone-100">
      ← Back to recipes
    </Link>
  )

  if (loading) {
    return <p className="p-8 text-center text-stone-500">Loading recipe…</p>
  }

  if (error) {
    return (
      <>
        <PageHeader title="Recipe not available">{backLink}</PageHeader>
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-800">{error}</p>
      </>
    )
  }

  const haveCount = recipe.ingredients.filter((ing) => inPantry(ing.name, items)).length
  const steps = recipe.instructions.split(/\r?\n/).map((s) => s.trim()).filter(Boolean)

  return (
    <>
      <PageHeader title={recipe.name} subtitle={[recipe.area, recipe.category].filter(Boolean).join(' · ')}>
        {backLink}
      </PageHeader>

      <div className="grid gap-6 md:grid-cols-2">
        <img src={recipe.image} alt={recipe.name} className="w-full rounded-xl bg-stone-100 object-cover shadow-sm" />

        <section className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold">Ingredients</h2>
          <p className="mt-1 text-sm text-stone-500">
            You have {haveCount} of {recipe.ingredients.length} in your pantry.
          </p>
          <ul className="mt-3 divide-y divide-stone-100">
            {recipe.ingredients.map((ing, index) => {
              const have = inPantry(ing.name, items)
              return (
                <li key={`${ing.name}-${index}`} className="flex justify-between gap-3 py-2 text-sm">
                  <span className={have ? 'font-medium text-brand-700' : ''}>
                    {have && <span aria-label="In your pantry">✓ </span>}
                    {ing.name}
                  </span>
                  <span className="text-right text-stone-500">{ing.measure}</span>
                </li>
              )
            })}
          </ul>
        </section>
      </div>

      <section className="mt-6 rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold">Method</h2>
        <ol className="mt-3 list-decimal space-y-3 pl-5 text-stone-700">
          {steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
        {recipe.youtube && (
          <a
            href={recipe.youtube}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-block rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            ▶ Watch on YouTube
          </a>
        )}
      </section>
    </>
  )
}

export default RecipeDetail