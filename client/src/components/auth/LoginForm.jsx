import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import useFormField from '../../hooks/useFormField'
import FormInput from '../ui/FormInput'
import '../../styles/components/AuthForm.css'

const LoginForm = () => {
  const { login } = useAuth()
  const navigate = useNavigate()

  const email = useFormField('')
  const password = useFormField('')
  const [serverError, setServerError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setServerError('')

    if (!email.value) {
      email.setError('Email is required')
      return
    }
    if (!password.value) {
      password.setError('Password is required')
      return
    }

    setIsSubmitting(true)
    try {
      await login({ email: email.value, password: password.value })
      navigate('/dashboard')
    } catch (error) {
      setServerError(error.response?.data?.message || 'Login failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <h1 className="auth-form__title">Welcome back</h1>
      <p className="auth-form__subtitle">Sign in to your account</p>

      {serverError && (
        <div className="auth-form__server-error">{serverError}</div>
      )}

      <FormInput
        id="email"
        label="Email"
        type="email"
        value={email.value}
        onChange={email.onChange}
        error={email.error}
        placeholder="you@example.com"
        autoComplete="email"
      />

      <FormInput
        id="password"
        label="Password"
        type="password"
        value={password.value}
        onChange={password.onChange}
        error={password.error}
        placeholder="Your password"
        autoComplete="current-password"
      />

      <button className="auth-form__submit" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Signing in...' : 'Sign in'}
      </button>

      <p className="auth-form__switch">
        No account yet? <Link to="/register">Create one</Link>
      </p>
    </form>
  )
}

export default LoginForm
