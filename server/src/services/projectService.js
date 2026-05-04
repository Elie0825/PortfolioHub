const projectRepository = require('../repositories/projectRepository')
const portfolioService = require('./portfolioService')

const getAll = async (userId) => {
  const portfolio = await portfolioService.getPortfolio(userId)
  return projectRepository.getAllByPortfolioId(portfolio.id)
}

const create = async (userId, data) => {
  const portfolio = await portfolioService.getPortfolio(userId)
  return projectRepository.create(portfolio.id, data)
}

const update = async (userId, projectId, data) => {
  const portfolio = await portfolioService.getPortfolio(userId)
  return projectRepository.update(projectId, portfolio.id, data)
}

const remove = async (userId, projectId) => {
  const portfolio = await portfolioService.getPortfolio(userId)
  return projectRepository.remove(projectId, portfolio.id)
}

const reorder = async (userId, orderedIds) => {
  await portfolioService.getPortfolio(userId)
  return projectRepository.reorder(orderedIds)
}

module.exports = { getAll, create, update, remove, reorder }
