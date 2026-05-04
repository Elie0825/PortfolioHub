const styleService = require('../services/styleService')

const getStyle = async (req, res, next) => {
  try {
    const data = await styleService.getStyle(req.user.id)
    res.json(data)
  } catch (err) {
    next(err)
  }
}

const updateStyleConfig = async (req, res, next) => {
  try {
    const { styleConfig } = req.body
    if (!styleConfig || typeof styleConfig !== 'object') {
      return res.status(400).json({ message: 'styleConfig must be an object' })
    }
    const data = await styleService.updateStyleConfig(req.user.id, styleConfig)
    res.json(data)
  } catch (err) {
    next(err)
  }
}

const updateSectionOrder = async (req, res, next) => {
  try {
    const { sectionOrder } = req.body
    if (!Array.isArray(sectionOrder)) {
      return res.status(400).json({ message: 'sectionOrder must be an array' })
    }
    const data = await styleService.updateSectionOrder(req.user.id, sectionOrder)
    res.json(data)
  } catch (err) {
    next(err)
  }
}

module.exports = { getStyle, updateStyleConfig, updateSectionOrder }
