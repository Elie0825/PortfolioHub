import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { publicApi } from '../services/publicApi'
import PublicHero from '../components/public/PublicHero'
import PublicSkills from '../components/public/PublicSkills'
import PublicProjects from '../components/public/PublicProjects'
import PublicExperience from '../components/public/PublicExperience'
import PublicContact from '../components/public/PublicContact'
import PublicFooter from '../components/public/PublicFooter'
import PublicNotFound from '../components/public/PublicNotFound'
import '../styles/pages/PublicPortfolioPage.css'
import '../styles/themes/dark-terminal.css'
import '../styles/themes/clean-minimal.css'
import '../styles/themes/forest-green.css'
import '../styles/themes/soft-blue.css'

const DEFAULT_SECTION_ORDER = ['hero', 'skills', 'projects', 'experience', 'contact']

const GOOGLE_FONT_MAP = {
  Inter: 'Inter',
  '"Fira Code"': 'Fira+Code',
  '"Space Grotesk"': 'Space+Grotesk',
  Outfit: 'Outfit',
}

const loadFont = (fontFamily) => {
  const key = GOOGLE_FONT_MAP[fontFamily]
  if (!key) return
  const id = `gf-pub-${key}`
  if (document.getElementById(id)) return
  const link = document.createElement('link')
  link.id = id
  link.rel = 'stylesheet'
  link.href = `https://fonts.googleapis.com/css2?family=${key}:wght@400;500;600;700&display=swap`
  document.head.appendChild(link)
}

const buildCssVars = (styleConfig) => {
  if (!styleConfig || typeof styleConfig !== 'object') return {}
  const vars = {}
  if (styleConfig.accentColor) {
    vars['--color-brand'] = styleConfig.accentColor
    vars['--color-brand-hover'] = styleConfig.accentColor
    vars['--color-border-input-focus'] = styleConfig.accentColor
  }
  if (styleConfig.bgColor) {
    vars['--color-bg-page'] = styleConfig.bgColor
    vars['--color-bg-card'] = styleConfig.bgColor
  }
  if (styleConfig.textColor) {
    vars['--color-text-primary'] = styleConfig.textColor
  }
  if (styleConfig.fontFamily && styleConfig.fontFamily !== 'system-ui') {
    vars['--font-sans'] = `${styleConfig.fontFamily}, system-ui, sans-serif`
    loadFont(styleConfig.fontFamily)
  }
  if (styleConfig.borderRadius !== undefined) {
    const r = styleConfig.borderRadius
    vars['--radius-sm'] = `${r}px`
    vars['--radius-md'] = `${Math.round(r * 1.6)}px`
    vars['--radius-lg'] = `${Math.round(r * 2.5)}px`
  }
  return vars
}

const normalizeSectionOrder = (raw) => {
  if (!Array.isArray(raw) || raw.length === 0) return DEFAULT_SECTION_ORDER
  if (typeof raw[0] === 'string') return raw
  return raw.filter((s) => s.visible).map((s) => s.id)
}

const PublicPortfolioPage = () => {
  const { username } = useParams()
  const [portfolio, setPortfolio] = useState(null)
  const [notFound, setNotFound] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await publicApi.fetchPublicPortfolio(username)
        setPortfolio(data)
        publicApi.recordView(data.id, document.referrer)
      } catch (_) {
        setNotFound(true)
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [username])

  if (isLoading) return <div className="loading-screen">Loading…</div>
  if (notFound) return <PublicNotFound username={username} />

  const styleConfig = portfolio.styleConfig || {}
  const cssVars = buildCssVars(styleConfig)
  const themeClass = `theme-${portfolio.theme}`
  const cardStyle = styleConfig.cardStyle || 'bordered'
  const layout = styleConfig.layout || 'centered'
  const orderedSections = normalizeSectionOrder(portfolio.sectionOrder)

  const sectionProps = {
    hero: {
      username: portfolio.user.username,
      profileSection: portfolio.profileSection,
      contactLinks: portfolio.contactLinks,
    },
    skills: { skills: portfolio.skills },
    projects: { projects: portfolio.projects },
    experience: { experiences: portfolio.experiences },
    contact: { username: portfolio.user.username, contactLinks: portfolio.contactLinks },
  }

  const SECTION_COMPONENTS = {
    hero: PublicHero,
    skills: PublicSkills,
    projects: PublicProjects,
    experience: PublicExperience,
    contact: PublicContact,
  }

  return (
    <div
      className={`portfolio-page ${themeClass} card-style-${cardStyle} layout-${layout}`}
      style={cssVars}
    >
      <div className="portfolio-page__content">
        {orderedSections.map((sectionId) => {
          const Component = SECTION_COMPONENTS[sectionId]
          if (!Component) return null
          return <Component key={sectionId} {...sectionProps[sectionId]} />
        })}
      </div>
      <PublicFooter />
    </div>
  )
}

export default PublicPortfolioPage
