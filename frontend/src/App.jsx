import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Browse from './pages/Browse'
import Search from './pages/Search'
import MyList from './pages/MyList'
import Trending from './pages/Trending'
import { authAPI } from './services/api'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      authAPI.getCurrentUser()
        .then((res) => setUser(res.data.user))
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const handleSetUser = (userData) => {
    setUser(userData)
  }

  const ProtectedRoute = ({ children }) => {
    if (loading) return <div className="loading">Loading...</div>
    return user ? children : <Navigate to="/login" />
  }

  if (loading) return <div className="loading">Loading...</div>

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={handleSetUser} />} />
        <Route path="/register" element={<Register setUser={handleSetUser} />} />
        <Route path="/browse" element={<ProtectedRoute><Browse user={user} /></ProtectedRoute>} />
        <Route path="/trending" element={<ProtectedRoute><Trending user={user} /></ProtectedRoute>} />
        <Route path="/search" element={<ProtectedRoute><Search user={user} /></ProtectedRoute>} />
        <Route path="/my-list" element={<ProtectedRoute><MyList user={user} /></ProtectedRoute>} />
      </Routes>
    </div>
  )
}

export default App
