import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import '../styles/pages/DashboardPage.css'

const DashboardPage = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="dashboard-page">
      <header className="dashboard-page__header">
        <span className="dashboard-page__brand">PortfolioHub</span>
        <div className="dashboard-page__header-right">
          <span className="dashboard-page__username">@{user?.username}</span>
          <button className="dashboard-page__logout" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </header>

      <main className="dashboard-page__main">
        <h1 className="dashboard-page__welcome">
          Welcome, {user?.username}
        </h1>
        <p className="dashboard-page__hint">
          Your portfolio editor will be built here in Phase 2.
        </p>
      </main>
    </div>
  )
}

export default DashboardPage
