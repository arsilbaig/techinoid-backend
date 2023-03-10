const db = require('../models');
const joi = require('joi');
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
      type:'Vlaidation',
      message: 'Validation failed'
    });
  }
  try {
    const {title, content, image, publishedAt} = req.body;
    const blogs = await blog.create({
      title,
      content,
      image,
      publishedAt
    });
    res.status(201).json({
      message: 'Blog created successfully',
      blogs
    });
  } catch (error) {
    res.status(500).json({
      type:'Blog',
      message: error.message
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
    res.status(500).json({
      type:'blog',
      message: error.message
    });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blogs = await blog.findOne({where: {id: id}});
    if (!blogs) {
      return res.status(404).json({
        type:'Blog',
      message: 'Blog not found'
      });
    }
    res.status(200).json({
      message: 'Blog retrieved successfully',
      blogs
    });
  } catch (error) {
    res.status(500).json({
      type:'Blog',
      message: error.message
    });
  }
};

exports.updateBlog = async (req, res) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      type:'Validation',
      message: error.message
    });
  }
  try {
    const { id } = req.params;
    const updated = await blog.update({
      title: value.title,
      content: value.content,
      image: value.image,
      publishedAt: value.publishedAt
    }, {
      where: { id },
      returning: true,
    });
    if (!updated) {
      return res.status(404).json({
        type: 'Blog',
        message: 'Blog not found',
      });
    }
    res.status(200).json({
      message: 'Blog updated successfully',
    });
  } catch (error) {
    res.status(500).json({
      type:'Blog',
      message: error.message
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
        type:'Validation',
        message: 'Validation failed'  
      });
    }
    const deleted = await blog.destroy({
      where: { id },
    });
    if (!deleted) {
      return res.status(404).json({
        type: 'Blog',
        message: 'Blog not found',
      });
    }
    res.status(200).json({
      message: 'Blog deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      type:'Blog',
      message: error.message
    });
  }
};

exports.deleteBlogs = async (req, res) => {
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
    const deleted = await blog.destroy({
      where: { id: ids },
    });
    if (!deleted) {
      return res.status(404).json({
        type: 'Blog',
        message: 'Blogs not found',
      });
    }
    res.status(200).json({
      message: 'Blogs deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      type:'Blog',
      message: error.message
    });
  }
};
