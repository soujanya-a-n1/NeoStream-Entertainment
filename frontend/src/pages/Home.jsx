import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaPlus, FaMinus } from 'react-icons/fa'
import './Home.css'

const TMDB_POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500'

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([])
  const [openFAQ, setOpenFAQ] = useState(null)

  useEffect(() => {
    fetchTrendingMovies()
  }, [])

  const fetchTrendingMovies = async () => {
    try {
      const { moviesAPI } = await import('../services/api')
      const response = await moviesAPI.getTrending()
      const movies = response.data?.results || response.data || []
      setTrendingMovies(movies.slice(0, 10))
    } catch (error) {
      console.error('Error fetching trending movies:', error)
      setTrendingMovies([])
    }
  }

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  const faqs = [
    {question: "What is NeoStream Entertainment?", answer: "NeoStream Entertainment is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices. You can watch as much as you want, whenever you want without a single commercial – all for one low monthly price."},
    {question: "How much does NeoStream cost?", answer: "Watch NeoStream on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹149 to ₹649 a month. No extra costs, no contracts."},
    {question: "Where can I watch?", answer: "Watch anywhere, anytime. Sign in with your NeoStream account to watch instantly on the web from your personal computer or on any internet-connected device that offers the NeoStream app, including smart TVs, smartphones, tablets, streaming media players and game consoles."},
    {question: "How do I cancel?", answer: "NeoStream is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime."},
    {question: "What can I watch on NeoStream?", answer: "NeoStream has an extensive library of feature films, documentaries, TV shows, anime, award-winning originals, and more. Watch as much as you want, anytime you want."},
    {question: "Is NeoStream good for kids?", answer: "The NeoStream Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space. Kids profiles come with PIN-protected parental controls."}
  ]

  const reasons = [
    {title: "Enjoy on your TV", description: "Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.", icon: "📺"},
    {title: "Download your shows to watch offline", description: "Save your favorites easily and always have something to watch.", icon: "📥"},
    {title: "Watch everywhere", description: "Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.", icon: "💻"},
    {title: "Create profiles for kids", description: "Send kids on adventures with their favorite characters in a space made just for them—free with your membership.", icon: "👶"}
  ]

  return (
    <div className="home">
      <header className="home-header">
        <div className="home-nav">
          <div className="home-logo">NEOSTREAM</div>
          <div className="home-nav-right">
            <select className="language-select">
              <option value="en">🌐 English</option>
              <option value="hi">🌐 हिन्दी</option>
            </select>
            <Link to="/login" className="home-signin-btn">Sign In</Link>
          </div>
        </div>
      </header>
      <main className="home-hero">
        <div className="home-content">
          <h1>Unlimited movies, TV shows and more</h1>
          <h2>Starts at ₹149. Cancel at any time.</h2>
          <p>Ready to watch? Enter your email to create or restart your membership.</p>
          <div className="home-email-form">
            <input type="email" placeholder="Email address" className="home-email-input" />
            <Link to="/register" className="home-get-started-btn">Get Started →</Link>
          </div>
        </div>
      </main>
      <section className="trending-section">
        <div className="trending-container">
          <h2 className="trending-title">Trending Now</h2>
          <div className="trending-scroll-wrapper">
            <div className="trending-grid">
              {trendingMovies.map((movie, index) => (
                <div key={movie.id} className="trending-card">
                  <div className="trending-rank">{index + 1}</div>
                  {movie.poster_path && (
                    <>
                      <div className="netflix-badge">N</div>
                      <img src={`${TMDB_POSTER_BASE_URL}${movie.poster_path}`} alt={movie.title || movie.name} className="trending-poster" />
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="reasons-section">
        <div className="reasons-container">
          <h2 className="reasons-title">More reasons to join</h2>
          <div className="reasons-grid">
            {reasons.map((reason, index) => (
              <div key={index} className="reason-card">
                <div className="reason-icon">{reason.icon}</div>
                <h3 className="reason-title">{reason.title}</h3>
                <p className="reason-description">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="faq-section">
        <div className="faq-container">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <button className="faq-question" onClick={() => toggleFAQ(index)}>
                  <span>{faq.question}</span>
                  {openFAQ === index ? <FaMinus /> : <FaPlus />}
                </button>
                <div className={`faq-answer ${openFAQ === index ? 'open' : ''}`}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="faq-cta">
            <p>Ready to watch? Enter your email to create or restart your membership.</p>
            <div className="home-email-form">
              <input type="email" placeholder="Email address" className="home-email-input" />
              <Link to="/register" className="home-get-started-btn">Get Started →</Link>
            </div>
          </div>
        </div>
      </section>
      <footer className="home-footer">
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

export default Home
