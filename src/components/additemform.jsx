import { useState } from 'react'
import { CATEGORIES, UNITS } from '../data/pantry'

const EMPTY_FORM = {
  name: '',
  quantity: '1',
  unit: 'pcs',
  category: 'Fridge',
  expiryDate: '',
}

const inputClass =
  'mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100'

// Controlled form: every input's value comes from state, and every keystroke updates state.
function AddItemForm({ onAdd }) {
  // One state object for all fields
  const [form, setForm] = useState(EMPTY_FORM)

  // One change handler for every input: uses the input's `name` attribute to know which field to update
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault() // stop the browser from reloading the page
    onAdd({
      name: form.name.trim(),
      quantity: Number(form.quantity),
      unit: form.unit,
      category: form.category,
      expiryDate: form.expiryDate,
    })
    setForm(EMPTY_FORM)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-5 rounded-xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
      <div>
        <label htmlFor="name" className="text-sm font-medium">Item name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="e.g. Spinach"
          required
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="quantity" className="text-sm font-medium">Quantity</label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            min="1"
            value={form.quantity}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="unit" className="text-sm font-medium">Unit</label>
          <select id="unit" name="unit" value={form.unit} onChange={handleChange} className={inputClass}>
            {UNITS.map((unit) => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="category" className="text-sm font-medium">Stored in</label>
          <select id="category" name="category" value={form.category} onChange={handleChange} className={inputClass}>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="expiryDate" className="text-sm font-medium">Expiry date</label>
          <input
            id="expiryDate"
            name="expiryDate"
            type="date"
            value={form.expiryDate}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-brand-600 px-4 py-2.5 font-medium text-white hover:bg-brand-700 sm:w-auto"
      >
        Add to pantry
      </button>
    </form>
  )
}

export default AddItemForm