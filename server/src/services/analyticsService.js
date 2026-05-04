const analyticsRepository = require('../repositories/analyticsRepository')
const portfolioService = require('./portfolioService')

const recordView = async (portfolioId, referrer) => {
  return analyticsRepository.recordView(portfolioId, referrer)
}

const recordProjectClick = async (projectId, linkType) => {
  return analyticsRepository.recordProjectClick(projectId, linkType)
}

const getViewStats = async (userId) => {
  const portfolio = await portfolioService.getPortfolio(userId)
  const [views, referrers] = await Promise.all([
    analyticsRepository.getViewsLast30Days(portfolio.id),
    analyticsRepository.getTopReferrers(portfolio.id),
  ])
  return { views, referrers }
}

const getClickStats = async (userId) => {
  const portfolio = await portfolioService.getPortfolio(userId)
  return analyticsRepository.getProjectClickCounts(portfolio.id)
}

module.exports = { recordView, recordProjectClick, getViewStats, getClickStats }
