import { Spinner } from "looker-lens"
import * as React from "react"
import styled from "styled-components"

const LoadingContainer = styled.div`
  top: 0;
  left: 0;
  height: 100vh;
  position: absolute;
  width: 100%;
`

const SpinnerContainer = styled.div`
  left: 50%;
  position: absolute;
  top: 50%;
`

/**
 * Plain page loading feedback. Alternative to PageLoading which is prettier but seems
 * dashboard specific
 */
const PlainPageLoading: React.FC<{}> = () => (
  <LoadingContainer>
    <SpinnerContainer>
      <Spinner />
    </SpinnerContainer>
  </LoadingContainer>
)

export default PlainPageLoading
