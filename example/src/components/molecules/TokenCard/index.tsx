import React from 'react'
import { ResponseTokenERC721 } from '@kyuzan/mint-sdk-js'
import { LoadingCard } from './loading'
import { ActiveCard } from './active'
type Props =
  | {
      loading: false
      item: ResponseTokenERC721
    }
  | { loading: true }

export const TokenCard: React.VFC<Props> = (args) => {
  if (args.loading) return <LoadingCard />

  return (
    <ActiveCard
      id={args.item.id}
      media={{ url: '', mimeType: 'image/png' }}
      name={args.item.tokenURI}
    />
  )
}
