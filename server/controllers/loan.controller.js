import Loan from '../models/loan.model.js'
import Book from '../models/book.model.js'
import extend from 'lodash/extend.js'
import errorHandler from '../helpers/dbErrorHandler.js'

const create = async (req, res) => {
  try {
    let book = await Book.findById(req.body.book)
    if (!book)
      return res.status(400).json({ error: 'Book not found' })
    if (book.available < 1)
      return res.status(400).json({ error: 'No copies available' })
    const loan = new Loan(req.body)
    // 14 day loan if no due date given
    if (!loan.due) {
      loan.due = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
    }
    await loan.save()
    book.available = book.available - 1
    await book.save()
    return res.status(200).json({
      message: 'Book checked out!'
    })
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const list = async (req, res) => {
  try {
    let loans = await Loan.find()
      .populate('book', 'title author')
      .populate('user', 'name email')
    res.json(loans)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const loanByID = async (req, res, next, id) => {
  try {
    let loan = await Loan.findById(id)
      .populate('book', 'title author')
      .populate('user', 'name email')
    if (!loan)
      return res.status(400).json({
        error: 'Loan not found'
      })
    req.loan = loan
    next()
  } catch (err) {
    return res.status(400).json({
      error: 'Could not retrieve loan'
    })
  }
}

const read = (req, res) => {
  return res.json(req.loan)
}

const update = async (req, res) => {
  try {
    let loan = req.loan
    loan = extend(loan, req.body)
    await loan.save()
    res.json(loan)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const returnBook = async (req, res) => {
  try {
    let loan = req.loan
    if (loan.status === 'returned')
      return res.status(400).json({ error: 'Already returned' })
    loan.returned = Date.now()
    loan.status = 'returned'
    await loan.save()
    let book = await Book.findById(loan.book)
    book.available = book.available + 1
    await book.save()
    res.json(loan)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const remove = async (req, res) => {
  try {
    let loan = req.loan
    let deletedLoan = await loan.deleteOne()
    res.json(deletedLoan)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

export default { create, loanByID, read, list, update, returnBook, remove }
