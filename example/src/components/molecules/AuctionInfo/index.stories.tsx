import styled from '@emotion/styled'
import { action } from '@storybook/addon-actions'
import { addDays, subDays } from 'date-fns'
import React from 'react'
import { AuctionInfo } from '.'

export const Live: React.VFC = () => (
  <Container>
    <AuctionInfo
      tradeType={'auction'}
      startAt={new Date()}
      endAt={addDays(new Date(), 10)}
      networkId={1}
      initialPrice={1}
      currentPrice={21.1}
      onComplete={action('onComplete')}
    />
  </Container>
)

export const LivePolygon: React.VFC = () => (
  <Container>
    <AuctionInfo
      tradeType={'auction'}
      startAt={new Date()}
      endAt={addDays(new Date(), 10)}
      networkId={137}
      initialPrice={1}
      currentPrice={21.1}
      onComplete={action('onComplete')}
    />
  </Container>
)

export const End: React.VFC = () => (
  <Container>
    <AuctionInfo
      tradeType={'auction'}
      startAt={new Date()}
      endAt={subDays(new Date(), 10)}
      networkId={1}
      initialPrice={1}
      currentPrice={21.1}
      onComplete={action('onComplete')}
    />
  </Container>
)

export default {
  title: 'molecules/AuctionInfo',
}

const Container = styled.div`
  width: 264px;
  padding: 0 16px;
`
