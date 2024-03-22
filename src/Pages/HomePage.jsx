import styled from 'styled-components'
import { Page } from '../Components/ReusableStyles/Page'
import { Loading } from '../Components/Loading'

export const HomePage = () => {
  return (
    <Page>
      <HomePageContainer>
        <h1>Home Page</h1>
        <Loading />
      </HomePageContainer>
    </Page>
  )
}

const HomePageContainer = styled.div`
display: flex;
width: 100vw;
flex-direction: column;
gap: 0.5rem;
  
`