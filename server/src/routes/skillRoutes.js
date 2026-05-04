const express = require('express')
const skillController = require('../controllers/skillController')
const { requireAuth } = require('../middleware/authMiddleware')

const router = express.Router()

router.use(requireAuth)

router.get('/', skillController.getAll)
router.post('/', skillController.create)
router.delete('/:id', skillController.remove)
router.patch('/:id/featured', skillController.toggleFeatured)

module.exports = router
