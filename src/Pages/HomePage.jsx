import { MoviesList } from '../Components/MoviesList'
import styled from 'styled-components'

export const HomePage = () => {
  return (
    <HomePageContainer>
      <h2>Recent releases</h2>
      <MoviesList />
    </HomePageContainer>
  )
}

const HomePageContainer = styled.div`
display: flex;
width: 100vw;
flex-direction: column;
gap: 0.5rem;
  
`