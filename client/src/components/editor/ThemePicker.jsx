import { useState } from 'react'
import { usePortfolio } from '../../context/PortfolioContext'
import { portfolioApi } from '../../services/portfolioApi'
import '../../styles/components/ThemePicker.css'

const THEMES = [
  { id: 'dark-terminal', label: 'Dark Terminal' },
  { id: 'clean-minimal', label: 'Clean Minimal' },
  { id: 'forest-green', label: 'Forest Green' },
  { id: 'soft-blue', label: 'Soft Blue' },
]

const ThemePicker = () => {
  const { portfolio, updatePortfolio } = usePortfolio()
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState(null)

  const handleSelect = async (themeId) => {
    if (themeId === portfolio?.theme) return
    setIsSaving(true)
    setError(null)
    try {
      const updated = await portfolioApi.updateTheme(themeId)
      updatePortfolio({ theme: updated.theme })
    } catch {
      setError('Failed to update theme')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <section className="theme-picker">
      <h2 className="editor-section__title">Theme</h2>
      {error && <p className="editor-error">{error}</p>}

      <ul className="theme-picker__list">
        {THEMES.map((theme) => (
          <li key={theme.id}>
            <button
              className={`theme-picker__option ${portfolio?.theme === theme.id ? 'theme-picker__option--active' : ''}`}
              onClick={() => handleSelect(theme.id)}
              disabled={isSaving}
            >
              <span className={`theme-picker__swatch theme-picker__swatch--${theme.id}`} />
              <span className="theme-picker__label">{theme.label}</span>
              {portfolio?.theme === theme.id && (
                <span className="theme-picker__check">✓</span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ThemePicker
