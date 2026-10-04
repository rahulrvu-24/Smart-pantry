import { request } from './client'

// Recipe Rescue API (our Express server, which proxies TheMealDB)
export const searchRecipes = (ingredient) =>
  request(`/recipes?ingredient=${encodeURIComponent(ingredient)}`)

export const getRecipe = (id) => request(`/recipes/${encodeURIComponent(id)}`)