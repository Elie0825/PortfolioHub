import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { authApi } from '../services/authApi'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const loadUser = useCallback(async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      setIsLoading(false)
      return
    }
    try {
      const { user } = await authApi.fetchCurrentUser()
      setUser(user)
    } catch {
      localStorage.removeItem('token')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadUser()
  }, [loadUser])

  const register = async (credentials) => {
    const { user, token } = await authApi.register(credentials)
    localStorage.setItem('token', token)
    setUser(user)
    return user
  }

  const login = async (credentials) => {
    const { user, token } = await authApi.login(credentials)
    localStorage.setItem('token', token)
    setUser(user)
    return user
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return context
}
