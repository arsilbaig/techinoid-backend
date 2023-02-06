const express = require("express");
const router = express.Router();
const authToken = require('../middlewares/verifyToken')
const jobApplyController = require("../controllers/jobApplyController.js");


router.get("/jobApply",authToken, jobApplyController.getJobApply);

router.get("/jobApply/:id",authToken, jobApplyController.getJobApplyById);


router.post("/jobApply/create", jobApplyController.createJobApply); 

router.delete("/jobApply/delete/:id",authToken, jobApplyController.deleteJobApply);

router.delete("/jobApply/delete",authToken ,jobApplyController.deleteJobApplies);

module.exports = router;