import React from 'react'
import { actions } from '@storybook/addon-actions'
import { BidModal } from '.'
import { addDays } from 'date-fns'
import { Item } from '@kyuzan/mint-sdk-js'

const eventsFromObject = actions({
  closeModal: 'clicked',
  onChangeInput: 'hovered',
  doBid: 'ded',
  addCalender: 'calender',
})

export const Basic: React.VFC = () => (
  <BidModal
    item={item}
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
    status={'bid'}
    {...eventsFromObject}
  />
)

export const LongName: React.VFC = () => (
  <BidModal
    item={longNameItem}
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
    status={'bid'}
    {...eventsFromObject}
  />
)

export const ValidationError: React.VFC = () => (
  <BidModal
    item={item}
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
    errorText={'Your bid must be at least 1 ETH'}
    status={'bid'}
    {...eventsFromObject}
  />
)

export const Success: React.VFC = () => (
  <BidModal
    item={item}
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
    errorText={'Your bid must be at least 1 ETH'}
    status={'success'}
    {...eventsFromObject}
  />
)

const item = {
  name: 'NIKE AIR JORDAN 1 MID “HYPER ROYAL',
  networkId: 4,
} as Item

const longNameItem = {
  name: 'NIKE AIR JORDAN 1 MID “HYPER ROYAL NIKE AIR JORDAN 1 MID “HYPER ROYAL',
  networkId: 4,
} as Item
export default {
  title: 'molecules/BidModal',
}
