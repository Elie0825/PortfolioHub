import apiClient from './apiClient'

const fetchMessages = async () => {
  const res = await apiClient.get('/messages')
  return res.data
}

const fetchUnreadCount = async () => {
  const res = await apiClient.get('/messages/unread-count')
  return res.data.count
}

const markMessageRead = async (id) => {
  const res = await apiClient.patch(`/messages/${id}/read`)
  return res.data
}

export const messagesApi = { fetchMessages, fetchUnreadCount, markMessageRead }
