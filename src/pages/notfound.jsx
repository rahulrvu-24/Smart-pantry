import { Link } from 'react-router-dom'
import PageHeader from '../components/pageheader'

function NotFound() {
  return (
    <div className="py-12 text-center">
      <PageHeader title="Page not found" />
      <p className="text-6xl" aria-hidden="true">🥲</p>
      <p className="mt-4 text-stone-600">This shelf is empty. The page you're looking for doesn't exist.</p>
      <Link to="/" className="mt-6 inline-block rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700">
        Back to dashboard
      </Link>
    </div>
  )
}

export default NotFound