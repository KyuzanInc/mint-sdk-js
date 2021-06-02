import styled from '@emotion/styled'
import React from 'react'
import Image from 'next/image'
import { color, font } from '../../../style'

type Props = {
  className?: string
}

export const TwitterButton: React.VFC<Props> = ({ className }) => {
  return (
    <ButtonBase className={className}>
      <Icon>
        <Image
          width={24}
          height={24}
          layout={'fixed'}
          src={'/images/twitter_icon.svg'}
        />
      </Icon>
    </ButtonBase>
  )
}

const ButtonBase = styled.a`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 50px;
  height: 44px;
  border: 2px solid #1da1f2;
  box-sizing: border-box;
  border-radius: 22px;
  padding: 10px 13px;
`

const Icon = styled.span`
  height: 24px;
  width: 24px;
`
