const express = require('express')
const contactMessageController = require('../controllers/contactMessageController')
const { requireAuth } = require('../middleware/authMiddleware')

const router = express.Router()

router.use(requireAuth)

router.get('/', contactMessageController.getMessages)
router.get('/unread-count', contactMessageController.getUnreadCount)
router.patch('/:id/read', contactMessageController.markAsRead)

module.exports = router
