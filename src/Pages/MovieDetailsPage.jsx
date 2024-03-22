import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { Loading } from '../Components/Loading'

const MOVIEDETAILS_URL = (movie_id) => `${import.meta.env.VITE_BASE_MOVIEDETAILS_URL}/${movie_id}?api_key=${import.meta.env.VITE_API_KEY}`


//Skapa error handling

export const MovieDetailsPage = () => {
  const [movieDetails, setMovieDetails] = useState(null)
  const { movieId } = useParams()

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(MOVIEDETAILS_URL(movieId))
        const data = await response.json()
        setMovieDetails(data)
      } catch (error) {
        console.error('Error fetching movie details:', error)
      }
    }
    fetchMovieDetails()
  }, [movieId])

  const handleCloseClick = () => {
    window.location.href = "/"
  }



  return (
    <DetailsPage>
      {movieDetails ? (
        <div>
          <TopSection>
            <CloseButton type="button" onClick={handleCloseClick}><CloseOutlinedIcon /></CloseButton>
            <BackdropImage src={`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path} `} alt={`${movieDetails.title} image`} />
          </TopSection>
          <AllDetailsDiv>
            <h1>{movieDetails.title}</h1>
            <MovieInformation>
              <MarkedRating>{Math.round(movieDetails.vote_average)} / 10 </MarkedRating>
              <p>{movieDetails.release_date.split('-')[0]}</p>
              <p>{movieDetails.runtime} min</p>
            </MovieInformation>
            <p>{movieDetails.overview}</p>
            <GenreDiv>
              <p>Genres:</p>
              <GenreList>
                {movieDetails.genres.map((genre, index) => (
                  <React.Fragment key={genre.id}>
                    <GenreItem>{genre.name}
                      {index !== movieDetails.genres.length - 1 && <span>,</span>}
                    </GenreItem>
                  </React.Fragment>
                ))}
              </GenreList>
            </GenreDiv>
          </AllDetailsDiv>
        </div>
      ) : (
        <Loading />
      )}
    </DetailsPage>
  )
}

const DetailsPage = styled.div`
h1{
  font-size: 1.5rem;
}
`

const TopSection = styled.div`
  display: flex;
  position: relative;
`

const BackdropImage = styled.img`
  width: 100vw;
`

const CloseButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  border-radius: 50%;
  color: white;
  background-color: rgba(51, 51, 51, 0.7);
  padding: 8px;
  display: flex;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: rgba(51, 51, 51, 0.3)
  }
`

const AllDetailsDiv = styled.div`
display: flex;
flex-direction: column;
padding: 0 1rem;
gap: 1rem;
margin-top: 1rem;
`

const MovieInformation = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const MarkedRating = styled.mark`
  color: white;
  background-color: green;
  padding: 0 4px;
`

const GenreDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: grey;
  font-size: 12px;
`

const GenreList = styled.ul`
list-style: none;
display: flex;
gap: 5px;
padding: 0;
flex-wrap: wrap;
`

const GenreItem = styled.li`
  display: flex;
  flex-direction: row;
`