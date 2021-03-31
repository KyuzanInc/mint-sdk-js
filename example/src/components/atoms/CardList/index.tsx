import styled from '@emotion/styled'
import { font } from '../../../style'


export const ListComponent = styled.div`
  width: 840px;
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
  margin: 0 0 16px 16px;
  float: left;
`;

export const CardUL = styled.ul``
