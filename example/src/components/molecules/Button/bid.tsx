import styled from '@emotion/styled'
import React from 'react'
import { color, font } from '../../../style'

type Props = {
  label: string
  onClick: () => any
  className?: string
}

export const BidButton: React.FC<Props> = ({ label, onClick, className }) => {
  return (
    <Primary className={className} onClick={onClick}>
      {label}
    </Primary>
  )
}

const ButtonBase = styled.div`
  cursor: pointer;
  ${font.lg.button}
  height: 44px;
  line-height: 44px;
  border-radius: 22px;
  color: ${color.white};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 32px;
`

const Primary = styled(ButtonBase)`
  background-color: ${color.primary};
  margin: 32px 0px;
`
