import styled from '@emotion/styled'
import React from 'react'
import Image from 'next/image'
import { curve, media } from '../../../style'

type Props = {
  isMobile?: boolean
  onClick?: () => any
}

export const CloseButton: React.VFC<Props> = ({ isMobile, onClick }) => {
  return (
    <Icon onClick={onClick}>
      <Image
        src={'/images/close_button.svg'}
        width={isMobile ? 32 : 64}
        layout={'fixed'}
        height={isMobile ? 32 : 64}
      />
    </Icon>
  )
}

const Icon = styled.div`
  cursor: pointer;
  margin-top: 96px;
  ${media.sp`
        margin-top:16px;
    `}
  transform:scale(1);
  ${curve.button}
  &:hover {
    transform: scale(1.02);
  }
`
