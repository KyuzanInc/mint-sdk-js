import React from 'react'
import { Token } from '@kyuzan/annapurna-sdk-js'
import styled from '@emotion/styled'

export const OwnItem: React.FC<{
  item: Token
}> = ({ item }) => {
  return (
    <Container>
      <img src={item.imageURI} />
      <p>{item.name}</p>
    </Container>
  )
}

const Container = styled.div`
  width: 300px;
  margin: 0 32px;

  img {
    width: 100%;
    height: auto;
  }
`
