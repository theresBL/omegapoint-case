import { useState } from 'react'
import { Loading } from './Loading'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'

const Search = styled('form')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'white',
  '&:hover': {
    backgroundColor: 'white',
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  color: 'black',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'black',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '0',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}))

export const SearchBar = ({ onSearch }) => {
  const [loading, setLoading] = useState(false)
  const [searchResults, setSearchResults] = useState([])

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    const title = e.target.elements.search.value
    if (title.trim() !== "") {
      await handleSearch(title)
    }
  }

  return (
    <Box>
      <Search onSubmit={handleSubmit}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search for movie…"
          inputProps={{ 'aria-label': 'Search for movie', 'name': 'search' }}
        />
      </Search>
      {loading ? (
        <Loading />
      ) : (
        (searchResults && searchResults.length > 0) && (
          <ul>
            {searchResults.map((movie) => (
              <li key={movie.id}>
                {movie.title}
              </li>
            ))}
          </ul>
        )
      )}
    </Box>
  )
}
