const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const FeedbackController = require('../controllers/feedbacks')
//add ,checkAuth
router.get('/', FeedbackController.getAllFeedbacks );
//add ,checkAuth
router.get("/:feedbackID", FeedbackController.getByID);
//add ,checkAuth
router.post('/',  FeedbackController.giveFeedbacks );
//add ,checkAuth
router.patch('/:feedbackID', FeedbackController.updateFeedback );
//add ,checkAuth
router.delete('/:feedbackID', FeedbackController.deleteFeedback );

module.exports = router;    