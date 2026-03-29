import { useState, useEffect } from 'react'
import { FaPlay, FaInfoCircle } from 'react-icons/fa'
import { moviesAPI } from '../services/api'
import { TMDB_IMAGE_BASE_URL } from '../utils/constants'
import TrailerModal from './TrailerModal'
import './Banner.css'

const Banner = () => {
  const [movie, setMovie] = useState(null)
  const [showTrailer, setShowTrailer] = useState(false)
  const [trailerKey, setTrailerKey] = useState(null)

  useEffect(() => {
    fetchBannerMovie()
  }, [])

  const fetchBannerMovie = async () => {
    try {
      const response = await moviesAPI.getTrending()
      const movies = response.data.results
      const randomMovie = movies[Math.floor(Math.random() * movies.length)]
      setMovie(randomMovie)
    } catch (error) {
      console.error('Error fetching banner movie:', error)
    }
  }

  const handlePlayTrailer = async () => {
    try {
      const response = await moviesAPI.getTrailer(movie.id)
      if (response.data.key) {
        setTrailerKey(response.data.key)
        setShowTrailer(true)
      }
    } catch (error) {
      console.error('Error fetching trailer:', error)
      alert('Trailer not available')
    }
  }

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str
  }

  if (!movie) return null

  return (
    <>
      <header className="banner" style={{backgroundImage: `url(${TMDB_IMAGE_BASE_URL}${movie.backdrop_path})`}}>
        <div className="banner-content">
          <h1 className="banner-title">{movie.title || movie.name || movie.original_name}</h1>
          <div className="banner-buttons">
            <button className="banner-button play" onClick={handlePlayTrailer}><FaPlay /> Play</button>
            <button className="banner-button info"><FaInfoCircle /> More Info</button>
          </div>
          <p className="banner-description">{truncate(movie.overview, 150)}</p>
        </div>
        <div className="banner-fade"></div>
      </header>
      {showTrailer && <TrailerModal trailerKey={trailerKey} onClose={() => setShowTrailer(false)} />}
    </>
  )
}

export default Banner
