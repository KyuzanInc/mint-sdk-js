import styled from '@emotion/styled'
import React, { ReactNode } from 'react'
import Skeleton from 'react-loading-skeleton'
import { color, font } from '../../../style'

type Media = {
  url: string
  mimeType: string
}

type Props = {
  title?: string
  onClick: any
  media?: Media
  children?: ReactNode
}

export const Card: React.FC<Props> = ({ onClick, title, media, children }) => {
  return (
    <CardBase onClick={onClick}>
      <CardMedia>
        <MediaContent media={media} />
      </CardMedia>
      <CardContent>
        <Typography>
          {title ? (
            title
          ) : (
            <LoadingTypography>
              <Skeleton width={237} count={2} />
            </LoadingTypography>
          )}
        </Typography>
        <CardAction>{children}</CardAction>
      </CardContent>
    </CardBase>
  )
}

const MediaContent: React.FC<{ media: Media | undefined }> = ({ media }) => {
  if (!media) {
    return (
      <Skeleton
        height={220}
        width={269}
        style={{ top: 0, position: 'absolute' }}
      />
    )
  }
  const type = media.mimeType.split('/')[0]
  const src = media.url
  if (type === 'image') {
    return <Image src={src} loading="lazy" />
  }
  return (
    <Video
      src={src}
      height={'220px'}
      width={'269px'}
      autoPlay
      loop
      preload="auto"
      muted
    />
  )
}

const CardBase = styled.div`
  cursor: pointer;
  background: ${color.white};
  ${font.lg.button}
  height: 382px;
  width: 269px;
  line-height: 44px;
  color: ${color.white};
  padding: 0px 0px 24px;
  box-shadow: 0px 9px 16px rgba(0, 0, 0, 0.04),
    0px 2.01027px 3.57381px rgba(0, 0, 0, 0.0238443),
    0px 0.598509px 1.06402px rgba(0, 0, 0, 0.0161557);
  border-radius: 12px;
`
const CardMedia = styled(CardBase)`
  border-radius: 12px 12px 0 0;
  background: ${color.white};
  height: 220px;
  width: 100%;
  position: relative;
`

const CardContent = styled.div`
  background: ${color.white};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 16px 24px 16px;
  border-radius: 0 0 12px 12px;
`
const Typography = styled.div`
  background: ${color.white};
  width: 100%;
  ${font.lg.subtitle1}
  display: flex;
  color: ${color.content.dark};
  padding-bottom: 32px;
  align-items: center;
`

const LoadingTypography = styled.div`
  display: flex;
`

const CardAction = styled.div`
  background: ${color.white};
  height: 52px;
  width: 100%;
  ${font.lg.subtitle1}
  display: flex;
  align-items: center;
  color: ${color.content.dark};
  align-items: center;
`

const Image = styled.img`
  height: 220px;
  width: 269px;
  border-radius: 12px 12px 0 0;
`

const Video = styled.video`
  height: 220px;
  width: 269px;
  border-radius: 12px 12px 0 0;
`
