import { useState } from 'react'
import { CATEGORIES, UNITS } from '../data/pantry'
import { toDateString } from '../utils/date'

const EMPTY_FORM = {
  name: '',
  quantity: '1',
  unit: 'pcs',
  category: 'Fridge',
  expiryDate: '',
}

// Returns an object of error messages, e.g. { name: 'Please enter a name.' }. Empty object = valid.
function validate(form) {
  const errors = {}
  const today = toDateString(new Date())
  const quantity = Number(form.quantity)

  if (!form.name.trim()) {
    errors.name = 'Please enter an item name.'
  } else if (form.name.trim().length > 40) {
    errors.name = 'Keep the name under 40 characters.'
  }

  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 999) {
    errors.quantity = 'Quantity must be a whole number from 1 to 999.'
  }

  if (!form.expiryDate) {
    errors.expiryDate = 'Please pick an expiry date.'
  } else if (form.expiryDate < today) {
    // 'YYYY-MM-DD' strings compare correctly as text
    errors.expiryDate = "Expiry date can't be in the past."
  }

  return errors
}

const inputBase =
  'mt-1 w-full rounded-lg border bg-white px-3 py-2 focus:outline-none focus:ring-2'

// Red border when the field has an error, green focus ring otherwise
const inputClass = (hasError) =>
  `${inputBase} ${
    hasError
      ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
      : 'border-stone-300 focus:border-brand-600 focus:ring-brand-100'
  }`

function FieldError({ message }) {
  if (!message) return null
  return <p className="mt-1 text-sm text-red-600">{message}</p>
}

// Controlled form: every input's value comes from state, and every keystroke updates state.
function AddItemForm({ onAdd, onCancel }) {
  // One state object for all fields, plus one for validation errors
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  // Today's date, worked out once when the form first appears (used as the date picker's minimum)
  const [today] = useState(() => toDateString(new Date()))

  // One change handler for every input: uses the input's `name` attribute to know which field to update
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    // Clear that field's error as soon as the user edits it
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = (e) => {
    e.preventDefault() // stop the browser from reloading the page

    const newErrors = validate(form)
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return // don't submit invalid data
    }

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
    // noValidate turns off the browser's built-in popups so our own messages are shown instead
    <form
      onSubmit={handleSubmit}
      noValidate
      className="max-w-xl space-y-5 rounded-xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <div>
        <label htmlFor="name" className="text-sm font-medium">Item name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="e.g. Spinach"
          aria-invalid={Boolean(errors.name)}
          className={inputClass(errors.name)}
        />
        <FieldError message={errors.name} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="quantity" className="text-sm font-medium">Quantity</label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            min="1"
            max="999"
            value={form.quantity}
            onChange={handleChange}
            aria-invalid={Boolean(errors.quantity)}
            className={inputClass(errors.quantity)}
          />
          <FieldError message={errors.quantity} />
        </div>
        <div>
          <label htmlFor="unit" className="text-sm font-medium">Unit</label>
          <select id="unit" name="unit" value={form.unit} onChange={handleChange} className={inputClass(false)}>
            {UNITS.map((unit) => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="category" className="text-sm font-medium">Stored in</label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            className={inputClass(false)}
          >
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
            min={today}
            value={form.expiryDate}
            onChange={handleChange}
            aria-invalid={Boolean(errors.expiryDate)}
            className={inputClass(errors.expiryDate)}
          />
          <FieldError message={errors.expiryDate} />
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          type="submit"
          className="rounded-lg bg-brand-600 px-4 py-2.5 font-medium text-white hover:bg-brand-700"
        >
          Add to pantry
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-stone-300 px-4 py-2.5 font-medium hover:bg-stone-100"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default AddItemForm