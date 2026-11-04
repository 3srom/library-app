import express from 'express'
import loanCtrl from '../controllers/loan.controller.js'

const router = express.Router()

router.route('/api/loans')
  .get(loanCtrl.list)
  .post(loanCtrl.create)

router.route('/api/loans/:loanId')
  .get(loanCtrl.read)
  .put(loanCtrl.update)
  .delete(loanCtrl.remove)

router.route('/api/loans/:loanId/return')
  .put(loanCtrl.returnBook)

router.param('loanId', loanCtrl.loanByID)

export default router
