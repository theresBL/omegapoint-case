import { NavLink, Link } from 'react-router-dom'
import styled from 'styled-components'
import MovieCreationOutlinedIcon from '@mui/icons-material/MovieCreationOutlined'
import SearchIcon from '@mui/icons-material/Search'

export const Header = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <IconWrapper>
          <Link
            type="button"
            to="/"
          >
            <MovieCreationOutlinedIcon
              style={{
                color: '#fff'
              }}
              alt="Home button"
            />
          </Link>
        </IconWrapper>
        <LinksWrapper>
          <StyledNavLink
            to="/mostRecent"
          >
            Most Recent
          </StyledNavLink>
          <StyledNavLink
            to="/topRated"
          >
            Top Rated
          </StyledNavLink>
          <StyledNavLink
            to="/search"
          >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
          </StyledNavLink>
        </LinksWrapper>
      </HeaderContent>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  background-color: rgba(51, 51, 51, 0.9);
  z-index: 100;
  width: 100%;
  height: 7rem;
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

const LinksWrapper = styled.div`
display: flex;
gap: 1rem;
align-items: center;
margin-right: 2rem;

@media (min-width: 1024px) {
    margin-right: 4rem;
    gap: 3rem;
  }
`

const StyledNavLink = styled(NavLink)`
  color: #fff;
  text-decoration: none;

  &:hover {
    filter: brightness(50%);
  }

  &.active {
    text-decoration: underline;
  }
`

const SearchIconWrapper = styled.div`
 display: flex;

 @media (min-width: 1024px) {
  svg {
    font-size: 2.5rem;
  }
  }
`