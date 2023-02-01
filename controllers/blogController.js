const db = require('../models');
const joi = require('joi');
const base64 = require('base64-arraybuffer');
const blog = db.blog

const schema = joi.object({
  title: joi.string().required(),
  image: joi.string().required(),
  content: joi.string().required(),
  publishedAt: joi.date().required()

})
exports.createBlog = async (req, res) => {
  const validation = schema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      message: 'Validation failed',
      error: validation.error.details
    });
  }
  try {
    const {title, content, image, publishedAt} = req.body;
    const imageBase64 = base64.encode(image);
    const blogs = await blog.create({
      title,
      content,
      image: imageBase64,
      publishedAt
    });
    res.status(201).json({
      message: 'Blog created successfully',
      blogs
    });
  } catch (error) {
    res.status(400).json({
      message: 'Failed to create blog',
      error: error.message
    });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await blog.findAll();
    res.status(200).json({
      message: 'Blogs retrieved successfully',
      blogs
    });
  } catch (error) {
    res.status(400).json({
      message: 'Failed to retrieve blogs',
      error: error.message
    });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blogs = await blog.findOne({where: {id: id}});
    if (!blogs) {
      return res.status(404).json({
        message: 'Blog not found',
      });
    }
    res.status(200).json({
      message: 'Blog retrieved successfully',
      blogs
    });
  } catch (error) {
    res.status(400).json({
      message: 'Failed to retrieve blog',
      error: error.message
    });
  }
};

exports.updateBlog = async (req, res) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: 'Validation error',
      error: error.message
    });
  }
  try {
    const { id } = req.params;
    const imageBase64 = base64.encode(value.image);
    const updated = await blog.update({
      title: value.title,
      content: value.content,
      image: imageBase64,
      publishedAt: value.publishedAt
    }, {
      where: { id },
      returning: true,
    });
    if (!updated) {
      return res.status(404).json({
        message: 'Blog not found',
      });
    }
    res.status(200).json({
      message: 'Blog updated successfully',
    });
  } catch (error) {
    res.status(400).json({
      message: 'Failed to update blog',
      error: error.message
    });
  }
};
exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const schema = joi.object({
      id: joi.string().required()
    });
    const { error } = schema.validate({ id });
    if (error) {
      return res.status(400).json({
        message: error.message
      });
    }
    const deleted = await blog.destroy({
      where: { id },
    });
    if (!deleted) {
      return res.status(404).json({
        message: 'Blog not found',
      });
    }
    res.status(200).json({
      message: 'Blog deleted successfully',
    });
  } catch (error) {
    res.status(400).json({
      message: 'Failed to delete blog',
      error: error.message
    });
  }
};
