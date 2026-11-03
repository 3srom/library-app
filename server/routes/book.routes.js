import express from 'express'
import bookCtrl from '../controllers/book.controller.js'

const router = express.Router()

router.route('/api/books')
  .get(bookCtrl.list)
  .post(bookCtrl.create)
  .delete(bookCtrl.removeAll)

router.route('/api/books/:bookId')
  .get(bookCtrl.read)
  .put(bookCtrl.update)
  .delete(bookCtrl.remove)

router.param('bookId', bookCtrl.bookByID)

export default router
