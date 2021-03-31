import styled from '@emotion/styled'
import React from 'react'
import { EndedAuctionList } from '../components/organisms/EndedAuctionList'
import { LiveAuctionList } from '../components/organisms/LiveAuctionList'
import { color } from '../style'

const Page = () => {
  return (
  <Container>
    <InnerContainer>
      <LiveAuctionList />
      <EndedAuctionList />
    </InnerContainer>
  </Container>)
}

export default Page

const Container = styled.div`
  background:  ${color.background.bague};
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 72px;
`

const InnerContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 0px 0px 0 300px;
`
