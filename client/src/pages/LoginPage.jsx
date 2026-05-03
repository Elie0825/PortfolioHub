import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LoginForm from '../components/auth/LoginForm'
import '../styles/pages/AuthPage.css'

const LoginPage = () => {
  const { user, isLoading } = useAuth()

  if (isLoading) return null
  if (user) return <Navigate to="/dashboard" replace />

  return (
    <main className="auth-page">
      <div className="auth-page__card">
        <div className="auth-page__brand">PortfolioHub</div>
        <LoginForm />
      </div>
    </main>
  )
}

export default LoginPage
