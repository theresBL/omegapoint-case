/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { Loading } from '../Components/Loading'
import { Page } from '../Components/ReusableStyles/Page'
import { GridContainer, MovieGrid } from '../Components/ReusableStyles/GridContainer'
import { MovieCard } from '../Components/ReusableStyles/MovieCard'

export const MostRecentMovies = () => {
  const [movieList, setMovieList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        setLoading(true)
        const response = await fetch(import.meta.env.VITE_API_URL)
        const data = await response.json()
        setMovieList(data.results)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching movies:', error)
        setLoading(false)
      }
    }

    fetchAllMovies()
  }, [])


  return (
    <Page>
      <h2>Most recent movies</h2>
      <GridContainer>
        {loading ? (
          <Loading />
        ) : (
          <MovieGrid>
            {movieList.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </MovieGrid>
        )}
      </GridContainer>
    </Page>
  )
}