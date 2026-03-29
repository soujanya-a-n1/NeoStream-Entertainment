import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import Row from '../components/Row'
import Skeleton from '../components/Skeleton'
import { moviesAPI } from '../services/api'
import { FaPlus, FaMinus } from 'react-icons/fa'
import './Browse.css'

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="faq-item">
      <button className="faq-question" onClick={() => setIsOpen(!isOpen)}>
        <span>{question}</span>
        {isOpen ? <FaMinus /> : <FaPlus />}
      </button>
      <div className={`faq-answer ${isOpen ? 'open' : ''}`}><p>{answer}</p></div>
    </div>
  )
}

const Browse = ({ user }) => {
  const [loading, setLoading] = useState(true)
  const [trendingMovies, setTrendingMovies] = useState([])

  useEffect(() => {
    const loadData = async () => {
      await fetchTrending()
      setLoading(false)
    }
    loadData()
  }, [])

  const fetchTrending = async () => {
    try {
      const response = await moviesAPI.getTrending()
      const movies = response.data?.results || response.data || []
      const moviesWithPosters = movies.filter(m => m.poster_path).slice(0, 10)
      setTrendingMovies(moviesWithPosters)
    } catch (error) {
      console.error('Error fetching trending:', error)
      setTrendingMovies([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="browse">
        <Navbar user={user} />
        <Skeleton type="banner" />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    )
  }

  return (
    <div className="browse">
      <Navbar user={user} />
      <Banner />
      <section className="reasons-section">
        <div className="reasons-container">
          <h2 className="reasons-title">More reasons to join</h2>
          <div className="reasons-grid">
            <div className="reason-card">
              <div className="reason-icon">📺</div>
              <h3 className="reason-title">Enjoy on your TV</h3>
              <p className="reason-description">Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</p>
            </div>
            <div className="reason-card">
              <div className="reason-icon">📥</div>
              <h3 className="reason-title">Download your shows to watch offline</h3>
              <p className="reason-description">Save your favorites easily and always have something to watch.</p>
            </div>
            <div className="reason-card">
              <div className="reason-icon">💻</div>
              <h3 className="reason-title">Watch everywhere</h3>
              <p className="reason-description">Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.</p>
            </div>
            <div className="reason-card">
              <div className="reason-icon">👶</div>
              <h3 className="reason-title">Create profiles for kids</h3>
              <p className="reason-description">Send kids on adventures with their favorite characters in a space made just for them—free with your membership.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="trending-section">
        <div className="trending-container">
          <h2 className="trending-title">Trending Now</h2>
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
        </div>
      </section>
      <div className="browse-rows">
        <Row title="Featured Originals" fetchUrl={() => moviesAPI.getNetflixOriginals()} isLargeRow />
        <Row title="Top Rated" fetchUrl={() => moviesAPI.getTopRated()} />
        <Row title="Action Movies" fetchUrl={() => moviesAPI.getByGenre('action')} />
        <Row title="Comedy Movies" fetchUrl={() => moviesAPI.getByGenre('comedy')} />
        <Row title="Horror Movies" fetchUrl={() => moviesAPI.getByGenre('horror')} />
        <Row title="Romance Movies" fetchUrl={() => moviesAPI.getByGenre('romance')} />
        <Row title="Documentaries" fetchUrl={() => moviesAPI.getByGenre('documentary')} />
      </div>
      <section className="faq-section">
        <div className="faq-container">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <div className="faq-list">
            <FAQItem question="What is Netflix?" answer="Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices. You can watch as much as you want, whenever you want without a single commercial – all for one low monthly price." />
            <FAQItem question="How much does Netflix cost?" answer="Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹149 to ₹649 a month. No extra costs, no contracts." />
            <FAQItem question="Where can I watch?" answer="Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles." />
            <FAQItem question="How do I cancel?" answer="Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime." />
            <FAQItem question="What can I watch on Netflix?" answer="Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want." />
            <FAQItem question="Is Netflix good for kids?" answer="The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space. Kids profiles come with PIN-protected parental controls." />
          </div>
        </div>
      </section>
      <footer className="browse-footer">
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
              <a href="#">Only on Netflix</a>
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
          <p className="footer-copyright">Netflix India</p>
        </div>
      </footer>
    </div>
  )
}

export default Browse
