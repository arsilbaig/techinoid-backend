const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');
const authToken = require('../middlewares/verifyToken')

router.get('/portfolios', portfolioController.getAllPortfolios);


router.get('/portfolios/:id', portfolioController.getPortfolioById);


router.post('/portfolios/create', authToken, portfolioController.createPortfolio);


router.put('/portfolios/update/:id',authToken, portfolioController.updatePortfolio);


router.delete('/portfolios/delete/:id', authToken, portfolioController.deletePortfolio);


router.delete('/portfolios/delete', authToken, portfolioController.deletePortfolios);


module.exports = router;
