const express = require('express')
const projectController = require('../controllers/projectController')
const { requireAuth } = require('../middleware/authMiddleware')

const router = express.Router()

router.use(requireAuth)

router.get('/', projectController.getAll)
router.post('/', projectController.create)
router.put('/:id', projectController.update)
router.delete('/:id', projectController.remove)
router.post('/reorder', projectController.reorder)

module.exports = router
