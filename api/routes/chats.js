const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const ChatController = require('../controllers/chats')
//add ,checkAuth
router.get('/', ChatController.getAllChats );
//add ,checkAuth
router.get("/:chatID", ChatController.getByID);
//add ,checkAuth
router.post('/',  ChatController.createChat );
//add ,checkAuth
router.patch('/:chatID', ChatController.updateChat );
//add ,checkAuth
router.delete('/:chatID', ChatController.deleteChat );

module.exports = router;    