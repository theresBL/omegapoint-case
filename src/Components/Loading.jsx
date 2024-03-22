import styled from 'styled-components'
import Lottie from 'react-lottie'
import loader from '../assets/loader.json'

export const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loader,
  }

  return (
    <LoadingDiv>
      <Lottie
        options={defaultOptions}
        height={200}
        width={150}
      />
    </LoadingDiv>
  )
}


const LoadingDiv = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 100vw;
`