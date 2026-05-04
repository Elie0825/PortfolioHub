import apiClient from './apiClient'

const getAll = async () => {
  const res = await apiClient.get('/experiences')
  return res.data
}

const create = async (data) => {
  const res = await apiClient.post('/experiences', data)
  return res.data
}

const update = async (id, data) => {
  const res = await apiClient.put(`/experiences/${id}`, data)
  return res.data
}

const remove = async (id) => {
  await apiClient.delete(`/experiences/${id}`)
}

export const experiencesApi = { getAll, create, update, remove }
