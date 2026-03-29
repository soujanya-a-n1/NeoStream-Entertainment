import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { moviesAPI } from '../services/api'
import { TMDB_POSTER_BASE_URL } from '../utils/constants'
import './Search.css'

const Search = ({ user }) => {
  const [searchParams] = useSearchParams()
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const query = searchParams.get('q')

  useEffect(() => {
    if (query) {
      searchMovies()
    }
  }, [query])

  const searchMovies = async () => {
    setLoading(true)
    try {
      const response = await moviesAPI.search(query)
      const results = response.data.results || []
      const resultsWithPosters = results.filter(movie => movie.poster_path)
      setMovies(resultsWithPosters)
    } catch (error) {
      console.error('Error searching movies:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="search-page">
      <Navbar user={user} />
      <div className="search-content">
        <h1>Search Results for "{query}"</h1>
        {loading ? (
          <div className="search-loading">Loading...</div>
        ) : movies.length > 0 ? (
          <div className="search-grid">
            {movies.map((movie) => (
              <div key={movie.id} className="search-card">
                <img src={`${TMDB_POSTER_BASE_URL}${movie.poster_path}`} alt={movie.title || movie.name} />
                <div className="search-card-info">
                  <h3>{movie.title || movie.name}</h3>
                  <p>⭐ {movie.vote_average?.toFixed(1)}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="search-no-results"><p>No results found for "{query}"</p></div>
        )}
      </div>
      <footer className="search-footer">
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

export default Search
