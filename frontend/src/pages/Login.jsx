import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authAPI } from '../services/api'
import './Auth.css'

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const response = await authAPI.login(email, password)
      localStorage.setItem('token', response.data.token)
      setUser(response.data.user)
      navigate('/browse')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <header className="auth-header"><Link to="/" className="auth-logo">NEOSTREAM</Link></header>
      <main className="auth-main">
        <div className="auth-form-container">
          <h1>Sign In</h1>
          {error && <div className="auth-error">{error}</div>}
          <form onSubmit={handleSubmit} className="auth-form">
            <input type="email" placeholder="Email or phone number" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit" disabled={loading}>{loading ? 'Signing In...' : 'Sign In'}</button>
            <div className="auth-help">
              <label><input type="checkbox" />Remember me</label>
              <a href="#">Need help?</a>
            </div>
          </form>
          <div className="auth-signup-link">New to NeoStream? <Link to="/register">Sign up now</Link></div>
        </div>
      </main>
    </div>
  )
}

export default Login
