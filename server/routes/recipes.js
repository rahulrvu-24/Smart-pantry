import { Router } from 'express'

const MEALDB = process.env.MEALDB_BASE || 'https://www.themealdb.com/api/json/v1/1'

const router = Router()

// Simple in-memory cache so repeated searches don't hit TheMealDB again (cleared on restart)
const cache = new Map()
const CACHE_MS = 60 * 60 * 1000 // 1 hour

async function fetchMealDb(path) {
  const cached = cache.get(path)
  if (cached && Date.now() - cached.time < CACHE_MS) return cached.data

  let res
  try {
    res = await fetch(`${MEALDB}${path}`, { signal: AbortSignal.timeout(8000) })
  } catch {
    const err = new Error('The recipe service is not responding. Please try again.')
    err.status = 502 // Bad Gateway: an upstream service failed
    throw err
  }
  if (!res.ok) {
    const err = new Error('The recipe service returned an error. Please try again.')
    err.status = 502
    throw err
  }

  const data = await res.json()
  cache.set(path, { data, time: Date.now() })
  return data
}

function toMealDbIngredient(text) {
  return text.trim().toLowerCase().replace(/\s+/g, '_')
}

function extractIngredients(meal) {
  const list = []
  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}`]?.trim()
    if (name) list.push({ name, measure: meal[`strMeasure${i}`]?.trim() || '' })
  }
  return list
}

router.get('/', async (req, res) => {
  const ingredient = (req.query.ingredient || '').trim() // req.query = the ?key=value part of the URL

  if (!ingredient) {
    return res.status(400).json({ error: 'Please provide an ingredient, e.g. /api/recipes?ingredient=spinach' })
  }
  if (ingredient.length > 40 || !/^[a-zA-Z\s-]+$/.test(ingredient)) {
    return res.status(400).json({ error: 'Ingredient must be letters only (max 40 characters).' })
  }

  const data = await fetchMealDb(`/filter.php?i=${encodeURIComponent(toMealDbIngredient(ingredient))}`)
  const recipes = (data.meals ?? []).slice(0, 12).map((meal) => ({
    id: meal.idMeal,
    name: meal.strMeal,
    image: meal.strMealThumb,
  }))

  res.json({ ingredient, count: recipes.length, recipes }) // TheMealDB returns meals: null when nothing matches
})

// GET /api/recipes/:id -> full details of one recipe
router.get('/:id', async (req, res) => {
  const { id } = req.params
  if (!/^\d+$/.test(id)) {
    return res.status(404).json({ error: `Recipe ${id} not found` })
  }

  const data = await fetchMealDb(`/lookup.php?i=${id}`)
  const meal = data.meals?.[0]
  if (!meal) {
    return res.status(404).json({ error: `Recipe ${id} not found` })
  }

  res.json({
    id: meal.idMeal,
    name: meal.strMeal,
    category: meal.strCategory,
    area: meal.strArea,
    image: meal.strMealThumb,
    instructions: meal.strInstructions,
    youtube: meal.strYoutube || null,
    source: meal.strSource || null,
    ingredients: extractIngredients(meal),
  })
})

export default router