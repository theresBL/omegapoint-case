import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Loading } from '../Components/Loading'


export const HomePage = () => {
  const [mostRecentMovie, setMostRecentMovie] = useState(null)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const fetchMostRecentMovie = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_API_URL)
        const data = await response.json()

        // Sort the movie list based on release date in descending order
        data.results.sort((a, b) => new Date(b.release_date) - new Date(a.release_date))

        // Extract the most recent movie (first element of the sorted array)
        const mostRecent = data.results[0]
        setMostRecentMovie(mostRecent)
        setLoading(false)
        console.log(mostRecent)
      } catch (error) {
        console.error('Error fetching most recent movie:', error)
        setLoading(false)
      }
    }

    fetchMostRecentMovie()
  }, [])


  return (
    <HomePageContainer>
      {loading ? (
        <Loading />
      ) : mostRecentMovie ? (
        <div>
          <PosterImage src={`https://image.tmdb.org/t/p/original${mostRecentMovie.poster_path}`} alt={mostRecentMovie.title} />
          <HomeImage src={`https://image.tmdb.org/t/p/original${mostRecentMovie.backdrop_path}`} alt={mostRecentMovie.title} />
          <div>
            <HomeTitle>{mostRecentMovie.title}</HomeTitle>
            <DetailsButton> <Link to={`/movieDetails/${mostRecentMovie.id}`}>View details</Link></DetailsButton>
          </div>
        </div>
      ) : (
        <div>
          <h2>No movies found</h2>
        </div>
      )}
    </HomePageContainer>
  )
}

const HomePageContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100vw;
  flex-direction: column;
  gap: 0.5rem;
`

const HomeTitle = styled.h1`
  color: #fff;
  position: absolute;
  z-index: 11;
  top: 85%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (min-width: 1024px) {
    top: 30%;
    right: 10%;
    transform: unset;
    font-size: 5rem;
  }
`

const PosterImage = styled.img`
  height: 50%;
  position: absolute;
  z-index: 10;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (min-width: 1024px) {
    left: 20%;
  }
  
`

const HomeImage = styled.img`
  width: 100vw;
  height: 100vh;
  object-fit: center;
  position: relative;
  z-index: 0;
  filter: brightness(70%);
`

const DetailsButton = styled.button`
  background-color: red;

  border: none;
  border-radius: 20px;
  padding: 8px 10px;
  font-size: 16px;
  position: absolute;
  top: 50%;
  left: 70%;
  z-index: 11;
  transform: translate(-50%, -50%);

  &:hover {
    filter: brightness(50%);
  }

  a {
    color: white;
    text-decoration: none;
  }

  @media (min-width: 900px) {
    left: 65%;
  }

  @media (min-width: 1024px) {
    font-size: 2rem;
    left: 30%;
  }
`
