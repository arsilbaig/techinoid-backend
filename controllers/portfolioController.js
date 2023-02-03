const db = require('../models');
const joi = require('joi');
const portfolio = db.portfolio


const schema = joi.object({
  title: joi.string().required(),
  description: joi.string().required(),
  image: joi.string().required()

})
exports.getAllPortfolios = async (req, res) => {
  try {
    const portfolios = await portfolio.findAll();
    res.status(200).json({
      message: 'Portfolios retrieved successfully',
      portfolios
    });
  } catch (error) {
    res.status(500).json({
      type:'portfolios',
      message: 'Failed to retrieve Portfolios',
      error: error.message
    });
  }
};

exports.getPortfolioById = async (req, res) => {
  try {
    const { id } = req.params;
    const portfolios = await portfolio.findOne({where: {id: id}});
    if (!portfolios) {
      return res.status(404).json({
        type:'portfolios',
        message: 'portfolio not found, Invalid id',
      });
    }
    res.status(200).json({
      message: 'Portfolio retrieved successfully',
      portfolios
    });
  } catch (error) {
    res.status(500).json({
      type: 'portfolio',
      message: 'Failed to retrieve Portfolio',
      error: error.message
    });
  }
};


exports.createPortfolio = async (req, res) => {
  const validation = schema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      type:'Validation',
      message: 'Validation failed',
      error: validation.error.details
    });
  }
  try {
    const {title, description, image} = req.body;
    const portfolios = await portfolio.create({
      title,
      description,
      image
    });
    res.status(201).json({
      message: 'Portfolio created successfully',
      portfolios
    });
  } catch (error) {
    res.status(500).json({
      type:'portfolio',
      message: 'Failed to create Portfolio',
      error: error.message
    });
  }
};

exports.updatePortfolio = async (req, res) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      type:'Validation',
      message: error.message
    });
  }
  try {
    const { id } = req.params;
    const updated = await portfolio.update({
      title: value.title,
      description: value.description,
      image: value.image
    }, {
      where: { id },
      returning: true,
    });
    if (!updated) {
      return res.status(404).json({
        type:'portfolio',
        message: 'Portfolio not found, id is invalid',
      });
    }
    res.status(200).json({
      message: 'Portfolio updated successfully',
    });
  } catch (error) {
    res.status(500).json({
      type:'portfolio',
      message: error.message
    });
  }
};


exports.deletePortfolio = async (req, res) => {
  try {
    const { id } = req.params;
    const schema = joi.object({
      id: joi.string().required()
    });
    const { error } = schema.validate({ id });
    if (error) {
      return res.status(400).json({
        type:"Validation",
        message: error.message
      });
    }
    const deleted = await portfolio.destroy({
      where: { id },
    });
    if (!deleted) {
      return res.status(404).json({
        type:'portfolio',
        message: 'Portfolio not found, id is invalid',
      });
    }
    res.status(200).json({
      message: 'Portfolio deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      type:'portfolio',
      message: error.message
    });
  }
};

exports.deletePortfolios = async (req, res) => {
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
    const deleted = await portfolio.destroy({
      where: { id: ids },
    });
    if (!deleted) {
      return res.status(404).json({
        type: 'Portfolio',
        message: 'Portfolio not found',
      });
    }
    res.status(200).json({
      message: 'Portfolios deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      type:'Portfolio',
      message: error.message
    });
  }
};