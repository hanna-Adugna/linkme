const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const {checkRole} = require('../middleware/check-role');

const BidController = require('../controllers/bids');

router.get('/', checkAuth,checkRole(['Employee']),BidController.getAllBids);

router.get('/:bidID', checkAuth,checkRole(['Employee','Employer']),BidController.getByID );

router.post('/',checkAuth,checkRole(['Employer']),BidController.createBid);

router.patch('/:bidID', checkAuth,checkRole(['Employer']),BidController.updateBid);

router.delete('/:bidID', checkAuth,checkRole(['Employer']),BidController.deleteBid);

module.exports = router;