const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const FormController = require('../controllers/forms');

router.get('/', checkAuth,FormController.getAllForms);

router.get('/:formID', checkAuth,FormController.getByID);

router.post('/', checkAuth,FormController.createForm );

router.patch('/:formID', checkAuth,FormController.updateForm );

router.delete('/:formID',checkAuth,FormController.deleteForm );

module.exports = router;