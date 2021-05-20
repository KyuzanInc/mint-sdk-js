import React from 'react'
import { AuctionInfo } from '.'
import { fixtureAuctionEnd, fixtureAuctionItem } from './fixture'

export const Live: React.VFC = () => <AuctionInfo item={fixtureAuctionItem} />
export const End: React.VFC = () => <AuctionInfo item={fixtureAuctionEnd} />

export default {
  title: 'molecules/AuctionInfo',
}
