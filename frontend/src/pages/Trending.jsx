import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { moviesAPI } from '../services/api'
import './Trending.css'

const Trending = ({ user }) => {
  const [trendingMovies, setTrendingMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTrending()
  }, [])

  const fetchTrending = async () => {
    try {
      const response = await moviesAPI.getTrending()
      const movies = response.data.results || []
      const moviesWithPosters = movies.filter(m => m.poster_path).slice(0, 10)
      setTrendingMovies(moviesWithPosters)
    } catch (error) {
      console.error('Error fetching trending:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="trending-page">
      <Navbar user={user} />
      <div className="trending-page-content">
        <section className="trending-section">
          <div className="trending-container">
            <h2 className="trending-title">Trending Now</h2>
            {loading ? (
              <div className="trending-loading">Loading...</div>
            ) : (
              <div className="trending-scroll-wrapper">
                <div className="trending-grid">
                  {trendingMovies.map((movie, index) => (
                    <div key={movie.id} className="trending-card">
                      <div className="trending-rank">{index + 1}</div>
                      <div className="netflix-badge">N</div>
                      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title || movie.name} className="trending-poster" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
        <section className="reasons-section">
          <div className="reasons-container">
            <h2 className="reasons-title">More reasons to join</h2>
            <div className="reasons-grid">
              <div className="reason-card">
                <div className="reason-icon">📺</div>
                <h3 className="reason-title">Enjoy on your TV</h3>
                <p className="reason-description">Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.</p>
              </div>
              <div className="reason-card">
                <div className="reason-icon">📥</div>
                <h3 className="reason-title">Download your shows to watch offline</h3>
                <p className="reason-description">Save your favourites easily and always have something to watch.</p>
              </div>
              <div className="reason-card">
                <div className="reason-icon">💻</div>
                <h3 className="reason-title">Watch everywhere</h3>
                <p className="reason-description">Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.</p>
              </div>
              <div className="reason-card">
                <div className="reason-icon">👶</div>
                <h3 className="reason-title">Create profiles for kids</h3>
                <p className="reason-description">Send kids on adventures with their favourite characters in a space made just for them—free with your membership.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <footer className="trending-footer">
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

export default Trending
