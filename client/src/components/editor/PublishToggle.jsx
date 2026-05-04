import { useState } from 'react'
import { usePortfolio } from '../../context/PortfolioContext'
import { portfolioApi } from '../../services/portfolioApi'
import '../../styles/components/PublishToggle.css'

const PublishToggle = () => {
  const { portfolio, updatePortfolio } = usePortfolio()
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState(null)

  const handleToggle = async () => {
    setIsSaving(true)
    setError(null)
    try {
      const updated = await portfolioApi.togglePublished(!portfolio.isPublished)
      updatePortfolio({ isPublished: updated.isPublished })
    } catch {
      setError('Failed to update publish status')
    } finally {
      setIsSaving(false)
    }
  }

  if (!portfolio) return null

  return (
    <div className="publish-toggle">
      {error && <span className="publish-toggle__error">{error}</span>}
      <span className={`publish-toggle__status ${portfolio.isPublished ? 'publish-toggle__status--live' : ''}`}>
        {portfolio.isPublished ? 'Live' : 'Draft'}
      </span>
      <button
        className={`publish-toggle__btn ${portfolio.isPublished ? 'publish-toggle__btn--unpublish' : 'publish-toggle__btn--publish'}`}
        onClick={handleToggle}
        disabled={isSaving}
      >
        {isSaving ? '…' : portfolio.isPublished ? 'Unpublish' : 'Publish'}
      </button>
    </div>
  )
}

export default PublishToggle
