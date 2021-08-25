import React from 'react'
import { actions } from '@storybook/addon-actions'
import { SaleActionModal } from '.'
import { addDays } from 'date-fns'

const eventsFromObject = actions({
  closeModal: 'clicked',
  onChangeInput: 'hovered',
  doBuy: 'doBuy',
  doBid: 'doBid',
  addCalender: 'calender',
})

export const AutoExtensionAuction: React.VFC = () => (
  <SaleActionModal
    itemName={'BASIC'}
    itemTradeType={'autoExtensionAuction'}
    endAt={addDays(new Date(), 10)}
    price={21.1}
    media={{
      url: 'https://place-hold.it/350x150',
      mimeType: 'image/png',
    }}
    minBidPrice={1}
    walletBalance={'2'}
    isOpen={true}
    loading={false}
    unit={'ETH'}
    bidPrice={'1'}
    {...eventsFromObject}
  />
)

export const FixedPrice: React.VFC = () => (
  <SaleActionModal
    itemName={'BASIC'}
    itemTradeType={'fixedPrice'}
    endAt={addDays(new Date(), 10)}
    price={21.1}
    media={{
      url: 'https://place-hold.it/350x150',
      mimeType: 'image/png',
    }}
    minBidPrice={1}
    walletBalance={'2'}
    isOpen={true}
    loading={false}
    unit={'ETH'}
    bidPrice={'1'}
    {...eventsFromObject}
  />
)

export const ValidationError: React.VFC = () => (
  <SaleActionModal
    itemName={'BASIC'}
    itemTradeType={'autoExtensionAuction'}
    endAt={addDays(new Date(), 10)}
    price={21.1}
    media={{
      url: 'https://place-hold.it/350x150',
      mimeType: 'image/png',
    }}
    minBidPrice={1}
    walletBalance={'2'}
    isOpen={true}
    loading={false}
    unit={'ETH'}
    bidPrice={'0.2'}
    isValidationError={true}
    errorText={'1ETH以上の価格を入力してください'}
    {...eventsFromObject}
  />
)

export default {
  title: 'molecules/SaleActionModal',
}
