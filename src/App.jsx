import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { HomePage } from './Pages/HomePage'
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
        <Route path="/" element="" />
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
    }

    p {
      font-weight: 300;
      line-height: 1.5;
      margin: 0;
    }
  }
`


