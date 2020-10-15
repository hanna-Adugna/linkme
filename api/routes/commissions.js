const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const CommissionController = require('../controllers/commissions')
//add ,checkAuth
router.get('/', CommissionController.getAllCommissions );
//add ,checkAuth
router.get("/:commissionID", CommissionController.createCommission);
//add ,checkAuth
router.post('/',  CommissionController.getByID );
//add ,checkAuth
router.patch('/:commissionID', CommissionController.updateCommission );
//add ,checkAuth
router.delete('/:commissionID', CommissionController.deleteCommission );

module.exports = router;    