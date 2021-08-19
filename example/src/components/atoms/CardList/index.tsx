import styled from '@emotion/styled'
import { color, font, media } from '../../../style'

export const ListComponent = styled.div`
  max-width: 840px;
  display: flex;
  flex-direction: column;
  ${media.mdsp`
    width:100%;
  `}
`
export const ListTitle = styled(ListComponent)`
  ${font.mont.h3}
  padding: 8px 0 16px 0;
  height: 48px;
  flex-direction: row;
  align-items: center;
`

export const Title = styled(ListComponent)`
  ${font.mont.h3}
  margin-left: 10px;
`

export const EmptyTitle = styled(ListComponent)`
  ${font.mont.h3}
  color: ${color.content.gray1};
  margin-left: 10px;
  padding: 32px 0;
`

export const CardList = styled.li`
  /* margin: 0 16px 24px 0; */
  /* float: left; */
`

export const CardUL = styled.ul`
  width:100%;
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fit, minmax(264px, 1fr));
  margin: 0 0 64px 0;
  ${media.mdsp`
    width:100%;
    grid-template-columns: 1fr;
  `}
`

export const ActiveStatus = styled.div`
  background: ${color.active};
  width: 17px;
  height: 17px;
  border-radius: 50%;
`
