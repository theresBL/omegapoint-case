import { useState, useEffect } from 'react'
import { Loading } from '../Components/Loading'
import { Page } from '../Components/ReusableStyles/Page'
import { GridContainer, MovieGrid } from '../Components/ReusableStyles/GridContainer'
import { MovieCard } from '../Components/ReusableStyles/MovieCard'


export const TopRatedMovies = () => {
  const [movieList, setMovieList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        setLoading(true)
        const response = await fetch(import.meta.env.VITE_TOP_RATED_MOVIE_URL)
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
      <GridContainer>
        <h2>Top rated movies</h2>
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