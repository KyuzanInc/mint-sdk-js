import styled from '@emotion/styled'
import Image from 'next/image'
import React from 'react'
import { color, font } from '../../../style'

type Props = {
  label: string
  iconPath?: string
  disabled?: boolean
  className?: string
  onClick?: () => any
}

export const SimpleButton: React.FC<Props> = ({
  label,
  onClick,
  iconPath,
  className,
  disabled,
}) => {
  if (disabled) {
    return (
      <Disabled onClick={onClick} className={className} disabled>
        {label}
      </Disabled>
    )
  }
  return (
    <Button onClick={onClick} className={className}>
      {iconPath && (
        <IconContainer>
          <Image src={iconPath} layout={'fixed'} width={24} height={24} />
        </IconContainer>
      )}
      {label}
    </Button>
  )
}

const ButtonBase = styled.button`
  cursor: pointer;
  ${font.mont.button}
  height: 44px;
  line-height: 44px;
  border-radius: 22px;
  background-color: ${color.white};
  border: 0.5px solid ${color.primary};
  color: ${color.primary};
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 32px;
`

const Button = styled(ButtonBase)`
  background-color: ${color.white};
`

const Disabled = styled(ButtonBase)`
  background-color: ${color.content.superLight};
  color: ${color.content.middle};
  cursor: not-allowed;
`

const IconContainer = styled.div`
  padding-right: 8px;
  display: flex;
`
