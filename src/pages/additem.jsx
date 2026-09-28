import PageHeader from '../components/pageheader'
import Placeholder from '../components/placeholder'

function AddItem() {
  return (
    <>
      <PageHeader title="Add Item" subtitle="Log groceries with a quantity and expiry date." />
      <Placeholder
        day="Day 3"
        items={[
          'Controlled form: name, quantity, category, expiry date',
          'Validation, then redirect to the pantry on submit',
        ]}
      />
    </>
  )
}

export default AddItem