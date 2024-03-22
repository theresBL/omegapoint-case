/* eslint-disable react/prop-types */
import { useState } from 'react'
import styled from 'styled-components'
import { Loading } from '../Components/Loading'
import { Page } from '../Components/ReusableStyles/Page'
import { GridContainer, MovieGrid } from '../Components/ReusableStyles/GridContainer'
import { MovieCard } from '../Components/ReusableStyles/MovieCard'

const SearchForm = ({ onSearch }) => {
  const [title, setTitle] = useState('')
  const [year, setYear] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch({ title, year })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <InputDiv>
        <Input
          type="text"
          placeholder="Search movie title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Release year (optional)"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </InputDiv>
      <SearchButton type="submit">Search</SearchButton>
    </Form>
  )
}

const Form = styled.form`
  border: solid blue 1px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`

const InputDiv = styled.div`
display: flex;
gap: 1rem; 
`

const Input = styled.input`
border: none;
border-radius: 1rem;
padding: 4px 8px;
`

const SearchButton = styled.button`
border: none;
border-radius: 1rem;
padding: 4px 8px;

&:hover {
  filter: brightness(50%);
}
  
`

export const MovieSearch = () => {
  const [searchResults, setSearchResults] = useState([])
  const [similarResults, setSimilarResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const handleSearch = async ({ title, year }) => {
    try {
      setLoading(true)
      setSearched(true)
      let apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_API_KEY}&query=${encodeURIComponent(title)}`
      if (year) {
        apiUrl += `&primary_release_year=${year}`
      }
      const response = await fetch(apiUrl)
      const data = await response.json()

      if (data.results.length > 0) {
        setSearchResults(data.results)
        setSimilarResults([])
      } else {
        setSearchResults([])
        const similarApiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_API_KEY}&query=${encodeURIComponent(title)}`
        const similarResponse = await fetch(similarApiUrl)
        const similarData = await similarResponse.json()
        setSimilarResults(similarData.results)
      }

      setLoading(false)
    } catch (error) {
      console.error('Search error:', error)
      setLoading(false)
    }
  }

  return (
    <Page>
      <SearchPage>
        <SearchForm onSearch={handleSearch} />
        {loading ? (
          <Loading />
        ) : (
          <>
            {!searched ? (
              <TextDiv>
                <h2>Start by entering a movie title...</h2>
                <p>You can filter your results with adding the release year!</p>
              </TextDiv>
            ) : (
              <>
                {searchResults.length > 0 ? (
                  <GridContainer>
                    <h2>Search Results</h2>
                    <MovieGrid>
                      {searchResults.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                      ))}
                    </MovieGrid>
                  </GridContainer>
                ) : (
                  <TextDiv>
                    <h2>No movies found...</h2>
                    <p>Try a different movie title</p>
                  </TextDiv>
                )}
              </>
            )}
            {similarResults.length > 0 && searchResults.length === 0 && (
              <GridContainer>
                <h2>Similar Results</h2>
                <MovieGrid>
                  {similarResults.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </MovieGrid>
              </GridContainer>
            )}
          </>
        )}
      </SearchPage>
    </Page>
  )
}



const SearchPage = styled.div`
display: flex;
flex-direction: column;
align-items: center;
gap: 3rem;
padding: 2rem;
  
`

const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 10px;
  max-width: 300px;
`
