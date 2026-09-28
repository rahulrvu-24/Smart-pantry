import { Link } from 'react-router-dom'
import PageHeader from '../components/pageheader'
import Placeholder from '../components/placeholder'

function Dashboard() {
  return (
    <>
      <PageHeader title="Dashboard" subtitle="What needs your attention in the kitchen today.">
        <Link to="/add" className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700">
          + Add item
        </Link>
      </PageHeader>
      <Placeholder
        day="Day 4"
        items={[
          'Summary cards: total items, expiring soon, expired',
          '"Use It Soon" list sorted by nearest expiry',
        ]}
      />
    </>
  )
}

export default Dashboard