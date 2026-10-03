import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import StatCard from '../components/StatCard'
import UseItSoonList from '../components/UseItSoonList'
import { SOON_DAYS, countByStatus, getUrgentItems } from '../utils/expiry'

function Dashboard({ items, loading, onUse }) {
  const counts = countByStatus(items)
  const urgentItems = getUrgentItems(items)
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

      <section className="mt-8" aria-labelledby="use-it-soon">
        <h2 id="use-it-soon" className="mb-3 text-xl font-bold">
          Use It Soon {!loading && urgentItems.length > 0 && <span className="text-stone-400">({urgentItems.length})</span>}
        </h2>
        {loading ? (
          <div className="rounded-xl border border-stone-200 bg-white p-8 text-center text-stone-500">
            Loading your pantry…
          </div>
        ) : (
          <>
            <UseItSoonList items={urgentItems} onUse={onUse} />
            {urgentItems.length > 0 && (
              <p className="mt-3 text-sm text-stone-500">
                Expired items are listed first so you can check or throw them out.{' '}
                <Link to="/pantry" className="font-medium text-brand-700 hover:underline">
                  See full pantry →
                </Link>
              </p>
            )}
          </>
        )}
      </section>
    </>
  )
}

export default Dashboard