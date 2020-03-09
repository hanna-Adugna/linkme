const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const JobController = require('../controllers/jobs')

router.get('/', checkAuth, JobController.getAllJobs);

router.get("/:jobID", checkAuth, JobController.getByID);

router.post('/', checkAuth, JobController.createJob );

router.patch('/:jobID', checkAuth, JobController.updateJob );

router.delete('/:jobID', checkAuth, JobController.deleteJob );

module.exports = router;    