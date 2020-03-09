const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const CategoryController = require('../controllers/categories');

router.get('/',checkAuth, CategoryController.getAllCategories );

router.get('/:categoryID', checkAuth, CategoryController.getByID );

router.post('/', checkAuth, CategoryController.createCategory );

router.patch('/:categoriesID', checkAuth, CategoryController.updateCategory );

router.delete('/:categoriesID', checkAuth, CategoryController.deleteCategory);

module.exports = router;