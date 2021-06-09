import styled from '@emotion/styled'
import { color, font } from '../../../style'

export const ListComponent = styled.div`
  width: 864px;
  display: flex;
  flex-direction: column;
  aligin-items: center;
`
export const ListTitle = styled(ListComponent)`
  ${font.lg.h3}
  padding: 8px 0 16px 0;
  height: 48px;
  flex-direction: row;
  align-items: center;
`

export const Title = styled(ListComponent)`
  ${font.lg.h3}
  margin-left: 10px;
`

export const EmptyTitle = styled(ListComponent)`
  ${font.lg.h3}
  color: ${color.content.gray};
  margin-left: 10px;
  padding: 32px 0;
`

export const CardList = styled.li`
  margin: 0 24px 24px 0;
  float: left;
`

export const CardUL = styled.ul``

export const ActiveStatus = styled.div`
  background: ${color.active};
  width: 17px;
  height: 17px;
  border-radius: 50%;
`
