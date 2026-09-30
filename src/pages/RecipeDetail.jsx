import { Link, useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import Placeholder from '../components/Placeholder'

function RecipeDetail() {
  // Dynamic route segment from /recipes/:id
  const { id } = useParams()

  return (
    <>
      <PageHeader title="Recipe Details" subtitle={`Recipe #${id}`}>
        <Link to="/recipes" className="rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium hover:bg-stone-100">
          ← Back to recipes
        </Link>
      </PageHeader>
      <Placeholder day="Day 5" items={['Full ingredients and instructions for this recipe']} />
    </>
  )
}

export default RecipeDetail