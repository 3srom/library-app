import Book from '../models/book.model.js'
import extend from 'lodash/extend.js'
import errorHandler from '../helpers/dbErrorHandler.js'

const create = async (req, res) => {
  const book = new Book(req.body)
  try {
    await book.save()
    return res.status(200).json({
      message: 'Book added!'
    })
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const list = async (req, res) => {
  try {
    let books = await Book.find().select('title author isbn genre year copies available')
    res.json(books)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const bookByID = async (req, res, next, id) => {
  try {
    let book = await Book.findById(id)
    if (!book)
      return res.status(400).json({
        error: 'Book not found'
      })
    req.book = book
    next()
  } catch (err) {
    return res.status(400).json({
      error: 'Could not retrieve book'
    })
  }
}

const read = (req, res) => {
  return res.json(req.book)
}

const update = async (req, res) => {
  try {
    let book = req.book
    book = extend(book, req.body)
    book.updated = Date.now()
    await book.save()
    res.json(book)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const remove = async (req, res) => {
  try {
    let book = req.book
    let deletedBook = await book.deleteOne()
    res.json(deletedBook)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const removeAll = async (req, res) => {
  try {
    let result = await Book.deleteMany({})
    res.json({ message: result.deletedCount + ' books removed' })
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

export default { create, bookByID, read, list, remove, removeAll, update }
