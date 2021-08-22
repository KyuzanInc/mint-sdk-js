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
  href?: string
  iconSize?: number
  isExternal?: boolean
}

export const SecondaryButton: React.FC<Props> = ({
  isLoading,
  label,
  iconPathFront,
  iconPathBack,
  className,
  href,
  disabled,
  iconSize,
  isExternal,
}) => {
  if (disabled) {
    return (
      <Disabled className={className} disabled>
        {label}
      </Disabled>
    )
  }

  return (
    <Button
      onClick={() => {
        isExternal ? window.open(href, '_blank') : window.open(href)
      }}
      className={className}
    >
      {isLoading && (
        <Image
          src={'/images/spinner_dark.svg'}
          width={24}
          layout={'fixed'}
          height={24}
        />
      )}
      {iconPathFront && (
        <IconFrontContainer>
          <Image
            src={iconPathFront}
            layout={'fixed'}
            width={iconSize ? iconSize : 24}
            height={iconSize ? iconSize : 24}
          />
        </IconFrontContainer>
      )}
      {label}
      {iconPathBack && (
        <IconBackContainer>
          <Image
            src={iconPathBack}
            layout={'fixed'}
            width={iconSize ? iconSize : 24}
            height={iconSize ? iconSize : 24}
          />
        </IconBackContainer>
      )}
    </Button>
  )
}

const Button = styled.button`
  overflow: hidden;
  position: relative;
  cursor: pointer;
  ${font.mont.button}
  height: 44px;
  width: fit-content;
  line-height: 44px;
  border-radius: 22px;
  background-color: transparent;
  border: 1px solid ${color.background.dark};
  color: ${color.content.dark};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 32px;
  ${curve.button}
  z-index:${zIndex.base};
  transform: scale(1);
  backface-visibility: hidden;
  &:hover {
    transform: scale(1.02);
  }
  &:active{
    box-shadow:none;
    transform: scale(1.0);
  }
`

const Disabled = styled(Button)`
  color: ${color.content.light};
  cursor: not-allowed;
  width: 100%;
  border: 0.5px solid ${color.content.superLight};
  transform: scale(1);
  &:hover {
    transform: scale(1);
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
