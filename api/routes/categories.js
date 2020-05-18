const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const {checkRole} = require('../middleware/check-role');

const CategoryController = require('../controllers/categories');

router.get('/',checkAuth, CategoryController.getAllCategories );

router.get('/:categoryID', checkAuth, CategoryController.getByID );

router.post('/', checkAuth,checkRole(['Admin']), CategoryController.createCategory );

router.patch('/:categoriesID', checkAuth,checkRole(['Admin']), CategoryController.updateCategory );

router.delete('/:categoriesID', checkAuth,checkRole(['Admin']),CategoryController.deleteCategory);

module.exports = router;