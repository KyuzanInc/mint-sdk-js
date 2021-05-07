import styled from '@emotion/styled'
import Link from 'next/link'
import React, { ReactNode } from 'react'
import Skeleton from 'react-loading-skeleton'
import { color, font } from '../../../style'
import { MediaContent } from '../../atoms/MediaContent'
import { Tag } from '../../atoms/Tag'

export type Media = {
  url: string
  mimeType: string
}

type Props = {
  title?: string
  href: string
  media?: Media
  withPhysicalProduct?: boolean
  children?: ReactNode
}

export const Card: React.FC<Props> = ({
  href,
  title,
  media,
  children,
  withPhysicalProduct,
}) => {
  return (
    <Link href={href}>
      <CardBase>
        <CardMedia>
          <MediaContent height={220} width={264} media={media} />
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
          {withPhysicalProduct && <Tag>フィジカルアイテムつき</Tag>}
          <CardAction>{children}</CardAction>
        </CardContent>
      </CardBase>
    </Link>
  )
}

const CardBase = styled.div`
  cursor: pointer;
  background: ${color.white};
  ${font.lg.button}
  height: 382px;
  width: 264px;
  line-height: 44px;
  color: ${color.white};
  padding: 0;
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
  height: 162px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 16px 16px 24px 16px;
  border-radius: 0 0 12px 12px;
`
const Typography = styled.div`
  background: ${color.white};
  width: 100%;
  height: 2.6em;
  ${font.lg.subtitle1}
  color: ${color.content.dark};
  align-items: baseline;
  overflow: hidden;
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
