const express = require('express')
const authController = require('../controllers/authController')
const { requireAuth } = require('../middleware/authMiddleware')
const { registerValidation, loginValidation } = require('../middleware/validationRules')

const router = express.Router()

router.post('/register', registerValidation, authController.register)
router.post('/login', loginValidation, authController.login)
router.get('/me', requireAuth, authController.getMe)

module.exports = router
