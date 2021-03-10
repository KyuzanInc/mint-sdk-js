import React from 'react'
import { Token } from '@kyuzan/annapurna-sdk-js'
import styled from '@emotion/styled'
import Link from 'next/link'

export const OwnItem: React.FC<{
  item: Token
}> = ({ item }) => {
  return (
    <Container>
      <img src={`https://ipfs.io/ipfs/${i.image}`} />
      <p>{item.name}</p>
      <Link href={`/${item.tokenId}`}>アイテム詳細</Link>
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
