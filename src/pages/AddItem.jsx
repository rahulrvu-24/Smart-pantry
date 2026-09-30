import { useNavigate } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import AddItemForm from '../components/AddItemForm'

// Page component: the form only collects data; the page decides what happens after (navigation).
function AddItem({ onAdd }) {
  const navigate = useNavigate()

  const handleAdd = (newItem) => {
    onAdd(newItem) // update App's state
    navigate('/pantry') // then go to the pantry to see it
  }

  const handleCancel = () => navigate('/pantry')

  return (
    <>
      <PageHeader title="Add Item" subtitle="Log groceries with a quantity and expiry date." />
      <AddItemForm onAdd={handleAdd} onCancel={handleCancel} />
    </>
  )
}

export default AddItem