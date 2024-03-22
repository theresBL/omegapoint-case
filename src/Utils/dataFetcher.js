const BASE_MOVIE_URL = import.meta.env.VITE_BASE_MOVIE_URL
const API_KEY = import.meta.env.VITE_API_KEY

const dataFetcher = async (params) => {

  try {
    const apiUrl = `${BASE_MOVIE_URL}?api_key=${API_KEY}&${params}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching movie data:', error)
    throw error
  }
}

const testFetch = async () => {
  try {
    const topRatedMovies = await dataFetcher('language=en-US&page=1&sort_by=vote_average.desc')
    console.log('Top rated movies:', topRatedMovies)
  } catch (error) {
    console.error('Error:', error)
  }
}

testFetch()