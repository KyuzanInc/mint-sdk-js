import styled from '@emotion/styled'
import Link from 'next/link'
import React, { ReactNode } from 'react'
import Skeleton from 'react-loading-skeleton'
import { color, font, media, curve } from '../../../style'
import { MediaContent } from '../../atoms/MediaContent'
import { Tag } from '../../atoms/Tag'

export type Media = {
  url: string
  mimeType: string
}

type Props = {
  title?: string
  totalStockNum?: number
  availableStockNum?: number
  href: string
  media?: Media
  withPhysicalProduct?: boolean
  children?: ReactNode
}

export const CardBase: React.FC<Props> = ({
  href,
  title,
  media,
  children,
  withPhysicalProduct,
  availableStockNum,
  totalStockNum,
}) => {
  return (
    <Link href={href}>
      <Container>
        <CardMedia>
          <MediaContent height={220} media={media} />
        </CardMedia>
        <CardContent>
          <Typography>
            {title ? (
              `${title} （${availableStockNum}/${totalStockNum}）`
            ) : (
              <LoadingTypography>
                <Skeleton width={237} count={2} />
              </LoadingTypography>
            )}
          </Typography>
          <TagWrap>
            {withPhysicalProduct && (
              <Tag
                label={'フィジカルアイテムつき'}
                iconPath={'/images/cardboard.svg'}
              ></Tag>
            )}
          </TagWrap>
          <CardAction>{children}</CardAction>
        </CardContent>
      </Container>
    </Link>
  )
}

const cardMediaHeight = '220px'

const CardMedia = styled.div`
  background: transparent;
  height: ${cardMediaHeight};
  width: 100%;
  margin: auto;
  ${curve.fade}
  ${media.sp`
    height:fit-content;
  `}
`
const Container = styled.div`
  cursor: pointer;
  ${font.mont.button}
  /* height: 392px; */
  height:100%;
  line-height: 0px;
  /* color: ${color.white}; */
  padding: 0;
  box-shadow: 0px 9px 16px rgba(0, 0, 0, 0.04),
    0px 2.01027px 3.57381px rgba(0, 0, 0, 0.0238443),
    0px 0.598509px 1.06402px rgba(0, 0, 0, 0.0161557);
  border-radius: 12px;
  overflow: hidden;
  ${curve.fade}

  &:hover {
    box-shadow: 0px 22px 43px rgba(0, 0, 0, 0.08),
      0px 4.91399px 9.60461px rgba(0, 0, 0, 0.0476886),
      0px 1.46302px 2.85954px rgba(0, 0, 0, 0.0323114);
  }
  &:active {
    box-shadow: 0px 9px 16px rgba(0, 0, 0, 0.04),
      0px 2.01027px 3.57381px rgba(0, 0, 0, 0.0238443),
      0px 0.598509px 1.06402px rgba(0, 0, 0, 0.0161557);
  }
  ${media.lg`
    max-width: 264px;
  `}
  ${media.mdsp`
    /* height: auto; */
    width: auto;
  `}
  ${media.sp`
    height:auto;
  `}
`

const CardContent = styled.div`
  /* background: ${color.white}; */
  width: 100%;
  height: calc(100% - ${cardMediaHeight});
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px 16px 24px 16px;
  border-radius: 0 0 12px 12px;
`
const Typography = styled.div`
  /* background: ${color.white}; */
  /* margin:0 0 8px 0; */
  width: 100%;
  ${font.mont.body1}
  color: ${color.content.dark};
  text-align: left;
  /* 3点リーダー */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`

const LoadingTypography = styled.div`
  display: flex;
`
const TagWrap = styled.div`
  margin: 8px 0 16px 0;
`

const CardAction = styled.div`
  /* background: ${color.white}; */
  height: 52px;
  width: 100%;
  ${font.mont.subtitle1}
  display: flex;
  align-items: center;
  color: ${color.content.dark};
  /* align-items: center; */
`
