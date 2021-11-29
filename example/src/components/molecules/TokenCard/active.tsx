import React from 'react'
import { CardBase } from './base'

type Props = {
  id: string
  name: string
  media: { url: string; mimeType: string }
}

export const ActiveCard: React.FC<Props> = ({ name, id, media }) => {
  return (
    <CardBase href={`/items/${id}`} title={name} media={media}>
      <div>name</div>
    </CardBase>
  )
}
