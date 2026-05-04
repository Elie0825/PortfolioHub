import apiClient from './apiClient'

const getAll = async () => {
  const res = await apiClient.get('/contact-links')
  return res.data
}

const upsert = async (platform, url) => {
  const res = await apiClient.put('/contact-links', { platform, url })
  return res.data
}

const remove = async (platform) => {
  await apiClient.delete(`/contact-links/${platform}`)
}

export const contactLinksApi = { getAll, upsert, remove }
