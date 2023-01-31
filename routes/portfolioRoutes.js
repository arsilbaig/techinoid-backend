// portfolioRoutes.js
const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');

// Get all portfolios
router.get('/', portfolioController.getAllPortfolios);

// Get single portfolio by id
router.get('/:id', portfolioController.getPortfolioById);

// Create a portfolio
router.post('/', portfolioController.createPortfolio);

// Update a portfolio
router.put('/:id', portfolioController.updatePortfolio);

// Delete a portfolio
router.delete('/:id', portfolioController.deletePortfolio);

module.exports = router;
