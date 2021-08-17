import styled from '@emotion/styled'
import React from 'react'
import Image from 'next/image'
import { color } from '../../../style'

type Props = {
  className?: string
  imagePath: string
  href: string
  text?: string
  dataUrl?: string
}

export const IconButton: React.VFC<Props> = ({
  className,
  imagePath,
  href,
  text,
  dataUrl,
}) => {
  return (
    <ButtonBase
      className={className}
      href={href}
      data-text={text}
      data-url={dataUrl}
      target='blank'
    >
      <Icon>
        <Image width={24} height={24} layout={'fixed'} src={imagePath} />
      </Icon>
    </ButtonBase>
  )
}

const ButtonBase = styled.a`
  display: flex;
  align-items: center;
  width: fit-content;
  height: 44px;
  border: 2px solid ${color.content.gray1};
  box-sizing: border-box;
  border-radius: 22px;
  padding: 10px;
  cursor: pointer;
`

const Icon = styled.span`
  height: 24px;
  width: 24px;
`
