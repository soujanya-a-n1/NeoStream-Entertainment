import axios from 'axios'

const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const tmdb = axios.create({
  baseURL: TMDB_BASE_URL,
  params: { api_key: API_KEY },
  timeout: 5000, // 5 second timeout
})

const GENRE_MAP = {
  action: 28,
  comedy: 35,
  horror: 27,
  romance: 10749,
  documentary: 99,
  scifi: 878,
  thriller: 53,
  animation: 16,
}

// --- Auth (localStorage mock) ---
export const authAPI = {
  login: (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find((u) => u.email === email && u.password === password)
    if (!user) return Promise.reject({ response: { data: { message: 'Invalid email or password' } } })
    const token = btoa(JSON.stringify({ id: user.id, email: user.email }))
    return Promise.resolve({ data: { token, user: { id: user.id, name: user.name, email: user.email } } })
  },

  register: (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    if (users.find((u) => u.email === email))
      return Promise.reject({ response: { data: { message: 'Email already registered' } } })
    const user = { id: Date.now().toString(), name, email, password }
    users.push(user)
    localStorage.setItem('users', JSON.stringify(users))
    const token = btoa(JSON.stringify({ id: user.id, email: user.email }))
    return Promise.resolve({ data: { token, user: { id: user.id, name: user.name, email: user.email } } })
  },

  getCurrentUser: () => {
    const token = localStorage.getItem('token')
    if (!token) return Promise.reject(new Error('No token'))
    try {
      const payload = JSON.parse(atob(token))
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const user = users.find((u) => u.id === payload.id)
      if (!user) return Promise.reject(new Error('User not found'))
      return Promise.resolve({ data: { user: { id: user.id, name: user.name, email: user.email } } })
    } catch {
      return Promise.reject(new Error('Invalid token'))
    }
  },
}

// Mock data for fallback when API fails
const MOCK_TRENDING_DATA = {
  results: [
    { id: 550, title: 'Fight Club', name: 'Fight Club', poster_path: '/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJA.jpg', backdrop_path: '/fCayJrkfRaCRCTh8GqN30f8oyQF.jpg', overview: 'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy.' },
    { id: 278, title: 'The Shawshank Redemption', name: 'The Shawshank Redemption', poster_path: '/q6y0aVqMw08D0JQ1qJj7FvtHV0J.jpg', backdrop_path: '/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg', overview: 'Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison.' },
    { id: 238, title: 'The Godfather', name: 'The Godfather', poster_path: '/3bhkrj58Vtu7enYsRolD1cjexVs.jpg', backdrop_path: '/tmU7GeKVybMWFButWEGl2M4GeiP.jpg', overview: 'Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family.' },
    { id: 240, title: 'The Godfather Part II', name: 'The Godfather Part II', poster_path: '/hWta6qaKQCBJ0EesY9moquSQalC.jpg', backdrop_path: '/gLbBRyS7UB0D8zOjbJjxJGPvPJW.jpg', overview: 'In the continuing saga of the Corleone crime family, a young Vito Corleone grows up in Sicily and in 1910s New York.' },
    { id: 424, title: 'Schindler\'s List', name: 'Schindler\'s List', poster_path: '/sF1U4EUQS8YHUYjNl7pMGH4IRD2.jpg', backdrop_path: '/loRmRzQXZeqG78TqZuyvSlEQfZb.jpg', overview: 'The true story of how businessman Oskar Schindler saved over a thousand Jewish lives from the Nazis.' },
    { id: 389, title: 'Pulp Fiction', name: 'Pulp Fiction', poster_path: '/oRy8qCaQy8nUKNJ51BRrQq5xH8t.jpg', backdrop_path: '/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg', overview: 'A burger-loving hit man, his philosophical partner, a drug-addled gangster\'s moll and a washed-up boxer converge in this sprawling, comedic crime caper.' },
    { id: 155, title: 'The Dark Knight', name: 'The Dark Knight', poster_path: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg', backdrop_path: '/hqkIcbrOHL86UncnHIsHVcVmzue.jpg', overview: 'Batman raises the stakes in his war on crime with the help of Lt. Jim Gordon and District Attorney Harvey Dent.' },
    { id: 80684, title: 'Inception', name: 'Inception', poster_path: '/9gk7adHYeDMNNoonIdN0jlzjIHP.jpg', backdrop_path: '/s3TBrRGB1iav7gFOCNx3H31MoES.jpg', overview: 'Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life.' },
    { id: 76341, title: 'Mad Max: Fury Road', name: 'Mad Max: Fury Road', poster_path: '/kqjL17yufvn9OVLyXYpvtf8dwVe.jpg', backdrop_path: '/tbhdm8UJAb4ViCTsulYFL3lxMCd.jpg', overview: 'An apocalyptic story set in the furthest reaches of our planet, in a stark desert landscape where humanity is broken.' },
    { id: 238215, title: 'Interstellar', name: 'Interstellar', poster_path: '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', backdrop_path: '/xu9zaAevzQ5nnrsXN6JcahLnG4i.jpg', overview: 'The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel.' },
    { id: 27205, title: 'Inception', name: 'Inception', poster_path: '/9gk7adHYeDMNNoonIdN0jlzjIHP.jpg', backdrop_path: '/s3TBrRGB1iav7gFOCNx3H31MoES.jpg', overview: 'A thief who steals corporate secrets through the use of dream-sharing technology.' },
    { id: 497, title: 'The Green Mile', name: 'The Green Mile', poster_path: '/velWPhVMQeQKcxggNEU8YmIo52R.jpg', backdrop_path: '/l6hQWH9eDksNJNiXWYRkWqikOdu.jpg', overview: 'A supernatural tale set on death row in a Southern prison, where gentle giant John Coffey possesses the mysterious power to heal people\'s ailments.' },
    { id: 13, title: 'Forrest Gump', name: 'Forrest Gump', poster_path: '/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg', backdrop_path: '/7c9UVPPiTPltouxRVY6N9uugaVA.jpg', overview: 'A man with a low IQ has accomplished great things in his life and been present during significant historic events.' },
    { id: 769, title: 'GoodFellas', name: 'GoodFellas', poster_path: '/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg', backdrop_path: '/hAPeXBdGDGmXRPj4OZZ0poH65Iu.jpg', overview: 'The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners.' },
    { id: 429, title: 'The Good, the Bad and the Ugly', name: 'The Good, the Bad and the Ugly', poster_path: '/bX2xnavhMYjWDoZp1VM6VnU1xwe.jpg', backdrop_path: '/4YKzRnWCpYGU7jJhKhFWZeJOyJw.jpg', overview: 'While the Civil War rages between the Union and the Confederacy, three men – a quiet loner, a ruthless hit man and a Mexican bandit – comb the American Southwest in search of a strongbox containing $200,000 in stolen gold.' },
  ]
}

const MOCK_TOP_RATED = {
  results: [
    { id: 550, title: 'Fight Club', name: 'Fight Club', poster_path: '/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJA.jpg', backdrop_path: '/fCayJrkfRaCRCTh8GqN30f8oyQF.jpg', overview: 'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy.' },
    { id: 278, title: 'The Shawshank Redemption', name: 'The Shawshank Redemption', poster_path: '/q6y0aVqMw08D0JQ1qJj7FvtHV0J.jpg', backdrop_path: '/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg', overview: 'Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison.' },
    { id: 238, title: 'The Godfather', name: 'The Godfather', poster_path: '/3bhkrj58Vtu7enYsRolD1cjexVs.jpg', backdrop_path: '/tmU7GeKVybMWFButWEGl2M4GeiP.jpg', overview: 'Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family.' },
    { id: 155, title: 'The Dark Knight', name: 'The Dark Knight', poster_path: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg', backdrop_path: '/hqkIcbrOHL86UncnHIsHVcVmzue.jpg', overview: 'Batman raises the stakes in his war on crime with the help of Lt. Jim Gordon and District Attorney Harvey Dent.' },
    { id: 389, title: 'Pulp Fiction', name: 'Pulp Fiction', poster_path: '/oRy8qCaQy8nUKNJ51BRrQq5xH8t.jpg', backdrop_path: '/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg', overview: 'A burger-loving hit man, his philosophical partner, a drug-addled gangster\'s moll and a washed-up boxer converge in this sprawling, comedic crime caper.' },
    { id: 80684, title: 'Inception', name: 'Inception', poster_path: '/9gk7adHYeDMNNoonIdN0jlzjIHP.jpg', backdrop_path: '/s3TBrRGB1iav7gFOCNx3H31MoES.jpg', overview: 'Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life.' },
    { id: 497, title: 'The Green Mile', name: 'The Green Mile', poster_path: '/velWPhVMQeQKcxggNEU8YmIo52R.jpg', backdrop_path: '/l6hQWH9eDksNJNiXWYRkWqikOdu.jpg', overview: 'A supernatural tale set on death row in a Southern prison, where gentle giant John Coffey possesses the mysterious power to heal people\'s ailments.' },
    { id: 13, title: 'Forrest Gump', name: 'Forrest Gump', poster_path: '/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg', backdrop_path: '/7c9UVPPiTPltouxRVY6N9uugaVA.jpg', overview: 'A man with a low IQ has accomplished great things in his life and been present during significant historic events.' },
  ]
}

const MOCK_ACTION_MOVIES = {
  results: [
    { id: 155, title: 'The Dark Knight', poster_path: '/qJ2tW6WMUDux911r6m7haRef0WH.jpg', backdrop_path: '/hqkIcbrOHL86UncnHIsHVcVmzue.jpg' },
    { id: 76341, title: 'Mad Max: Fury Road', poster_path: '/kqjL17yufvn9OVLyXYpvtf8dwVe.jpg', backdrop_path: '/tbhdm8UJAb4ViCTsulYFL3lxMCd.jpg' },
    { id: 27205, title: 'Inception', poster_path: '/9gk7adHYeDMNNoonIdN0jlzjIHP.jpg', backdrop_path: '/s3TBrRGB1iav7gFOCNx3H31MoES.jpg' },
    { id: 299536, title: 'Avengers: Infinity War', poster_path: '/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg', backdrop_path: '/lmZFxXgJE3vgrciwuDib0N8CfQo.jpg' },
    { id: 299534, title: 'Avengers: Endgame', poster_path: '/or06FN3Dka5tukK1e9sl16pB3iy.jpg', backdrop_path: '/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg' },
  ]
}

const MOCK_COMEDY_MOVIES = {
  results: [
    { id: 13, title: 'Forrest Gump', poster_path: '/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg', backdrop_path: '/7c9UVPPiTPltouxRVY6N9uugaVA.jpg' },
    { id: 680, title: 'Pulp Fiction', poster_path: '/oRy8qCaQy8nUKNJ51BRrQq5xH8t.jpg', backdrop_path: '/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg' },
    { id: 19404, title: 'Dilwale Dulhania Le Jayenge', poster_path: '/2CAL2433ZeIihfX1Hb2139CX0pW.jpg', backdrop_path: '/90ez6ArvpO8bvpyIngBuwXOqJm5.jpg' },
  ]
}

// --- Movies (TMDB direct with fallback) ---
export const moviesAPI = {
  getTrending: async () => {
    try {
      const response = await tmdb.get('/trending/all/week')
      return { data: response.data }
    } catch (error) {
      console.warn('TMDB API unavailable, using mock data:', error.message)
      return { data: MOCK_TRENDING_DATA }
    }
  },

  getNetflixOriginals: async () => {
    try {
      const response = await tmdb.get('/discover/tv', { params: { with_networks: 213 } })
      return { data: response.data }
    } catch (error) {
      console.warn('Using mock data for Featured Originals')
      return { data: MOCK_TOP_RATED }
    }
  },

  getTopRated: async () => {
    try {
      const response = await tmdb.get('/movie/top_rated')
      return { data: response.data }
    } catch (error) {
      console.warn('Using mock data for Top Rated')
      return { data: MOCK_TOP_RATED }
    }
  },

  getByGenre: async (genre) => {
    try {
      const response = await tmdb.get('/discover/movie', { params: { with_genres: GENRE_MAP[genre] || genre } })
      return { data: response.data }
    } catch (error) {
      console.warn(`Using mock data for ${genre}`)
      // Return genre-specific mock data
      if (genre === 'action') return { data: MOCK_ACTION_MOVIES }
      if (genre === 'comedy') return { data: MOCK_COMEDY_MOVIES }
      return { data: MOCK_TOP_RATED }
    }
  },

  search: async (query) => {
    try {
      const response = await tmdb.get('/search/multi', { params: { query } })
      return { data: response.data }
    } catch (error) {
      console.warn('Search unavailable')
      return { data: { results: [] } }
    }
  },

  getDetails: async (id) => {
    try {
      const response = await tmdb.get(`/movie/${id}`)
      return { data: response.data }
    } catch (error) {
      return { data: {} }
    }
  },

  getTrailer: async (id) => {
    try {
      const r = await tmdb.get(`/movie/${id}/videos`)
      const trailer = r.data.results.find((v) => v.type === 'Trailer' && v.site === 'YouTube')
      if (trailer) return { data: { key: trailer.key } }
    } catch {}
    try {
      const r = await tmdb.get(`/tv/${id}/videos`)
      const trailer = r.data.results.find((v) => v.type === 'Trailer' && v.site === 'YouTube')
      if (trailer) return { data: { key: trailer.key } }
    } catch {}
    
    // Fallback to mock trailer keys when API is unavailable
    const mockTrailers = {
      550: 'BdJKm16Co6M',        // Fight Club
      278: 'PLl99DlL6b4',        // Shawshank Redemption
      238: 'UaVTIH8mujA',        // The Godfather
      240: 'qJr92K_hKl0',        // The Godfather Part II
      424: 'mxphAlJID9U',        // Schindler's List
      389: 's7EdQ4FqbhY',        // Pulp Fiction
      155: 'EXeTwQWrcwY',        // The Dark Knight
      80684: 'YoHD9XEInc0',      // Inception
      76341: 'hEJnMQG9ev8',      // Mad Max: Fury Road
      238215: 'zSWdZVtXT7E',     // Interstellar
      497: 'Ki4haFrqSrw',        // The Green Mile
      13: 'bLvqoHBptjg',         // Forrest Gump
      769: 'qo5jJpHtI1Y',        // GoodFellas
      429: 'WCN5JJY_wiA',        // The Good, the Bad and the Ugly
      27205: 'YoHD9XEInc0',      // Inception (duplicate)
      299536: '6ZfuNTqbHE8',     // Avengers: Infinity War
      299534: 'TcMBFSGVi1c',     // Avengers: Endgame
      680: 's7EdQ4FqbhY',        // Pulp Fiction (duplicate)
      19404: 'yjJL9DGU7Gg',      // Dilwale Dulhania Le Jayenge
    }
    
    const mockKey = mockTrailers[id]
    if (mockKey) {
      console.log(`Using mock trailer for movie ${id}`)
      return { data: { key: mockKey } }
    }
    
    return { data: { key: null } }
  },
}

// --- Watchlist (localStorage) ---
const getWatchlistData = () => JSON.parse(localStorage.getItem('watchlist') || '[]')
const saveWatchlistData = (list) => localStorage.setItem('watchlist', JSON.stringify(list))

export const userAPI = {
  getWatchlist: () => Promise.resolve({ data: getWatchlistData() }),

  addToWatchlist: (movieId, movieData) => {
    const list = getWatchlistData()
    if (!list.find((i) => i.movieId === movieId)) {
      list.push({ movieId, ...movieData })
      saveWatchlistData(list)
    }
    return Promise.resolve({ data: list })
  },

  removeFromWatchlist: (movieId) => {
    const list = getWatchlistData().filter((i) => i.movieId !== movieId)
    saveWatchlistData(list)
    return Promise.resolve({ data: list })
  },
}

export default tmdb
