const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const RatingController = require('../controllers/ratings')

router.get('/',checkAuth, RatingController.getAllRatings );

router.get("/:ratingID",checkAuth, RatingController.getByID);

router.post('/', checkAuth, RatingController.rateUser );

router.patch('/:ratingID',checkAuth, RatingController.updateRate );

router.delete('/:ratingID',checkAuth, RatingController.deleteRate );

module.exports = router;    