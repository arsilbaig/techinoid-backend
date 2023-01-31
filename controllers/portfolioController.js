const db = require('../models');
const base64 = require('base64-arraybuffer');
const portfolio = db.portfolio


exports.getAllPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.findAll();
    return res.json(portfolios);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


exports.getPortfolioById = async (req, res) => {
  try {
    const portfolio = await Portfolio.findByPk(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }
    return res.json(portfolio);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


exports.createPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.create(req.body);
    return res.status(201).json(portfolio);
  } 
  catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


exports.updatePortfolio = async (req, res) => {
  try {
    const [updated] = await Portfolio.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }
    const portfolio = await Portfolio.findByPk(req.params.id);
    return res.json(portfolio);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


exports.deletePortfolio = async (req, res) => {
  try {
    const deleted = await Portfolio.destroy({ where: { id: req.params.id } });
    if (!deleted) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }
    return res.json({ message: 'Portfolio deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
