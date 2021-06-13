import React from 'react'
import Avatar from 'boring-avatars'

type Props = {
  name: string
  size: number
}

export const DefaultAvatarIcon: React.VFC<Props> = ({ size, name }) => {
  return (
    <Avatar
      size={size}
      name={name}
      variant="marble"
      colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
    />
  )
}
