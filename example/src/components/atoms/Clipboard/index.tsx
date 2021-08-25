import styled from '@emotion/styled'
import React, { useCallback, useState } from 'react'
import copy from 'clipboard-copy'
import Image from 'next/image'
import { color, curve, font } from '../../../style'

type Props = {
  text?: string
  className?: string
  iconSize?: number
}

export const ClipBoard: React.VFC<Props> = ({ text, className, iconSize }) => {
  const [showCheck, setShowCheck] = useState(false)
  const clickCopy = useCallback(() => {
    copy(text ?? '')
    setShowCheck(true)
    setTimeout(() => {
      setShowCheck(false)
    }, 2000)
  }, [text])
  return (
    <Container className={className}>
      {!showCheck && (
        <CopyIcon onClick={clickCopy}>
          <Image
            src={'/images/icons/clipboard.svg'}
            layout={'fixed'}
            width={iconSize ? iconSize : 16}
            height={iconSize ? iconSize : 16}
          />
        </CopyIcon>
      )}
      {showCheck && (
        <CheckIcon>
          <ToolTip>クリックボードにコピーしました</ToolTip>
          <Image
            src={'/images/icons/check.svg'}
            layout={'fixed'}
            width={iconSize ? iconSize : 16}
            height={iconSize ? iconSize : 16}
          />
        </CheckIcon>
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const CopyIcon = styled.div`
  margin-left: 8px;
  cursor: pointer;
  opacity: 0.56;
  ${curve.button}
  &:hover {
    opacity: 0.26;
  }
  &:active {
    opacity: 0.56;
  }
`

const CheckIcon = styled.div`
  margin-left: 8px;
  cursor: pointer;
  position: relative;
`

const ToolTip = styled.div`
  background-color: ${color.background.dark};
  border-radius: 16px;
  padding: 8px 16px;
  color: ${color.white};
  ${font.mont.caption}
  position: absolute;
  width: 222px;
  height: 31px;
  top: -33px;
  right: -125px;
`
