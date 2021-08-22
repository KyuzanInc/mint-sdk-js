import styled from '@emotion/styled'
import Image from 'next/image'
import React from 'react'
import { color, curve, font, zIndex } from '../../../style'

type Props = {
  isLoading?: boolean
  label: string
  iconPathFront?: string
  iconPathBack?: string
  disabled?: boolean
  className?: string
  onClick?: () => any
}

export const PrimaryButton: React.FC<Props> = ({
  isLoading,
  label,
  onClick,
  iconPathFront,
  iconPathBack,
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
      {iconPathFront && (
        <IconFrontContainer>
          <Image src={iconPathFront} layout={'fixed'} width={24} height={24} />
        </IconFrontContainer>
      )}
      {label}
      {iconPathBack && (
        <IconBackContainer>
          <Image src={iconPathBack} layout={'fixed'} width={24} height={24} />
        </IconBackContainer>
      )}
    </Button>
  )
}

const Button = styled.button`
  position: relative;
  overflow: hidden;
  cursor: pointer;
  ${font.mont.button}
  height: 44px;
  width: fit-content;
  line-height: 44px;
  border-radius: 22px;
  background-color: ${color.primary};
  /* border: 0.5px solid ${color.primary}; */
  color: ${color.white};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 32px;
  ${curve.button}
  z-index:${zIndex.base};
  border: 0px;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.12),
    0px 0.893452px 1.11682px rgba(0, 0, 0, 0.0715329),
    0px 0.266004px 0.332505px rgba(0, 0, 0, 0.0484671);
  transform: scale(1);
  backface-visibility: hidden;
  &:hover {
    box-shadow: 0px 9px 12px rgba(0, 0, 0, 0.2),
      0px 2.01027px 2.68036px rgba(0, 0, 0, 0.119221),
      0px 0.598509px 0.798012px rgba(0, 0, 0, 0.0807786);
    transform: scale(1.02);
  }
  &:active{
    box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.12),
    0px 0.893452px 1.11682px rgba(0, 0, 0, 0.0715329),
    0px 0.266004px 0.332505px rgba(0, 0, 0, 0.0484671);
    transform: scale(1.0);
  }
`

const Disabled = styled(Button)`
  background-color: ${color.content.superLight};
  color: ${color.content.light};
  cursor: not-allowed;
  border: 0px;
  width: 100%;
  box-shadow: none;
  transform: scale(1);
  &:hover {
    transform: scale(1);
    box-shadow: none;
  }
`

const IconFrontContainer = styled.div`
  padding-right: 8px;
  display: flex;
`

const IconBackContainer = styled.div`
  padding-left: 8px;
  display: flex;
`
