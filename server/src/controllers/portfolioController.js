const portfolioService = require('../services/portfolioService')

const getPortfolio = async (req, res, next) => {
  try {
    const portfolio = await portfolioService.getPortfolio(req.user.id)
    res.json(portfolio)
  } catch (error) {
    next(error)
  }
}

const updateProfile = async (req, res, next) => {
  try {
    const { headline, bio, location, availability, profilePhotoUrl } = req.body
    const updated = await portfolioService.updateProfile(req.user.id, {
      headline,
      bio,
      location,
      availability,
      profilePhotoUrl,
    })
    res.json(updated)
  } catch (error) {
    next(error)
  }
}

const updateTheme = async (req, res, next) => {
  try {
    const { theme } = req.body
    const updated = await portfolioService.updateTheme(req.user.id, theme)
    res.json(updated)
  } catch (error) {
    next(error)
  }
}

const togglePublished = async (req, res, next) => {
  try {
    const { isPublished } = req.body
    const updated = await portfolioService.togglePublished(req.user.id, isPublished)
    res.json(updated)
  } catch (error) {
    next(error)
  }
}

module.exports = { getPortfolio, updateProfile, updateTheme, togglePublished }
