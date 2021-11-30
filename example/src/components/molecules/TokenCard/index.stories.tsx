import React from 'react'
import { TokenCard } from './TokenCard'

export const Base: React.VFC = () => (
  <TokenCard
    title={'test'}
    media={{
      url: 'https://via.placeholder.com/150',
      mimeType: 'image/png',
    }}
  />
)
