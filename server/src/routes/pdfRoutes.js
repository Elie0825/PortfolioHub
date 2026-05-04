const express = require('express')
const pdfController = require('../controllers/pdfController')
const { requireAuth } = require('../middleware/authMiddleware')

const router = express.Router()

router.get('/export', requireAuth, pdfController.exportPdf)

module.exports = router
