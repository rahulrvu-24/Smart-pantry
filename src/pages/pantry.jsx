import PageHeader from '../components/pageheader'
import PantryList from '../components/pantrylist'

// Receives the pantry items from App as a prop and hands them to PantryList
function Pantry({ items }) {
  return (
    <>
      <PageHeader title="My Pantry" subtitle={`You have ${items.length} items at home.`} />
      <PantryList items={items} />
    </>
  )
}

export default Pantry