const db = require('../models');
const Joi = require('joi');
const JobPost = db.JobPost

const jobPostSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  requirements: Joi.string().required(),
  offer: Joi.string().required(),
  job_category: Joi.string().required(),
  department: Joi.string().required(),
  job_type: Joi.string().required(),
  location: Joi.string().required(),
  total_positions: Joi.number().required(),
  experience: Joi.number().required(),
  posting_date: Joi.date().required(),
  apply_before: Joi.date().required()
});

exports.createJobPost = async (req, res) => {
  const validationResult = jobPostSchema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({ success: false, error: validationResult.error.message });
  }

  const { title, description, requirements, offer, job_category, department, job_type, location, total_positions, experience, posting_date, apply_before } = req.body;
  try {
    const jobPosts = await JobPost.create({
      title,
      description,
      requirements,
      offer,
      job_category,
      department,
      job_type,
      location,
      total_positions,
      experience,
      posting_date,
      apply_before
    });
    res.json({ success: true, jobPosts });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.getJobPosts = async (req, res) => {
  try {
    const jobposts = await JobPost.findAll();
    res.status(200).json({
      message: 'jobs retrieved successfully',
      jobposts
    });
  } catch (error) {
    res.status(400).json({
      message: 'Failed to retrieve jobs',
      error: error.message
    });
  }
  };

exports.getJobPostById = async (req, res) => {
  try {
    const jobPosts = await JobPost.findByPk(req.params.id);
    if (!jobPosts) {
      return res.status(404).json({ success: false, error: 'Job post not found' });
    }
    res.json({ success: true, jobPosts });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.updateJobPost = async (req, res) => {
  const validationResult = jobPostSchema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({ success: false, error: validationResult.error.message });
  }

  try {
    const result = await JobPost.update(req.body, { where: { id: req.params.id } });
    if (result[0] === 0) {
      return res.status(404).json({ success: false, error: 'Job post not found' });
    }
    res.json({ success: true, message: 'Job post updated successfully' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.deleteJobPost = async (req, res) => {
  try {
    const result = await JobPost.destroy({ where: { id: req.params.id } });
    if (result === 0) {
      return res.status(404).json({ success: false, error: 'Job post not found' });
    }
    res.json({ success: true, message: 'Job post deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
