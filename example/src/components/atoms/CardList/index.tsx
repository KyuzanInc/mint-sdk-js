import styled from '@emotion/styled'
import { color, font } from '../../../style'

export const ListComponent = styled.div`
  width: 864px;
  display: flex;
  flex-direction: column;
`
export const ListTitle = styled(ListComponent)`
  ${font.lg.h3}
  padding: 8px 0 16px 0;
  height: 48px;
  flex-direction: row;
  margin-top: 64px;
`

export const Title = styled(ListComponent)`
  ${font.lg.h3}
  margin-left: 10px;
`

export const CardList = styled.li`
  margin: 0 24px 0 0;
  float: left;
`

export const CardUL = styled.ul``

export const ActiveStatus = styled.div`
  background: ${color.active};
  width: 17px;
  height: 17px;
  border-radius: 50%;
`