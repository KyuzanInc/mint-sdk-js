import styled from '@emotion/styled'
import { action } from '@storybook/addon-actions'
import { addDays, subDays } from 'date-fns'
import React from 'react'
import { SaleInfo } from '.'

export const AuctionLive: React.VFC = () => (
  <Container>
    <SaleInfo
      tradeType={'autoExtensionAuction'}
      startAt={subDays(new Date(), 1)}
      endAt={addDays(new Date(), 10)}
      networkId={1}
      price={1}
      hasBought={false}
      onComplete={action('onComplete')}
    />
  </Container>
)

export const AuctionLivePolygon: React.VFC = () => (
  <Container>
    <SaleInfo
      tradeType={'autoExtensionAuction'}
      startAt={subDays(new Date(), 1)}
      endAt={addDays(new Date(), 10)}
      networkId={137}
      price={1}
      hasBought={false}
      onComplete={action('onComplete')}
    />
  </Container>
)

export const AuctionEnd: React.VFC = () => (
  <Container>
    <SaleInfo
      tradeType={'autoExtensionAuction'}
      startAt={new Date()}
      endAt={subDays(new Date(), 10)}
      networkId={1}
      price={1}
      hasBought={false}
      onComplete={action('onComplete')}
    />
  </Container>
)

export const FixedPriceOnSale: React.VFC = () => (
  <Container>
    <SaleInfo
      tradeType={'fixedPrice'}
      startAt={subDays(new Date(), 1)}
      endAt={addDays(new Date(), 10)}
      price={1}
      hasBought={false}
      onComplete={action('onComplete')}
    />
  </Container>
)

export const FixedPriceBought: React.VFC = () => (
  <Container>
    <SaleInfo
      tradeType={'fixedPrice'}
      startAt={subDays(new Date(), 1)}
      endAt={addDays(new Date(), 10)}
      networkId={1}
      price={1}
      onComplete={action('onComplete')}
      hasBought={true}
    />
  </Container>
)

export const FixedPriceBefore: React.VFC = () => (
  <Container>
    <SaleInfo
      tradeType={'fixedPrice'}
      startAt={subDays(new Date(), 2)}
      endAt={subDays(new Date(), 1)}
      networkId={1}
      price={1}
      hasBought={false}
      onComplete={action('onComplete')}
    />
  </Container>
)

export default {
  title: 'molecules/SaleInfo',
}

const Container = styled.div`
  width: 264px;
  padding: 0 16px;
`
