const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const AnswerController = require('../controllers/answers');

router.get('/', checkAuth, AnswerController.getAllAnswers);

router.get('/:answerID',checkAuth, AnswerController.getByID);

router.post('/', checkAuth,AnswerController.createAnswer);

router.patch('/:answerID',checkAuth, AnswerController.updateAnswer);

router.delete('/:answerID',checkAuth, AnswerController.deleteAnswer);

module.exports = router;