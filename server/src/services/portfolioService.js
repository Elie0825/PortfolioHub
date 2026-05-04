const portfolioRepository = require('../repositories/portfolioRepository')

const getPortfolio = async (userId) => {
  const portfolio = await portfolioRepository.getByUserId(userId)
  if (!portfolio) {
    const error = new Error('Portfolio not found')
    error.statusCode = 404
    throw error
  }
  return portfolio
}

const updateProfile = async (userId, data) => {
  const portfolio = await getPortfolio(userId)
  return portfolioRepository.updateProfileSection(portfolio.id, data)
}

const updateTheme = async (userId, theme) => {
  const portfolio = await getPortfolio(userId)
  return portfolioRepository.updateTheme(portfolio.id, theme)
}

const togglePublished = async (userId, isPublished) => {
  const portfolio = await getPortfolio(userId)
  return portfolioRepository.togglePublished(portfolio.id, isPublished)
}

module.exports = { getPortfolio, updateProfile, updateTheme, togglePublished }
