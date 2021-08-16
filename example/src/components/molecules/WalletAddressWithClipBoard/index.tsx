import styled from '@emotion/styled'
import React, { useCallback, useState } from 'react'
import copy from 'clipboard-copy'
import Image from 'next/image'
import { color, font } from '../../../style'

type Props = {
  walletAddress: string
  className?: string
  showAddressLength?: number
  color?: string
  fontSize?: number
}

export const WalletAddressWithClipBoard: React.VFC<Props> = ({
  walletAddress,
  className,
  showAddressLength,
  color,
  fontSize,
}) => {
  const [showCheck, setShowCheck] = useState(false)
  const clickCopy = useCallback(() => {
    copy(walletAddress)
    setShowCheck(true)
    setTimeout(() => {
      setShowCheck(false)
    }, 5000)
  }, [walletAddress])
  return (
    <WalletAddressContainer className={className}>
      <WalletAddress
        fontColor={color}
        fontSize={fontSize}
      >{`${walletAddress.slice(0, showAddressLength ?? 8)}...`}</WalletAddress>
      <CopyIcon onClick={clickCopy}>
        {showCheck ? (
          <Image
            src={'/images/icons/check.svg'}
            layout={'fixed'}
            width={24}
            height={24}
          />
        ) : (
          <Image
            src={'/images/icons/clipboard.svg'}
            layout={'fixed'}
            width={24}
            height={24}
          />
        )}
      </CopyIcon>
    </WalletAddressContainer>
  )
}

const WalletAddressContainer = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const WalletAddress = styled.div<{ fontColor?: string; fontSize?: number }>`
  ${font.lg.subtitle1}
  color: ${({ fontColor }) => fontColor ?? color.content.gray1};
  font-size: ${({ fontSize }) => `${fontSize}px` ?? '20px'};
`

const CopyIcon = styled.div`
  margin-left: 8px;
  cursor: pointer;
`
