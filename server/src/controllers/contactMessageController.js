const contactMessageService = require('../services/contactMessageService')

const sendMessage = async (req, res, next) => {
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

const getMessages = async (req, res, next) => {
  try {
    const messages = await contactMessageService.getMessages(req.user.id)
    res.json(messages)
  } catch (error) {
    next(error)
  }
}

const markAsRead = async (req, res, next) => {
  try {
    const message = await contactMessageService.markAsRead(req.params.id)
    res.json(message)
  } catch (error) {
    next(error)
  }
}

const getUnreadCount = async (req, res, next) => {
  try {
    const count = await contactMessageService.getUnreadCount(req.user.id)
    res.json({ count })
  } catch (error) {
    next(error)
  }
}

module.exports = { sendMessage, getMessages, markAsRead, getUnreadCount }
