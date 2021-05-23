import styled from '@emotion/styled'
import React from 'react'
import Skeleton from 'react-loading-skeleton'

type Props = {
  width: number
  height: number
  waitingItem?: boolean
  media:
    | {
        url: string
        mimeType: string
      }
    | undefined
}

export const MediaContent: React.VFC<Props> = ({ waitingItem, media, height }) => {
  if (!media || waitingItem) {
    return (
      <Skeleton height={height} />
    )
  }
  const type = media.mimeType.split('/')[0]
  const src = media.url
  if (type === 'image') {
    return <Image src={src} loading="lazy" height={height} />
  }
  return (
    <Video
      src={src}
      height={height}
      autoPlay
      loop
      preload="auto"
      muted
    />
  )
}

const Image = styled.img<{ height: number }>`
  height: ${({ height }) => `${height}px`};
  width: 100%;
  object-fit: cover;
`

const Video = styled.video<{ height: number }>`
  height: ${({ height }) => `${height}px`};
  width: 100%;
  object-fit: cover;
`
