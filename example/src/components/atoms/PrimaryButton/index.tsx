import styled from '@emotion/styled'
import Image from 'next/image'
import React from 'react'
import { color, curve, font, zIndex } from '../../../style'

type Props = {
  isLoading?: boolean
  label: string
  iconPath?: string
  disabled?: boolean
  className?: string
  onClick?: () => any
}

export const PrimaryButton: React.FC<Props> = ({
  isLoading,
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
    <Button onClick={onClick} className={className} type={'submit'}>
      {isLoading && (
        <Image
          src={'/images/spinner_white.svg'}
          width={24}
          layout={'fixed'}
          height={24}
        />
      )}
      {iconPath && (
        <IconContainer>
          <Image src={iconPath} layout={'fixed'} width={24} height={24} />
        </IconContainer>
      )}
      {label}
    </Button>
  )
}

const Button = styled.button`
  position:relative;
  overflow: hidden;
  cursor: pointer;
  ${font.mont.button}
  height: 44px;
  line-height: 44px;
  border-radius: 22px;
  background-color: ${color.primary};
  /* border: 0.5px solid ${color.primary}; */
  color: ${color.white};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 32px;
  ${curve.button}
  z-index:${zIndex.base};
  border:0px;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.12), 0px 0.893452px 1.11682px rgba(0, 0, 0, 0.0715329), 0px 0.266004px 0.332505px rgba(0, 0, 0, 0.0484671);
  &:after{
    /* Ripple */
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    display: block;
    width: 120%;
    height: 26rem;
    background: rgba(255,255,255,.08);
    border-radius: 50%;
    z-index:${zIndex.effect};
    ${curve.ripple}
  }
  &:hover{
    box-shadow: 0px 9px 12px rgba(0, 0, 0, 0.2), 0px 2.01027px 2.68036px rgba(0, 0, 0, 0.119221), 0px 0.598509px 0.798012px rgba(0, 0, 0, 0.0807786);
    
    &:after{
      /* transform: translate(-50%, -50%) scale(1); */
    }
  }
`

const Disabled = styled(Button)`
  background-color: ${color.content.superLight};
  color: ${color.content.light};
  cursor: not-allowed;
  border: 0px;
  width: 100%;
  &:after{
    display: none;
  }
  
`

const IconContainer = styled.div`
  padding-right: 8px;
  display: flex;
`
