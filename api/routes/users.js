const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const UserController = require('../controllers/users')

router.get('/' , checkAuth, UserController.getAllUsers );

router.post('/signup', checkAuth, UserController.signupUser);

router.post('/login', checkAuth, UserController.loginUser )

router.get("/:userID", checkAuth, UserController.getByID);

router.patch('/:userID', checkAuth, UserController.updateUser );

router.delete('/:userID', checkAuth, UserController.deleteUser);

module.exports = router;    