import apiClient from './apiClient'

const fetchViewStats = async () => {
  const res = await apiClient.get('/analytics/views')
  return res.data
}

const fetchClickStats = async () => {
  const res = await apiClient.get('/analytics/clicks')
  return res.data
}

export const analyticsApi = { fetchViewStats, fetchClickStats }
