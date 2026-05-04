const express = require('express')
const router = express.Router()
const { requireAuth } = require('../middleware/authMiddleware')
const { getStyle, updateStyleConfig, updateSectionOrder } = require('../controllers/styleController')

router.get('/', requireAuth, getStyle)
router.patch('/config', requireAuth, updateStyleConfig)
router.patch('/sections', requireAuth, updateSectionOrder)

module.exports = router
