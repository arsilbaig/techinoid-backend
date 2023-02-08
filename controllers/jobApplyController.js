const db = require("../models");
const joi = require("joi");
const Sequelize = require('sequelize');
const multer = require('multer');
const uploader = require('./resumes.js')
const jobApply = db.jobApply

const schema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  phone: joi.string().required(),
  resume: joi.string().required(),
  jobPostid: joi.string().required()
  });

exports.jobApply = async (req, res) => {

  upload.single('resume')(req, res, (error) => {
    if (error) {
      return res.status(400).send({
        message: error,
      });
    }
    

    const resume = req.file;


    try {
     

      res.status(200).send({
        message: 'Resume uploaded successfully',
      });
    } catch (err) {
      res.status(500).send({
        message: 'Error saving resume',
      });
    }
  });
};

  exports.createJobApply = async (req, res) => {
   const validation = schema.validate(req.body);
    if (validation.error) {
    return res.status(400).json({
    type:'Validation',
    message: 'Validation failed',
    error: validation.error.details
    });
    }
    try {
      await uploader(req, res, async function (error, data) {
        if (error) {
          return res.status(400).send({
              "status": false,
              "message": error.message
          });
      }
        const uploadedFile = req?.file?.destination + req?.file?.filename;
        console.log(uploadedFile)

    const {jobPostid, name, email, phone, resume} = req.body;
    const existingApply = await jobApply.findOne({ where: { jobPostid, email } });
    if (existingApply) {
      return res.status(400).json({
        type: 'Validation',
        message: 'Email already applied for this job',
        error: {}
      });
    }
    const jobApplies = await jobApply.create({
    jobPostid,
    name,
    email,
    phone,
    resume
    });
    res.status(201).json({
    message: 'successfully applied for job',
    jobApplies
    });
  });
    } catch (error) {
    res.status(500).json({
    type:'Apply Job',
    message: 'Failed to Apply for Job',
    error: error.message
    });
    }
    };

exports.getJobApply = async (req, res) => {
  try {
    const jobApplies = await jobApply.findAll({
      attributes: ['id', 'name', 'email', 'phone', 'resume', 'jobPostid'],
      include: [{
        attributes: ['title'],
        model: db.jobPost, as: 'jobPost' 
     }],
      
    });
    res.status(200).json({
      message: "Applied Jobs Retrieved Successfully",
      jobApplies: jobApplies.map(jobApply => ({
        id: jobApply.id,
        name: jobApply.name,
        email: jobApply.email,
        phone: jobApply.phone,
        resume: jobApply.resume,
        jobPost: jobApply.jobPost.title
      }))
    });
  } catch (error) {
    res.status(500).json({
        type:'Apply for jobs',
        message: error
    });
  }
};
exports.getJobApplyById = async (req, res) => {
    try {
      const { id } = req.params;
      const jobApplies = await jobApply.findOne({where: {id: id}});
      if (!jobApplies) {
        return res.status(404).json({
          type:'Application for Jobs',
          message: 'Job Applications not found, Invalid id',
        });
      }
      res.sendFile("/resume.dat");
      res.status(200).json({
        message: 'Job Application retrieved successfully',
        jobApplies
        
      });
    } catch (error) {
      res.status(500).json({
        type: 'Job Applications',
        message: 'Failed to retrieve Job Application against id',
        error: error.message
      });
    }
  };

exports.deleteJobApply = async (req, res) => {
    try {
        const { id } = req.params;
        const schema = joi.object({
          id: joi.string().required()
        });
        const { error } = schema.validate({ id });
        if (error) {
          return res.status(400).json({
            type:'validation',
            message:"validation failed"
          });
        }
        const deleted = await jobApply.destroy({
          where: { id },
        });
        if (!deleted) {
          return res.status(404).json({
            type:'Apply for Jobs',
            message: 'Application for job not deleted',
          });
        }
        res.status(200).json({
          message: 'Application for Job deleted successfully',
        });
      } catch (error) {
        res.status(500).json({
            type:'Delete',
          message: 'Failed to delete contact',
          error: error.message
        });
      }
};
exports.deleteJobApplies = async (req, res) => {
  try {
    const { ids } = req.body;
    const schema = joi.array().items(joi.string().required());
    const { error } = schema.validate(ids);
    if (error) {
      return res.status(400).json({
        type:'Validation',
        message: 'Validation failed'  
      });
    }
    const deleted = await jobApply.destroy({
      where: { id: ids },
    });
    if (!deleted) {
      return res.status(404).json({
        type: 'Job Applications',
        message: 'Job Applications not found',
      });
    }
    res.status(200).json({
      message: 'Job Applications deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      type:'Job Application',
      message: error.message
    });
  }
};
