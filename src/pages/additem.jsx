import PageHeader from '../components/pageheader'
import AddItemForm from '../components/additemform'

// Page component: receives onAdd from App and passes it to the form
function AddItem({ onAdd }) {
  return (
    <>
      <PageHeader title="Add Item" subtitle="Log groceries with a quantity and expiry date." />
      <AddItemForm onAdd={onAdd} />
    </>
  )
}

export default AddItem