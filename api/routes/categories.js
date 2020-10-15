const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const {checkRole} = require('../middleware/check-role');

const CategoryController = require('../controllers/categories');
//add checkAuth
router.get('/', CategoryController.getAllCategories );

router.get('/:categoryID', checkAuth, CategoryController.getByID );
//add checkAuth,checkRole(['Admin']),
router.post('/', CategoryController.createCategory );
//add checkAuth,checkRole(['Admin'])
router.patch('/:categoriesID', CategoryController.updateCategory );
//add checkAuth,checkRole(['Admin'])
router.delete('/:categoriesID',CategoryController.deleteCategory);

module.exports = router;