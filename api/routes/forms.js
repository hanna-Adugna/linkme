const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const {checkRole} = require('../middleware/check-role');

const FormController = require('../controllers/forms');
// add checkAuth,
router.get('/', FormController.getAllForms);
// checkAuth,checkRole(['Employee','Employer']),
router.get('/:formID', FormController.getByID);
//add checkAuth,checkRole(['Employer']),
router.post('/', FormController.createForm );
//add  checkAuth,checkRole(['Employer']),
router.patch('/:formID',FormController.updateForm );
//add ,checkAuth,checkRole(['Employer'])
router.delete('/:formID',FormController.deleteForm );

module.exports = router;