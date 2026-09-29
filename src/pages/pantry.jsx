import PageHeader from '../components/pageheader'
import Placeholder from '../components/placeholder'

// Receives the pantry items from App as a prop
function Pantry({ items }) {
  return (
    <>
      <PageHeader title="My Pantry" subtitle={`You have ${items.length} items at home.`} />
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