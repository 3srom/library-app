import mongoose from 'mongoose'

const LoanSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.ObjectId,
    ref: 'Book',
    required: 'Book is required'
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'User is required'
  },
  borrowed: {
    type: Date,
    default: Date.now
  },
  due: {
    type: Date
  },
  returned: {
    type: Date
  },
  status: {
    type: String,
    default: 'out'
  }
})

export default mongoose.model('Loan', LoanSchema)
