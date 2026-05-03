import apiClient from './apiClient'

const register = async ({ email, username, password }) => {
  const response = await apiClient.post('/auth/register', { email, username, password })
  return response.data
}

const login = async ({ email, password }) => {
  const response = await apiClient.post('/auth/login', { email, password })
  return response.data
}

const fetchCurrentUser = async () => {
  const response = await apiClient.get('/auth/me')
  return response.data
}

export const authApi = { register, login, fetchCurrentUser }
