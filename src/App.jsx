import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { HomePage } from './Pages/HomePage'
import { MostRecentMovies } from './Pages/MostRecentMovies'
import { TopRatedMovies } from './Pages/TopRatedMovies'
import { MovieSearch } from './Pages/MovieSearch'
import { NotFound } from './Pages/NotFound'
import { MovieDetailsPage } from './Pages/MovieDetailsPage'
import { Header } from './Components/Header'
import { createGlobalStyle } from 'styled-components'

export const App = () => {

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mostRecent" element={<MostRecentMovies />} />
        <Route path="/topRated" element={<TopRatedMovies />} />
        <Route path="/search" element={<MovieSearch />} />
        <Route path="/movieDetails/:movieId" element={<MovieDetailsPage />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </BrowserRouter>
  )
}

const GlobalStyle = createGlobalStyle`
  body {
    background: #333;
    color: #fff;
    font-family: "Roboto Flex", sans-serif;

    h1, h2 {
      font-weight: 500;
      margin: 0;
      font-size: 1.5rem;
    }

    h2 {
      @media (min-width: 1024px) {
        font-size: 3rem;
      }
    }

    h1 {
      @media (min-width: 1024px) {
        font-size: 3rem;
      }
    }

    p, a {
      font-weight: 300;
      line-height: 1.5;
      margin: 0;

      @media (min-width: 1024px) {
        font-size: 2rem;
      }
    }
  }

  li {
    @media (min-width: 1024px) {
        font-size: 2rem;
      }
  }
`


