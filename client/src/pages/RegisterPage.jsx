import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import RegisterForm from '../components/auth/RegisterForm'
import '../styles/pages/AuthPage.css'

const RegisterPage = () => {
  const { user, isLoading } = useAuth()

  if (isLoading) return null
  if (user) return <Navigate to="/dashboard" replace />

  return (
    <main className="auth-page">
      <div className="auth-page__card">
        <div className="auth-page__brand">PortfolioHub</div>
        <RegisterForm />
      </div>
    </main>
  )
}

export default RegisterPage
