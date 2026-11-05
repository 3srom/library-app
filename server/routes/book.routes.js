import express from 'express'
import bookCtrl from '../controllers/book.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()

router.route('/api/books')
  .get(bookCtrl.list)
  .post(authCtrl.requireSignin, bookCtrl.create)
  .delete(authCtrl.requireSignin, bookCtrl.removeAll)

router.route('/api/books/:bookId')
  .get(bookCtrl.read)
  .put(authCtrl.requireSignin, bookCtrl.update)
  .delete(authCtrl.requireSignin, bookCtrl.remove)

router.param('bookId', bookCtrl.bookByID)

export default router
