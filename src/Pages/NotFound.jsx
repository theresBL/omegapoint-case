import styled from 'styled-components'
import Lottie from 'react-lottie'
import broken from '../assets/broken.json'

export const NotFound = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: broken,
  }

  const returnToHomeClick = () => {
    window.location.href = "/"
  }


  return (
    <NotFoundPage>
      <h3>Oops, something went wrong...</h3>
      <Lottie
        options={defaultOptions}
        height={200}
        width={150}
      />
      <button
        type="button"
        onClick={returnToHomeClick}>
        Return to home
      </button>
    </NotFoundPage>
  )
}


const NotFoundPage = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
width: 100vw;
`