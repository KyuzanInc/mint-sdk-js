import styled from '@emotion/styled'
import { color, font } from '../../../style'

export const StatusContent = styled.div`
  background: transparent;
  padding: 0px 6px 0px 8px;
`

export const StatusTitle = styled.div`
  color: ${color.content.dark};
  ${font.mont.overline}
  padding: 0 10px 0 0;
`

export const StatusValue = styled.div`
  width: 68px;
  height: 24px;
  ${font.mont.h3}
  color: ${color.content.dark};
  margin: 9px 10px 0 0px;
  display: flex;
  align-items: center;
`

export const Value = styled.div`
  width: 42px;
  height: 24px;
  display: flex;
  ${font.mont.h3}
  color: ${color.content.dark};
`

export const Unit = styled.div`
  width: 22px;
  height: 20px;
  ${font.mont.unit}
  color: ${color.content.dark};
  justify-content: center;
  align-items: center;
  display: flex;
  margin-left: 2px;
`

export const Time = styled.div`
  width: 118px;
  height: 20px;
  display: flex;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.3;
  color: ${color.content.dark};
  display: table;
`
