import styled from '@emotion/styled'
import Image from 'next/image'
import React from 'react'
import { color, curve, font, zIndex } from '../../../style'

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
  position:relative;
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
  ${curve.button}
  z-index:${zIndex.base};
  &:after{
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    display: block;
    width: 120%;
    height: 26rem;
    background: rgba(255,255,255,.26);
    border-radius: 50%;
    z-index:${zIndex.effect};
    ${curve.ripple}
  }
  &:hover{
    color: ${color.white};
    &:after{
      transform: translate(-50%, -50%) scale(1);
    }
  }
`

const Button = styled(ButtonBase)`
  background-color: ${color.white};
`

const Disabled = styled(ButtonBase)`
  background-color: ${color.content.superLight};
  color: ${color.content.light};
  cursor: not-allowed;
  border: 0px;
  width: 100%;
`

const IconContainer = styled.div`
  padding-right: 8px;
  display: flex;
`
