import { Link } from 'react-router-dom'

// One recipe in the results grid. `ingredient` is passed along so the detail page can link back.
function RecipeCard({ recipe, ingredient }) {
  return (
    <li>
      <Link
        to={`/recipes/${recipe.id}`}
        state={{ ingredient }}
        className="group block overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm transition hover:shadow-md"
      >
        <img
          src={recipe.image}
          alt=""
          loading="lazy"
          className="aspect-[4/3] w-full bg-stone-100 object-cover"
        />
        <p className="p-3 font-medium group-hover:text-brand-700">{recipe.name}</p>
      </Link>
    </li>
  )
}

export default RecipeCard