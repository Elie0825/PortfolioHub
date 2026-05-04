import apiClient from './apiClient'

const getAll = async () => {
  const res = await apiClient.get('/projects')
  return res.data
}

const create = async (data) => {
  const res = await apiClient.post('/projects', data)
  return res.data
}

const update = async (id, data) => {
  const res = await apiClient.put(`/projects/${id}`, data)
  return res.data
}

const remove = async (id) => {
  await apiClient.delete(`/projects/${id}`)
}

const reorder = async (orderedIds) => {
  await apiClient.post('/projects/reorder', { orderedIds })
}

export const projectsApi = { getAll, create, update, remove, reorder }
