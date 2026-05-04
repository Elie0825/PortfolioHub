import apiClient from './apiClient'

const fetchPublicPortfolio = async (username) => {
  const res = await apiClient.get(`/public/${username}`)
  return res.data
}

const recordView = async (portfolioId, referrer) => {
  await apiClient.post('/public/analytics/view', { portfolioId, referrer }).catch(() => {})
}

const recordProjectClick = async (projectId, linkType) => {
  await apiClient.post('/public/analytics/click', { projectId, linkType }).catch(() => {})
}

const sendContactMessage = async (username, data) => {
  const res = await apiClient.post(`/public/contact/${username}`, data)
  return res.data
}

export const publicApi = { fetchPublicPortfolio, recordView, recordProjectClick, sendContactMessage }
