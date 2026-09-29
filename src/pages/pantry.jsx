import PageHeader from '../components/pageheader'
import PantryList from '../components/pantrylist'

// Receives items and handlers from App and passes them down to PantryList
function Pantry({ items, onUse, onDelete }) {
  return (
    <>
      <PageHeader title="My Pantry" subtitle={`You have ${items.length} items at home.`} />
      <PantryList items={items} onUse={onUse} onDelete={onDelete} />
    </>
  )
}

export default Pantry