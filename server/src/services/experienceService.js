const experienceRepository = require('../repositories/experienceRepository')
const portfolioService = require('./portfolioService')

const getAll = async (userId) => {
  const portfolio = await portfolioService.getPortfolio(userId)
  return experienceRepository.getAllByPortfolioId(portfolio.id)
}

const create = async (userId, data) => {
  const portfolio = await portfolioService.getPortfolio(userId)
  return experienceRepository.create(portfolio.id, data)
}

const update = async (userId, experienceId, data) => {
  await portfolioService.getPortfolio(userId)
  return experienceRepository.update(experienceId, data)
}

const remove = async (userId, experienceId) => {
  await portfolioService.getPortfolio(userId)
  return experienceRepository.remove(experienceId)
}

module.exports = { getAll, create, update, remove }
