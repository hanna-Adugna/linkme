const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const {checkRole} = require('../middleware/check-role');

const JobController = require('../controllers/jobs')
//checkAuth,
router.get('/',  JobController.getAllJobs);
//checkAuth,
router.get("/:jobID",  JobController.getByID);
//add checkAuth, checkRole(['Employer']),
router.post('/', JobController.createJob );
// add checkAuth,checkRole(['Employer']),
router.patch('/:jobID',  JobController.updateJob );
// add checkAuth,checkRole(['Employer']),
router.delete('/:jobID',  JobController.deleteJob );

module.exports = router;    