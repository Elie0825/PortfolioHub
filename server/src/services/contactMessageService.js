const prisma = require('../config/database')
const contactMessageRepository = require('../repositories/contactMessageRepository')
const portfolioRepository = require('../repositories/portfolioRepository')

const sendMessage = async (username, { senderName, senderEmail, message }) => {
  if (!senderName?.trim()) {
    const error = new Error('Name is required')
    error.statusCode = 422
    throw error
  }
  if (!senderEmail?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(senderEmail)) {
    const error = new Error('Valid email is required')
    error.statusCode = 422
    throw error
  }
  if (!message?.trim() || message.trim().length < 10) {
    const error = new Error('Message must be at least 10 characters')
    error.statusCode = 422
    throw error
  }
  if (message.trim().length > 1000) {
    const error = new Error('Message must be 1000 characters or fewer')
    error.statusCode = 422
    throw error
  }

  const portfolio = await portfolioRepository.getPublicPortfolioByUsername(username)
  if (!portfolio) {
    const error = new Error('Portfolio not found')
    error.statusCode = 404
    throw error
  }

  return contactMessageRepository.createMessage(
    portfolio.id,
    senderName.trim(),
    senderEmail.trim(),
    message.trim()
  )
}

const getMessages = async (userId) => {
  const portfolio = await prisma.portfolio.findUnique({ where: { userId } })
  if (!portfolio) return []
  return contactMessageRepository.getByPortfolioId(portfolio.id)
}

const markAsRead = async (messageId) => {
  return contactMessageRepository.markAsRead(messageId)
}

const getUnreadCount = async (userId) => {
  const portfolio = await prisma.portfolio.findUnique({ where: { userId } })
  if (!portfolio) return 0
  return contactMessageRepository.countUnread(portfolio.id)
}

module.exports = { sendMessage, getMessages, markAsRead, getUnreadCount }
