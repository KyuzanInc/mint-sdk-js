import styled from '@emotion/styled'
import React from 'react'
import { color, font } from '../../../style'

type Props = {
  items: { value: string; label: string }[]
  value: string
  onChange: (value: string) => void
}

export const Tabs: React.VFC<Props> = ({ items, value, onChange }) => {
  return (
    <Container>
      {items.map((item) => (
        <Tab active={value === item.value} onClick={() => onChange(item.value)}>
          <TabText active={value === item.value}>{item.label}</TabText>
        </Tab>
      ))}
    </Container>
  )
}

const Container = styled.div`
  width: fit-content;
  height: 43px;
  border-radius: 22px;
  background-color: ${color.content.middle};
  display: flex;
`

const Tab = styled.div<{ active: boolean }>`
  cursor: pointer;
  height: 43px;
  width: 200px;
  border-radius: 22px;
  background-color: ${({ active }) =>
    active ? color.white : color.content.middle};
  box-shadow: ${({ active }) =>
    active
      ? '0px 9px 8px rgba(0, 0, 0, 0.04), 0px 0px 4px rgba(0, 0, 0, 0.06), 0px 0px 2px rgba(0, 0, 0, 0.12);'
      : ''};
  display: flex;
  align-items: center;
  justify-content: center;
`

const TabText = styled.span<{ active: boolean }>`
  ${font.lg.button};
  color: ${({ active }) => (active ? color.primary : color.content.gray)};
`
