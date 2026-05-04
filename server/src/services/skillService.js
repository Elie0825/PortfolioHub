const skillRepository = require('../repositories/skillRepository')
const portfolioService = require('./portfolioService')

const getAll = async (userId) => {
  const portfolio = await portfolioService.getPortfolio(userId)
  return skillRepository.getAllByPortfolioId(portfolio.id)
}

const create = async (userId, name) => {
  const portfolio = await portfolioService.getPortfolio(userId)
  return skillRepository.create(portfolio.id, name)
}

const remove = async (userId, skillId) => {
  await portfolioService.getPortfolio(userId)
  return skillRepository.remove(skillId)
}

const toggleFeatured = async (userId, skillId, isFeatured) => {
  await portfolioService.getPortfolio(userId)
  return skillRepository.toggleFeatured(skillId, isFeatured)
}

module.exports = { getAll, create, remove, toggleFeatured }
