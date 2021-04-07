import styled from '@emotion/styled'
import Image from 'next/image'
import React, { ReactNode } from 'react'
import Skeleton from 'react-loading-skeleton'
import { color, font } from '../../../style'

type Props = {
  title?: string
  onClick: any
  image?: string
  children?: ReactNode
}

export const Card: React.FC<Props> = ({ onClick, title, image, children }) => {
  return (
    <CardBase onClick={onClick}>
      <CardMedia>
        {image ? (
          <Image src={'/images/shoes.png'} layout={'fill'} />
        ) : (
          <Skeleton
            height={220}
            width={269}
            style={{ top: 0, position: 'absolute' }}
          />
        )}
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

const CardBase = styled.div`
  cursor: pointer;
  background: ${color.white};
  ${font.lg.button}
  height: 382px;
  width: 269px;
  line-height: 44px;
  border-radius: 22px;
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
