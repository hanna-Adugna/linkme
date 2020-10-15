const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const {checkRole} = require('../middleware/check-role');

const NewsController = require('../controllers/news')
//checkAuth,
router.get('/',  NewsController.getAllNews);
//checkAuth,
router.get("/:newsID",  NewsController.getByID);
//add checkAuth, checkRole(['Employer']),
router.post('/', NewsController.addNews );
// add checkAuth,checkRole(['Employer']),
router.patch('/:newsID',  NewsController.updateNews );
// add checkAuth,checkRole(['Employer']),
router.delete('/:newsID',  NewsController.deleteNews );

module.exports = router;    