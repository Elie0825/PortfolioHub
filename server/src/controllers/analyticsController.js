const analyticsService = require('../services/analyticsService')

const getViewStats = async (req, res, next) => {
  try {
    const stats = await analyticsService.getViewStats(req.user.id)
    res.json(stats)
  } catch (error) {
    next(error)
  }
}

const getClickStats = async (req, res, next) => {
  try {
    const stats = await analyticsService.getClickStats(req.user.id)
    res.json(stats)
  } catch (error) {
    next(error)
  }
}

module.exports = { getViewStats, getClickStats }
