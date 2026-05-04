const portfolioRepository = require('../repositories/portfolioRepository')
const analyticsService = require('../services/analyticsService')
const contactMessageService = require('../services/contactMessageService')

const getPublicPortfolio = async (req, res, next) => {
  try {
    const portfolio = await portfolioRepository.getPublicPortfolioByUsername(req.params.username)
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' })
    }
    const referrer = req.get('Referer') || ''
    analyticsService.recordView(portfolio.id, referrer).catch(() => {})
    res.json(portfolio)
  } catch (error) {
    next(error)
  }
}

const recordView = async (req, res, next) => {
  try {
    const { portfolioId, referrer } = req.body
    await analyticsService.recordView(portfolioId, referrer || '')
    res.status(204).send()
  } catch (error) {
    next(error)
  }
}

const recordProjectClick = async (req, res, next) => {
  try {
    const { projectId, linkType } = req.body
    await analyticsService.recordProjectClick(projectId, linkType)
    res.status(204).send()
  } catch (error) {
    next(error)
  }
}

const sendContactMessage = async (req, res, next) => {
  try {
    const { senderName, senderEmail, message } = req.body
    await contactMessageService.sendMessage(req.params.username, {
      senderName,
      senderEmail,
      message,
    })
    res.status(201).json({ message: 'Message sent' })
  } catch (error) {
    next(error)
  }
}

module.exports = { getPublicPortfolio, recordView, recordProjectClick, sendContactMessage }
