import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { PortfolioProvider, usePortfolio } from '../context/PortfolioContext'
import { messagesApi } from '../services/messagesApi'
import { pdfApi } from '../services/pdfApi'
import EditorSidebar from '../components/layout/EditorSidebar'
import StatsBar from '../components/editor/StatsBar'
import PublishToggle from '../components/editor/PublishToggle'
import ProfileEditor from '../components/editor/ProfileEditor'
import ProjectsEditor from '../components/editor/ProjectsEditor'
import SkillsEditor from '../components/editor/SkillsEditor'
import ExperienceEditor from '../components/editor/ExperienceEditor'
import ContactEditor from '../components/editor/ContactEditor'
import ThemePicker from '../components/editor/ThemePicker'
import AnalyticsDashboard from './AnalyticsDashboard'
import MessagesInbox from './MessagesInbox'
import StyleEditorPage from './StyleEditorPage'
import '../styles/pages/DashboardPage.css'

const SECTIONS = {
  profile: ProfileEditor,
  projects: ProjectsEditor,
  skills: SkillsEditor,
  experience: ExperienceEditor,
  contact: ContactEditor,
  theme: ThemePicker,
  style: StyleEditorPage,
}

const sectionFromPath = (pathname) => {
  if (pathname === '/dashboard/analytics') return 'analytics'
  if (pathname === '/dashboard/messages') return 'messages'
  return null
}

const EditorShell = () => {
  const { user, logout } = useAuth()
  const { isLoading, error } = usePortfolio()
  const navigate = useNavigate()
  const location = useLocation()

  const routeSection = sectionFromPath(location.pathname)
  const [activeSection, setActiveSection] = useState('profile')
  const [unreadCount, setUnreadCount] = useState(0)
  const [isExporting, setIsExporting] = useState(false)
  const [exportError, setExportError] = useState(null)

  useEffect(() => {
    messagesApi.fetchUnreadCount().then(setUnreadCount).catch(() => {})
  }, [])

  const handleSelect = (section) => {
    setActiveSection(section)
    if (location.pathname !== '/dashboard') {
      navigate('/dashboard')
    }
  }

  const handleExportPdf = async () => {
    setIsExporting(true)
    setExportError(null)
    try {
      await pdfApi.exportPortfolioPdf()
    } catch (err) {
      const msg = err.response?.data?.message || 'PDF export failed'
      setExportError(msg)
    } finally {
      setIsExporting(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (isLoading) return <div className="loading-screen">Loading your portfolio…</div>
  if (error) return <div className="loading-screen">{error}</div>

  let ActiveSection
  if (routeSection === 'analytics') ActiveSection = AnalyticsDashboard
  else if (routeSection === 'messages') ActiveSection = MessagesInbox
  else ActiveSection = SECTIONS[activeSection]

  return (
    <div className="dashboard-page">
      <header className="dashboard-page__header">
        <span className="dashboard-page__brand">PortfolioHub</span>
        <StatsBar />
        <div className="dashboard-page__header-right">
          {exportError && <span className="dashboard-page__export-error">{exportError}</span>}
          <button
            className="dashboard-page__export-btn"
            onClick={handleExportPdf}
            disabled={isExporting}
          >
            {isExporting ? 'Exporting…' : 'Export PDF'}
          </button>
          <PublishToggle />
          <span className="dashboard-page__username">@{user?.username}</span>
          <button className="dashboard-page__logout" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </header>

      <div className="dashboard-page__body">
        <EditorSidebar
          activeSection={activeSection}
          onSelect={handleSelect}
          unreadCount={unreadCount}
        />
        <main className="dashboard-page__main">
          <ActiveSection />
        </main>
      </div>
    </div>
  )
}

const DashboardPage = () => (
  <PortfolioProvider>
    <EditorShell />
  </PortfolioProvider>
)

export default DashboardPage
