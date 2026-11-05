import express from 'express'
import loanCtrl from '../controllers/loan.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()

router.route('/api/loans')
  .get(authCtrl.requireSignin, loanCtrl.list)
  .post(authCtrl.requireSignin, loanCtrl.create)

router.route('/api/loans/:loanId')
  .get(authCtrl.requireSignin, loanCtrl.read)
  .put(authCtrl.requireSignin, loanCtrl.update)
  .delete(authCtrl.requireSignin, loanCtrl.remove)

router.route('/api/loans/:loanId/return')
  .put(authCtrl.requireSignin, loanCtrl.returnBook)

router.param('loanId', loanCtrl.loanByID)

export default router
