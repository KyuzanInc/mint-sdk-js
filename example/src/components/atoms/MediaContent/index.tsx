import styled from '@emotion/styled'
import React from 'react'
import Skeleton from 'react-loading-skeleton'

type Props = {
  width: number
  height: number
  media:
    | {
        url: string
        mimeType: string
      }
    | undefined
}

export const MediaContent: React.VFC<Props> = ({ media, height, width }) => {
  if (!media) {
    return (
      <Skeleton
        height={height}
        width={width}
        style={{ top: 0, position: 'absolute' }}
      />
    )
  }
  const type = media.mimeType.split('/')[0]
  const src = media.url
  if (type === 'image') {
    return <Image src={src} loading="lazy" height={height} width={width} />
  }
  return (
    <Video
      src={src}
      height={height}
      width={width}
      autoPlay
      loop
      preload="auto"
      muted
    />
  )
}

const Image = styled.img<{ width: number; height: number }>`
  height: ${({ height }) => `${height}px`};
  width: ${({ width }) => `${width}px`};
  object-fit: cover;
`

const Video = styled.video<{ width: number; height: number }>`
  height: ${({ height }) => `${height}px`};
  width: ${({ width }) => `${width}px`};
  object-fit: cover;
`
