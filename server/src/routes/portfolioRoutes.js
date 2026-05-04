const express = require('express')
const portfolioController = require('../controllers/portfolioController')
const { requireAuth } = require('../middleware/authMiddleware')

const router = express.Router()

router.use(requireAuth)

router.get('/', portfolioController.getPortfolio)
router.patch('/profile', portfolioController.updateProfile)
router.patch('/theme', portfolioController.updateTheme)
router.patch('/published', portfolioController.togglePublished)

module.exports = router
