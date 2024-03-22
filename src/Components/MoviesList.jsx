/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { Loading } from './Loading'

const MovieCard = ({ movie }) => {
  const posterUrl = `https://image.tmdb.org/t/p/original${movie.poster_path}`
  const [hovered, setHovered] = useState(false)


  return (
    <StyledMovieCard
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`/movieDetails/${movie.id}`}>
        <CardContent>
          <Poster src={posterUrl} alt={movie.title} />
          {hovered && <StyledInfoIcon style={{ fontSize: '5rem' }} />}
        </CardContent>
      </Link>
    </StyledMovieCard>
  )
}

export const MoviesList = () => {
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
  )
}

const StyledMovieCard = styled.div`
  position: relative;
  z-index: 0;
  height: auto;
  transition: filter 0.3s ease;
  filter: brightness(80%);
  
  &:hover {
    transform: scale(1.1);
    z-index: 1; 
    filter: brightness(100%);
  }
`

const CardContent = styled.div`
`

const Poster = styled.img`
max-width: 100%;
  
`

const StyledInfoIcon = styled(InfoOutlinedIcon)`
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease;
  

    ${StyledMovieCard}:hover & {
    opacity: 0.8;
  }
`

const GridContainer = styled.div`
  display: grid;
  width: 100vw;
  
`

const MovieGrid = styled.div`
  display: grid;
  /* grid-template-columns: 45% 45%;
  grid-template-rows: auto; */
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  width: 100%;
  justify-content: center;

  @media (min-width: 320px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
`
