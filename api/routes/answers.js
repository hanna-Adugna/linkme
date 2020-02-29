const express = require('express');
const router = express.Router();

const AnswerController = require('../controllers/answers');

router.get('/', AnswerController.getAll);

router.get('/:answerID', AnswerController.getByID);

router.post('/', AnswerController.createAnswer);

router.patch('/:answerID', AnswerController.updateAnswer);

router.delete('/:answerID', AnswerController.deleteAnswer);

module.exports = router;