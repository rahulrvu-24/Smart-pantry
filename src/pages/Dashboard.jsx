import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import StatCard from '../components/StatCard'
import { SOON_DAYS, countByStatus } from '../utils/expiry'

// Receives the pantry items from App (the same state the Pantry page uses)
function Dashboard({ items, loading }) {
  const counts = countByStatus(items)
  const show = (n) => (loading ? '–' : n)

  return (
    <>
      <PageHeader title="Dashboard" subtitle="What needs your attention in the kitchen today.">
        <Link to="/add" className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700">
          + Add item
        </Link>
      </PageHeader>

      <section aria-label="Pantry summary" className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard label="Total items" value={show(items.length)} hint="In your pantry" />
        <StatCard label="Fresh" value={show(counts.fresh)} hint={`More than ${SOON_DAYS} days left`} tone="fresh" />
        <StatCard label="Use soon" value={show(counts.soon)} hint={`Within ${SOON_DAYS} days`} tone="soon" />
        <StatCard label="Expired" value={show(counts.expired)} hint="Check or throw out" tone="expired" />
      </section>
    </>
  )
}

export default Dashboard