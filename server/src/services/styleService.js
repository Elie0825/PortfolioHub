const styleRepository = require('../repositories/styleRepository')
const portfolioService = require('./portfolioService')

const getStyle = async (userId) => {
  const portfolio = await portfolioService.getPortfolio(userId)
  return styleRepository.getStyle(portfolio.id)
}

const updateStyleConfig = async (userId, styleConfig) => {
  const portfolio = await portfolioService.getPortfolio(userId)
  return styleRepository.updateStyleConfig(portfolio.id, styleConfig)
}

const updateSectionOrder = async (userId, sectionOrder) => {
  const portfolio = await portfolioService.getPortfolio(userId)
  return styleRepository.updateSectionOrder(portfolio.id, sectionOrder)
}

module.exports = { getStyle, updateStyleConfig, updateSectionOrder }
