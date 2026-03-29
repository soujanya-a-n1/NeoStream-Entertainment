import { useEffect } from 'react'
import YouTube from 'react-youtube'
import { FaTimes } from 'react-icons/fa'
import './TrailerModal.css'

const TrailerModal = ({ trailerKey, movie, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      controls: 1,
      modestbranding: 1,
      rel: 0,
    },
  }

  const handleBackdropClick = (e) => {
    if (e.target.className === 'trailer-modal') {
      onClose()
    }
  }

  return (
    <div className="trailer-modal" onClick={handleBackdropClick}>
      <div className="trailer-content">
        <button className="trailer-close" onClick={onClose}><FaTimes /></button>
        {movie && (<div className="trailer-info"><h2>{movie.title || movie.name}</h2></div>)}
        <div className="trailer-player"><YouTube videoId={trailerKey} opts={opts} onError={() => alert('Error loading trailer')} /></div>
      </div>
    </div>
  )
}

export default TrailerModal
