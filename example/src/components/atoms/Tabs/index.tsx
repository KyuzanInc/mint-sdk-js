import styled from '@emotion/styled'
import React from 'react'
import { color, font, media } from '../../../style'

type Props = {
  items: { value: string; label: string }[]
  value: string
  onChange?: (value: string) => void
}

export const Tabs: React.VFC<Props> = ({ items, value, onChange }) => {
  return (
    <Container>
      {items.map((item) => (
        <Tab
          key={item.value}
          active={value === item.value}
          onClick={() => onChange && onChange(item.value)}
        >
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
  background-color: ${color.content.gray2};
  display: flex;
  width: 100%;
  ${media.lg`
    max-width:600px;
  `}
`

const Tab = styled.div<{ active: boolean }>`
  cursor: pointer;
  height: 43px;
  min-width: 100px;
  flex-grow: 1;
  border-radius: 22px;
  background-color: ${({ active }) =>
    active ? color.white : color.content.gray2};
  box-shadow: ${({ active }) =>
    active
      ? '0px 9px 8px rgba(0, 0, 0, 0.04), 0px 0px 4px rgba(0, 0, 0, 0.06), 0px 0px 2px rgba(0, 0, 0, 0.12);'
      : ''};
  display: flex;
  align-items: center;
  justify-content: center;
`

const TabText = styled.span<{ active: boolean }>`
  ${font.mont.subtitle2};
  color: ${({ active }) => (active ? color.primary : color.content.gray1)};
  ${media.sp`
    ${font.mont.label};
  `}
`
