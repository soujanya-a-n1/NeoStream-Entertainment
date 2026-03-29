import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaSearch, FaBell, FaCaretDown } from 'react-icons/fa'
import './Navbar.css'

function Navbar({ user }) {
  const [show, setShow] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShow(true)
      } else {
        setShow(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`)
      setSearchQuery('')
      setSearchOpen(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  return (
    <nav className={`navbar${show ? ' navbar-scrolled' : ''}`}>
      <div className="navbar-left">
        <Link to="/browse" className="navbar-logo">NEOSTREAM</Link>
        <ul className="navbar-links">
          <li><Link to="/browse">Home</Link></li>
          <li><Link to="/trending">Trending</Link></li>
          <li><Link to="/browse">TV Shows</Link></li>
          <li><Link to="/browse">Movies</Link></li>
          <li><Link to="/my-list">My List</Link></li>
        </ul>
      </div>
      <div className="navbar-right">
        <div className="navbar-search">
          {searchOpen && (
            <form onSubmit={handleSearch} className="search-form">
              <input type="text" placeholder="Titles, people, genres" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} autoFocus />
            </form>
          )}
          <FaSearch className="navbar-icon" onClick={() => setSearchOpen(!searchOpen)} />
        </div>
        <FaBell className="navbar-icon" />
        <div className="navbar-profile">
          <img src="https://i.pravatar.cc/32" alt="Profile" className="navbar-avatar" />
          <FaCaretDown className="navbar-icon" />
          <div className="profile-dropdown">
            <div className="dropdown-item"><span>{user?.name || 'User'}</span></div>
            <div className="dropdown-item" onClick={() => navigate('/my-list')}>My List</div>
            <div className="dropdown-item">Account</div>
            <div className="dropdown-divider"></div>
            <div className="dropdown-item" onClick={handleLogout}>Sign out</div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
