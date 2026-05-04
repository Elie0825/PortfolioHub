import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { portfolioApi } from '../services/portfolioApi'

const PortfolioContext = createContext(null)

export const PortfolioProvider = ({ children }) => {
  const [portfolio, setPortfolio] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await portfolioApi.get()
      setPortfolio(data)
    } catch {
      setError('Failed to load portfolio')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const updatePortfolio = (patch) => {
    setPortfolio((prev) => ({ ...prev, ...patch }))
  }

  const updateProfileSection = (patch) => {
    setPortfolio((prev) => ({
      ...prev,
      profileSection: { ...prev.profileSection, ...patch },
    }))
  }

  return (
    <PortfolioContext.Provider
      value={{ portfolio, isLoading, error, reload: load, updatePortfolio, updateProfileSection }}
    >
      {children}
    </PortfolioContext.Provider>
  )
}

export const usePortfolio = () => {
  const ctx = useContext(PortfolioContext)
  if (!ctx) throw new Error('usePortfolio must be used inside PortfolioProvider')
  return ctx
}
