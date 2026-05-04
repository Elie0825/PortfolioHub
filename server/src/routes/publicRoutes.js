const express = require('express')
const rateLimit = require('express-rate-limit')
const publicController = require('../controllers/publicController')

const contactRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: 'Too many messages from this IP, please try again later',
})

const router = express.Router()

router.post('/analytics/view', publicController.recordView)
router.post('/analytics/click', publicController.recordProjectClick)
router.post('/contact/:username', contactRateLimit, publicController.sendContactMessage)
router.get('/:username', publicController.getPublicPortfolio)

module.exports = router
