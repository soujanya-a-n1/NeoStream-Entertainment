# NeoStream Entertainment 🎬

A fully functional streaming platform built with React that works entirely without a backend. Uses TMDB API for movie data and localStorage for authentication and watchlist functionality.

## ✨ Features

- 🎥 Browse movies & TV shows from TMDB
- 🔍 Advanced search functionality
- 🔥 Trending section with rankings
- 👤 User authentication (localStorage-based)
- ❤️ Personal watchlist (My List)
- 🎬 YouTube trailer integration
- 📱 Fully responsive design
- 🎨 Modern streaming platform UI/UX
- ⚡ Fast and lightweight (no backend required)

## 🛠️ Tech Stack

- React 19
- Vite (build tool)
- React Router v6 (routing)
- Axios (HTTP client)
- TMDB API (movie data)
- localStorage (authentication & watchlist)
- React Icons
- React YouTube

## 📋 Prerequisites

- Node.js 18+ and npm
- TMDB API key (free from https://www.themoviedb.org/settings/api)

## ⚡ Quick Start

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd NeoStream-Entertainment
```

### 2. Install dependencies

```bash
cd frontend
npm install
```

### 3. Environment setup

The `.env` file is already configured with a TMDB API key:
```
VITE_TMDB_API_KEY=c36fa5ec43f0f1b3e4005192cecdbced
```

If you want to use your own API key, get one from [TMDB](https://www.themoviedb.org/settings/api) and update the `.env` file.

### 4. Run the application

```bash
npm run dev
```

The app will open at `http://localhost:5173`

## 📁 Project Structure

```
NeoStream-Entertainment/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Navigation bar with search
│   │   │   ├── Banner.jsx          # Hero banner component
│   │   │   ├── Row.jsx             # Movie row component
│   │   │   ├── TrailerModal.jsx    # YouTube trailer modal
│   │   │   └── Skeleton.jsx        # Loading skeleton
│   │   ├── pages/
│   │   │   ├── Home.jsx            # Landing page
│   │   │   ├── Browse.jsx          # Main browse page
│   │   │   ├── Login.jsx           # Login page
│   │   │   ├── Register.jsx        # Registration page
│   │   │   ├── Search.jsx          # Search results page
│   │   │   ├── MyList.jsx          # User's watchlist
│   │   │   └── Trending.jsx        # Trending movies/shows
│   │   ├── services/
│   │   │   └── api.js              # TMDB API integration
│   │   ├── utils/
│   │   │   └── constants.js        # API URLs and constants
│   │   ├── App.jsx                 # Main app component
│   │   └── main.jsx                # Entry point
│   ├── .env                        # Environment variables
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🎯 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🔐 Authentication

This app uses localStorage for mock authentication:
- Users are stored in browser's localStorage
- No real backend authentication
- Data persists across sessions
- Perfect for demo/learning purposes

To login, simply register a new account or use any credentials you've previously registered.

## 📺 Pages Overview

### Home Page
- Modern landing page
- Hero section with movie backdrop
- Language selector
- Trending Now section with rankings
- "More reasons to join" feature cards
- FAQ section
- Complete footer

### Browse Page
- Multiple movie categories:
  - Featured Originals (large posters)
  - Top Rated
  - Action Movies
  - Comedy Movies
  - Horror Movies
  - Romance Movies
  - Documentaries
- Horizontal scrolling rows
- Click any movie to watch trailer

### Search Page
- Real-time search functionality
- Grid layout of search results
- Hover effects and movie details

### My List
- Personal watchlist
- Add/remove movies
- Persisted in localStorage

### Trending
- Top trending movies and TV shows
- Numbered rankings
- Updated from TMDB API

## 🎨 Key Components

### Navbar
- Responsive navigation
- Search functionality
- User menu
- Active route highlighting

### Banner
- Random featured movie
- Play and More Info buttons
- Trailer modal integration
- Fade-out gradient effect

### Row
- Horizontal scrolling movie rows
- Lazy loading images
- Hover effects
- Category-based filtering

### TrailerModal
- YouTube trailer integration
- Overlay modal
- Close on outside click

## 🔧 Configuration

### TMDB API
The app uses TMDB API v3. Key endpoints:
- `/trending/all/week` - Trending content
- `/movie/top_rated` - Top rated movies
- `/discover/movie` - Discover movies by genre
- `/search/multi` - Search movies and TV shows

### Environment Variables
```
VITE_TMDB_API_KEY=your_api_key_here
```

## 🚀 Deployment

### Build for production
```bash
cd frontend
npm run build
```

The `dist` folder will contain the production build ready for deployment.

### Deploy to Vercel/Netlify
1. Connect your repository
2. Set build command: `cd frontend && npm run build`
3. Set output directory: `frontend/dist`
4. Add environment variable: `VITE_TMDB_API_KEY`

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Movies not loading | Check TMDB API key in `.env` file |
| API Connection Timeout (ERR_CONNECTION_TIMED_OUT) | This is usually a network/firewall issue. The app will automatically use mock data as fallback. To fix: 1) Check your internet connection, 2) Try disabling VPN/proxy, 3) Check if `api.themoviedb.org` is accessible, 4) Check firewall settings |
| Blank page | Run `npm install` and restart dev server |
| Search not working | Ensure Navbar.jsx has proper template literals |
| Trailers not playing | Check YouTube video availability |
| Port already in use | Change port in `vite.config.js` or stop other services |
| React Router warnings | These are future flag warnings and don't affect functionality |

### Network Issues with TMDB API

If you see `ERR_CONNECTION_TIMED_OUT` errors in the console, the app is having trouble reaching the TMDB API. This could be due to:

- Network connectivity issues
- Firewall or antivirus blocking the API
- VPN/proxy interference
- DNS resolution problems
- TMDB API temporarily unavailable

The app will automatically fall back to mock data, so it will still work with sample movies. To resolve:

1. Check if you can access https://api.themoviedb.org in your browser
2. Try disabling VPN or proxy temporarily
3. Check Windows Firewall settings
4. Try using a different network
5. Wait a few minutes and refresh - the API might be temporarily down

## 📝 Notes

- This is a frontend-only application - no backend required
- All user data is stored in browser's localStorage
- TMDB API has rate limits (check their documentation)
- Some movies may not have trailers available
- The app is for educational purposes only

## 🙏 Credits

- Movie data provided by [TMDB](https://www.themoviedb.org/)
- Trailers from YouTube
- Inspired by modern streaming platforms

## 📄 License

This project is for educational purposes only. TMDB is a trademark of their respective owners.
