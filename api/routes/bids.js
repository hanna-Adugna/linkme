const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const BidController = require('../controllers/bids');

router.get('/', checkAuth,BidController.getAllBids);

router.get('/:bidID', checkAuth,BidController.getByID );

router.post('/',checkAuth,BidController.createBid);

router.patch('/:bidID', checkAuth,BidController.updateBid);

router.delete('/:bidID', checkAuth,BidController.deleteBid);

module.exports = router;