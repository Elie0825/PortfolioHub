import apiClient from './apiClient'

const getAll = async () => {
  const res = await apiClient.get('/skills')
  return res.data
}

const create = async (name) => {
  const res = await apiClient.post('/skills', { name })
  return res.data
}

const remove = async (id) => {
  await apiClient.delete(`/skills/${id}`)
}

const toggleFeatured = async (id, isFeatured) => {
  const res = await apiClient.patch(`/skills/${id}/featured`, { isFeatured })
  return res.data
}

export const skillsApi = { getAll, create, remove, toggleFeatured }
