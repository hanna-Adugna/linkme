const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const {checkRole} = require('../middleware/check-role');

const BankAccountController = require('../controllers/bankAccounts');
//checkAuth
router.get('/',BankAccountController.getAllBankAccounts);
// edit checkAuth,checkRole(['Employer','employee'])
router.get('/:BankAccountID', BankAccountController.getByID);
// edit checkAuth,checkRole(['Employee'])
router.post('/',BankAccountController.createBankAccount);
//edit checkAuth,checkRole(['Employee'])
router.patch('/:BankAccountID', BankAccountController.updateBankAccount);
//edit checkAuth,checkRole(['Employee'])
router.delete('/:BankAccountID',BankAccountController.deleteBankAccount);

module.exports = router;