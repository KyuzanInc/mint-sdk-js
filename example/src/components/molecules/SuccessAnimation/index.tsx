import styled from '@emotion/styled'
import React from 'react'
import { color } from '../../../style'
import { SuccessAnimation } from './SuccessAnimation'

export const IconAnimation: React.VFC = () => {
  return (
    <Container>
      <SuccessAnimation />
    </Container>
  )
}

const Container = styled.div`
  height: 400px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  background: ${color.white};
  box-shadow: 0px 9px 16px rgba(0, 0, 0, 0.04),
    0px 2.01027px 3.57381px rgba(0, 0, 0, 0.0238443),
    0px 0.598509px 1.06402px rgba(0, 0, 0, 0.0161557);
  border-radius: 8px;
`
