import styled from 'styled-components'
import MovieCreationOutlinedIcon from '@mui/icons-material/MovieCreationOutlined'
import { SearchBar } from './SearchBar'

export const Header = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <IconWrapper>
          <MovieCreationOutlinedIcon style={{ color: '#fff' }} />
        </IconWrapper>
        <SearchBarWrapper>
          <SearchBar />
        </SearchBarWrapper>
      </HeaderContent>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.div`
  display: flex;
`

const HeaderContent = styled.div`
  display: flex;
  width: 100%;
  padding: 1rem;
  align-items: center;
  justify-content: space-between;
`

const IconWrapper = styled.div`
display: flex;
align-items: center;
svg {
  font-size: 3rem;

  @media (min-width: 1024px) {
    font-size: 4rem;
  }

  @media (min-width: 1400px) {
    font-size: 5rem;
  }

  @media (min-width: 1600px) {
    font-size: 6rem;
  }
}
`

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
`