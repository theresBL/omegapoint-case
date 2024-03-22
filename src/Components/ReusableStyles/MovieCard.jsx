/* eslint-disable react/prop-types */
import { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'


export const MovieCard = ({ movie }) => {
  const posterUrl = `https://image.tmdb.org/t/p/original${movie.poster_path}`
  const [hovered, setHovered] = useState(false)


  return (
    <StyledMovieCard
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`/movieDetails/${movie.id}`}>
        <div>
          <Poster src={posterUrl} alt={movie.title} />
          {hovered && <StyledInfoIcon style={{ fontSize: '5rem' }} />}
        </div>
      </Link>
    </StyledMovieCard>
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