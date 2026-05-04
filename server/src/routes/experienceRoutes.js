const express = require('express')
const experienceController = require('../controllers/experienceController')
const { requireAuth } = require('../middleware/authMiddleware')

const router = express.Router()

router.use(requireAuth)

router.get('/', experienceController.getAll)
router.post('/', experienceController.create)
router.put('/:id', experienceController.update)
router.delete('/:id', experienceController.remove)

module.exports = router
