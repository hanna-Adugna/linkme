const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const {checkRole} = require('../middleware/check-role');

const AnswerController = require('../controllers/answers');

router.get('/', checkAuth,AnswerController.getAllAnswers);

router.get('/:answerID',checkAuth,checkRole(['Employer','employee']), AnswerController.getByID);

router.post('/', checkAuth,checkRole(['Employee']),AnswerController.createAnswer);

router.patch('/:answerID',checkAuth,checkRole(['Employee']), AnswerController.updateAnswer);

router.delete('/:answerID',checkAuth, checkRole(['Employee']),AnswerController.deleteAnswer);

module.exports = router;