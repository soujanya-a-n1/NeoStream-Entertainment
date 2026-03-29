import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { userAPI } from '../services/api'
import { TMDB_POSTER_BASE_URL } from '../utils/constants'
import './MyList.css'

const MyList = ({ user }) => {
  const [watchlist, setWatchlist] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWatchlist()
  }, [])

  const fetchWatchlist = async () => {
    try {
      const response = await userAPI.getWatchlist()
      setWatchlist(response.data)
    } catch (error) {
      console.error('Error fetching watchlist:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRemove = async (movieId) => {
    try {
      await userAPI.removeFromWatchlist(movieId)
      setWatchlist(watchlist.filter(item => item.movieId !== movieId))
    } catch (error) {
      console.error('Error removing from watchlist:', error)
    }
  }

  return (
    <div className="mylist-page">
      <Navbar user={user} />
      <div className="mylist-content">
        <h1>My List</h1>
        {loading ? (
          <div className="mylist-loading">Loading...</div>
        ) : watchlist.length > 0 ? (
          <div className="mylist-grid">
            {watchlist.map((item) => (
              <div key={item.movieId} className="mylist-card">
                <img src={`${TMDB_POSTER_BASE_URL}${item.poster_path}`} alt={item.title} />
                <div className="mylist-card-overlay">
                  <h3>{item.title}</h3>
                  <button className="remove-btn" onClick={() => handleRemove(item.movieId)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mylist-empty">
            <p>Your list is empty</p>
            <p className="mylist-empty-subtitle">Add movies and shows to your list to watch them later</p>
          </div>
        )}
      </div>
      <footer className="mylist-footer">
        <div className="footer-container">
          <p className="footer-contact">Questions? Call 000-800-919-1694</p>
          <div className="footer-links">
            <div className="footer-column">
              <a href="#">FAQ</a>
              <a href="#">Investor Relations</a>
              <a href="#">Privacy</a>
              <a href="#">Speed Test</a>
            </div>
            <div className="footer-column">
              <a href="#">Help Centre</a>
              <a href="#">Jobs</a>
              <a href="#">Cookie Preferences</a>
              <a href="#">Legal Notices</a>
            </div>
            <div className="footer-column">
              <a href="#">Account</a>
              <a href="#">Ways to Watch</a>
              <a href="#">Corporate Information</a>
              <a href="#">Only on NeoStream</a>
            </div>
            <div className="footer-column">
              <a href="#">Media Centre</a>
              <a href="#">Terms of Use</a>
              <a href="#">Contact Us</a>
            </div>
          </div>
          <div className="footer-language">
            <select className="language-select">
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
            </select>
          </div>
          <p className="footer-copyright">NeoStream Entertainment India</p>
        </div>
      </footer>
    </div>
  )
}

export default MyList
