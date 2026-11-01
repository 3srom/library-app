import mongoose from 'mongoose'

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: 'Tittle is required'
  },
  author: {
    type: String,
    trim: true,
    required: 'Author is required'
  },
  isbn: {
    type: String,
    trim: true,
    unique: 'ISBN already exists'
  },
  genre: {
    type: String,
    trim: true
  },
  year: Number,
  copies: {
    type: Number,
    default: 1
  },
  available: {
    type: Number,
    default: 1
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Book', BookSchema)
