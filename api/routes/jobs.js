const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const {checkRole} = require('../middleware/check-role');

const JobController = require('../controllers/jobs')

router.get('/', checkAuth, JobController.getAllJobs);

router.get("/:jobID", checkAuth, JobController.getByID);

router.post('/', checkAuth, checkRole(['Employer']),JobController.createJob );

router.patch('/:jobID', checkAuth,checkRole(['Employer']), JobController.updateJob );

router.delete('/:jobID', checkAuth,checkRole(['Employer']), JobController.deleteJob );

module.exports = router;    