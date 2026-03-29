import { useState, useEffect } from 'react'
import { FaChevronLeft, FaChevronRight, FaPlay, FaPlus, FaCheck } from 'react-icons/fa'
import { moviesAPI, userAPI } from '../services/api'
import { TMDB_POSTER_BASE_URL } from '../utils/constants'
import TrailerModal from './TrailerModal'
import './Row.css'

const Row = ({ title, fetchUrl, isLargeRow = false }) => {
  const [movies, setMovies] = useState([])
  const [showTrailer, setShowTrailer] = useState(false)
  const [trailerKey, setTrailerKey] = useState(null)
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [watchlist, setWatchlist] = useState([])
  const [scrollX, setScrollX] = useState(0)

  useEffect(() => {
    fetchMovies()
    const token = localStorage.getItem('token')
    if (token) {
      fetchWatchlist()
    }
  }, [fetchUrl])

  const fetchMovies = async () => {
    try {
      const response = await fetchUrl()
      const allMovies = response.data.results || response.data
      const moviesWithImages = allMovies.filter(movie => isLargeRow ? movie.poster_path : (movie.backdrop_path || movie.poster_path))
      setMovies(moviesWithImages)
    } catch (error) {
      console.error('Error fetching movies:', error)
    }
  }

  const fetchWatchlist = async () => {
    try {
      const response = await userAPI.getWatchlist()
      setWatchlist(response.data.map(item => item.movieId))
    } catch (error) {
      console.error('Error fetching watchlist:', error)
    }
  }

  const handlePlayTrailer = async (movie) => {
    try {
      const response = await moviesAPI.getTrailer(movie.id)
      if (response.data.key) {
        setTrailerKey(response.data.key)
        setSelectedMovie(movie)
        setShowTrailer(true)
      }
    } catch (error) {
      console.error('Error fetching trailer:', error)
      alert('Trailer not available')
    }
  }

  const handleWatchlist = async (movie, e) => {
    e.stopPropagation()
    try {
      if (watchlist.includes(movie.id)) {
        await userAPI.removeFromWatchlist(movie.id)
        setWatchlist(watchlist.filter(id => id !== movie.id))
      } else {
        await userAPI.addToWatchlist(movie.id, {title: movie.title || movie.name, poster_path: movie.poster_path})
        setWatchlist([...watchlist, movie.id])
      }
    } catch (error) {
      console.error('Error updating watchlist:', error)
    }
  }

  const handleScroll = (direction) => {
    const container = document.getElementById(`row-${title}`)
    const scrollAmount = container.offsetWidth - 100
    if (direction === 'left') {
      container.scrollLeft -= scrollAmount
      setScrollX(scrollX - scrollAmount)
    } else {
      container.scrollLeft += scrollAmount
      setScrollX(scrollX + scrollAmount)
    }
  }

  return (
    <>
      <div className="row">
        <h2 className="row-title">{title}</h2>
        <div className="row-container">
          {scrollX > 0 && (<button className="row-scroll-btn left" onClick={() => handleScroll('left')}><FaChevronLeft /></button>)}
          <div className="row-posters" id={`row-${title}`}>
            {movies.map((movie) => {
              const imagePath = isLargeRow ? movie.poster_path : (movie.backdrop_path || movie.poster_path)
              if (!imagePath) return null
              return (
                <div key={movie.id} className={`row-poster-container ${isLargeRow ? 'large' : ''}`}>
                  <img className="row-poster" src={`${TMDB_POSTER_BASE_URL}${imagePath}`} alt={movie.title || movie.name} loading="lazy" />
                  <div className="row-poster-overlay">
                    <div className="poster-info">
                      <h3>{movie.title || movie.name}</h3>
                      <div className="poster-actions">
                        <button className="action-btn play" onClick={() => handlePlayTrailer(movie)}><FaPlay /></button>
                        <button className="action-btn add" onClick={(e) => handleWatchlist(movie, e)}>{watchlist.includes(movie.id) ? <FaCheck /> : <FaPlus />}</button>
                      </div>
                      <div className="poster-meta">
                        <span className="rating">⭐ {movie.vote_average?.toFixed(1)}</span>
                        <span className="year">{movie.release_date?.split('-')[0] || movie.first_air_date?.split('-')[0]}</span>
                      </div>
                    </div>
                  </div>
                  <div className="poster-title">{movie.title || movie.name}</div>
                </div>
              )
            })}
          </div>
          <button className="row-scroll-btn right" onClick={() => handleScroll('right')}><FaChevronRight /></button>
        </div>
      </div>
      {showTrailer && <TrailerModal trailerKey={trailerKey} movie={selectedMovie} onClose={() => setShowTrailer(false)} />}
    </>
  )
}

export default Row
