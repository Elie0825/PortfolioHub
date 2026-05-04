const prisma = require('../config/database')

const createMessage = async (portfolioId, senderName, senderEmail, message) => {
  return prisma.contactMessage.create({
    data: { portfolioId, senderName, senderEmail, message },
  })
}

const getByPortfolioId = async (portfolioId) => {
  return prisma.contactMessage.findMany({
    where: { portfolioId },
    orderBy: { sentAt: 'desc' },
  })
}

const markAsRead = async (messageId) => {
  return prisma.contactMessage.update({
    where: { id: messageId },
    data: { isRead: true },
  })
}

const countUnread = async (portfolioId) => {
  return prisma.contactMessage.count({
    where: { portfolioId, isRead: false },
  })
}

module.exports = { createMessage, getByPortfolioId, markAsRead, countUnread }
