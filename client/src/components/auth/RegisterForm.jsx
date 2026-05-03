import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import useFormField from '../../hooks/useFormField'
import FormInput from '../ui/FormInput'
import '../../styles/components/AuthForm.css'

const RegisterForm = () => {
  const { register } = useAuth()
  const navigate = useNavigate()

  const email = useFormField('')
  const username = useFormField('')
  const password = useFormField('')
  const [serverError, setServerError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validate = () => {
    let valid = true

    if (!email.value) {
      email.setError('Email is required')
      valid = false
    }

    if (!username.value || username.value.length < 3) {
      username.setError('Username must be at least 3 characters')
      valid = false
    }

    if (!password.value || password.value.length < 8) {
      password.setError('Password must be at least 8 characters')
      valid = false
    }

    return valid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setServerError('')

    if (!validate()) return

    setIsSubmitting(true)
    try {
      await register({
        email: email.value,
        username: username.value,
        password: password.value,
      })
      navigate('/dashboard')
    } catch (error) {
      const data = error.response?.data
      if (data?.errors?.length) {
        setServerError(data.errors[0].msg)
      } else {
        setServerError(data?.message || 'Registration failed. Please try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <h1 className="auth-form__title">Create your account</h1>
      <p className="auth-form__subtitle">Start building your portfolio today</p>

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
        id="username"
        label="Username"
        value={username.value}
        onChange={username.onChange}
        error={username.error}
        placeholder="yourname"
        autoComplete="username"
      />

      <FormInput
        id="password"
        label="Password"
        type="password"
        value={password.value}
        onChange={password.onChange}
        error={password.error}
        placeholder="At least 8 characters"
        autoComplete="new-password"
      />

      <button className="auth-form__submit" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Creating account...' : 'Create account'}
      </button>

      <p className="auth-form__switch">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </form>
  )
}

export default RegisterForm
