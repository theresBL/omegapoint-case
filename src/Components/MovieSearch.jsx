import { useState } from 'react'
import { Loading } from './Loading'

const SearchForm = ({ onSearch }) => {
  const [title, setTitle] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(title)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search movie title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  )
}

export const MovieSearch = () => {
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (title) => {
    try {
      setLoading(true)
      const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_API_KEY}&query=${encodeURIComponent(title)}`
      const response = await fetch(apiUrl)
      const data = await response.json()
      setSearchResults(data.results)
      setLoading(false)
    } catch (error) {
      console.error('Search error:', error)
      setLoading(false)
    }
  }

  return (
    <div>
      <SearchForm onSearch={handleSearch} />
      {loading ? (
        <Loading />
      ) : (
        (searchResults && searchResults.length > 0) ? (
          <ul>
            {searchResults.map((movie) => (
              <li key={movie.id}>
                {movie.title} ({movie.release_date})
              </li>
            ))}
          </ul>
        ) : (
          <p>No movies found</p>
        )
      )}
    </div>
  )
}
