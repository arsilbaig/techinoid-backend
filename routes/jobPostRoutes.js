const express = require('express');
const router = express.Router();
const jobPostController = require('../controllers/jobPostController');
const authToken = require('../middlewares/verifyToken')

router.get('/jobpost',jobPostController.getJobPosts);


router.get('/jobpost/:id', jobPostController.getJobPostById);


router.post('/jobpost/create', authToken, jobPostController.createJobPost);


router.put('/jobpost/update/:id',authToken, jobPostController.updateJobPost);


router.delete('/jobpost/delete/:id', authToken, jobPostController.deleteJobPost);

module.exports = router;
