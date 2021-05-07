import styled from '@emotion/styled'
import React, { ReactNode } from 'react'
import { useAppSelector } from '../../../redux/getStore'
import { color, font } from '../../../style'
import { HistoryCard } from '../../molecules/HistoryCard'
import { LoadingHistoryCard } from '../../molecules/HistoryCard/loading'

type Props = {
  children?: ReactNode
}

export const HistoryComponent: React.FC<Props> = () => {
  const history = useAppSelector((state) => {
    return state.app.history.data
  })

  const item = useAppSelector((state) => {
    return state.app.item.data
  })

  const waitingHistory = useAppSelector((state) => {
    return state.app.history.meta.waitingHistoryAction
  })

  const loading = new Array(6).fill(1)
  return (
    <History>
      <Label>History</Label>
      {!waitingHistory && history.length === 0 ? (
        <EmptyHistory>No Bids</EmptyHistory>
      ) : (
        <HistoryUL>
          {waitingHistory &&
            loading.map((_, i) => (
              <HistoryList key={i}>
                <LoadingHistoryCard />
              </HistoryList>
            ))}
          {history.map((log, i) => (
            <HistoryList key={i}>
              <HistoryCard log={log} networkId={item?.networkId} />
            </HistoryList>
          ))}
        </HistoryUL>
      )}
    </History>
  )
}

const History = styled.div`
  width: 426px;
  padding: 64px 0;
`

const Label = styled.div`
  ${font.lg.h3}
  margin-bottom: 16px;
`

const HistoryUL = styled.ul``

const HistoryList = styled.li`
  margin-bottom: 16px;
`
const EmptyHistory = styled.div`
  ${font.lg.subtitle2}
  color: ${color.content.gray};
`
