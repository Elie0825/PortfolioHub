const contactLinkRepository = require('../repositories/contactLinkRepository')
const portfolioService = require('./portfolioService')

const getAll = async (userId) => {
  const portfolio = await portfolioService.getPortfolio(userId)
  return contactLinkRepository.getAllByPortfolioId(portfolio.id)
}

const upsert = async (userId, platform, url) => {
  const portfolio = await portfolioService.getPortfolio(userId)
  return contactLinkRepository.upsertByPlatform(portfolio.id, platform, url)
}

const remove = async (userId, platform) => {
  const portfolio = await portfolioService.getPortfolio(userId)
  return contactLinkRepository.remove(portfolio.id, platform)
}

module.exports = { getAll, upsert, remove }
