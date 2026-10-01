import mongoose from 'mongoose'
import { CATEGORIES, UNITS } from '../validation.js'

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
      trim: true,
      maxlength: [40, 'Name must be 40 characters or fewer.'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required.'],
      min: [1, 'Quantity must be at least 1.'],
      max: [999, 'Quantity must be 999 or less.'],
      validate: { validator: Number.isInteger, message: 'Quantity must be a whole number.' },
    },
    unit: { type: String, required: true, enum: UNITS },
    category: { type: String, required: true, enum: CATEGORIES },
    // Stored as 'YYYY-MM-DD' text: the same format the date picker uses, with no timezone surprises
    expiryDate: {
      type: String,
      required: [true, 'Expiry date is required.'],
      match: [/^\d{4}-\d{2}-\d{2}$/, 'Expiry date must be in YYYY-MM-DD format.'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false, // hide Mongoose's internal __v field
      // Send `id` (a plain string) to the React app instead of MongoDB's `_id` object
      transform: (doc, ret) => {
        ret.id = ret._id.toString()
        delete ret._id
        return ret
      },
    },
  },
)

// The model is what routes use to query the "items" collection
const Item = mongoose.model('Item', itemSchema)

export default Item