import PageHeader from '../components/pageheader'
import Placeholder from '../components/placeholder'

function Pantry() {
  return (
    <>
      <PageHeader title="My Pantry" subtitle="Everything you have at home, in one place." />
      <Placeholder
        day="Days 2–3"
        items={[
          'Pantry list rendered from state via PantryList → PantryItem',
          'Mark as used and delete',
          'Search by name and filter by category',
        ]}
      />
    </>
  )
}

export default Pantry