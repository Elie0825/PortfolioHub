import apiClient from './apiClient'

const get = async () => {
  const res = await apiClient.get('/portfolio')
  return res.data
}

const updateProfile = async (data) => {
  const res = await apiClient.patch('/portfolio/profile', data)
  return res.data
}

const updateTheme = async (theme) => {
  const res = await apiClient.patch('/portfolio/theme', { theme })
  return res.data
}

const togglePublished = async (isPublished) => {
  const res = await apiClient.patch('/portfolio/published', { isPublished })
  return res.data
}

export const portfolioApi = { get, updateProfile, updateTheme, togglePublished }
