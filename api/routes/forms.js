const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const {checkRole} = require('../middleware/check-role');

const FormController = require('../controllers/forms');

router.get('/', checkAuth,FormController.getAllForms);

router.get('/:formID', checkAuth,checkRole(['Employee','Employer']),FormController.getByID);

router.post('/', checkAuth,checkRole(['Employer']),FormController.createForm );

router.patch('/:formID', checkAuth,checkRole(['Employer']),FormController.updateForm );

router.delete('/:formID',checkAuth,checkRole(['Employer']),FormController.deleteForm );

module.exports = router;