const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const {checkRole} = require('../middleware/check-role');

const AnswerController = require('../controllers/answers');

//checkAuth
router.get('/',AnswerController.getAllAnswers);
// add checkAuth,checkRole(['Employer','employee'])
router.get('/:answerID', AnswerController.getByID);
// add checkAuth,checkRole(['Employee'])
router.post('/',AnswerController.createAnswer);
//add checkAuth,checkRole(['Employee'])
router.patch('/:answerID', AnswerController.updateAnswer);
//add checkAuth,checkRole(['Employee'])
router.delete('/:answerID',AnswerController.deleteAnswer);

module.exports = router;