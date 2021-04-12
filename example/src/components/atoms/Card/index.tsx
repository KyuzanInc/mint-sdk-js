import styled from '@emotion/styled'
import { color, font } from '../../../style'

export const StatusContent = styled.div`
  background: ${color.white};
  padding: 0px 6px 0px 8px;
`

export const StatusTitle = styled.div`
  color: ${color.content.dark};
  ${font.lg.label}
  padding: 0 10px 0 0;
`

export const StatusValue = styled.div`
  width: 68px;
  height: 24px;
  ${font.lg.h3}
  color: ${color.content.dark};
  margin: 9px 10px 0 0px;
  display: flex;
`

export const Value = styled.div`
  width: 42px;
  height: 24px;
  display: flex;
  ${font.lg.h3}
  color: ${color.content.dark};
`

export const Unit = styled.div`
  width: 22px;
  height: 20px;
  ${font.lg.unit}
  color: ${color.content.dark};
  margin: 6px 0 6px 0;
`
