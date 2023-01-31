const db = require('../models');
const joi = require('joi');
const base64 = require('base64-arraybuffer');
const blog = db.blog

exports.createBlog = async (req, res) => {
  try {
    const { title, content, image, publishedAt } = req.body;
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
  const dummy = blog
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
  try {
    const { id } = req.params;
    const updated = await blog.update(req.body, {
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
