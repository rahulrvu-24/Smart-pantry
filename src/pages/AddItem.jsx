import { useNavigate } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import AddItemForm from '../components/AddItemForm'

function AddItem({ onAdd }) {
  const navigate = useNavigate()

  const handleAdd = async (newItem) => {
    const saved = await onAdd(newItem)
    if (saved) navigate('/pantry')
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