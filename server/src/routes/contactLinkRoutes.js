const express = require('express')
const contactLinkController = require('../controllers/contactLinkController')
const { requireAuth } = require('../middleware/authMiddleware')

const router = express.Router()

router.use(requireAuth)

router.get('/', contactLinkController.getAll)
router.put('/', contactLinkController.upsert)
router.delete('/:platform', contactLinkController.remove)

module.exports = router
