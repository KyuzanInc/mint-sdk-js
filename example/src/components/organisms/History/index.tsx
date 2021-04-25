import styled from '@emotion/styled'
import React, { ReactNode, useCallback, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/getStore'
import { getHistoryActionCreator } from '../../../redux/history'
import { color, font } from '../../../style'
import { HistoryCard } from '../../molecules/HistoryCard'
import { LoadingHistoryCard } from '../../molecules/HistoryCard/loading'

type Props = {
  itemId: string | string[]
  children?: ReactNode
}

export const HistoryComponent: React.FC<Props> = ({ itemId }) => {
  const dispatch = useAppDispatch()
  const historyState = useAppSelector((state) => {
    return state.app.history
  })

  const getHistory = useCallback(() => {
    if (typeof itemId === 'string') {
      dispatch(getHistoryActionCreator(itemId) as any)
    }
  }, [itemId])

  const waitingHistory = useAppSelector((state) => {
    return state.app.history.meta.waitingHistoryAction
  })

  const loading = new Array(6).fill(1)

  useEffect(() => {
    getHistory()
  }, [itemId])

  const history = historyState.data
  return (
    <History>
      <Label>History</Label>
      {!waitingHistory && history.length === 0 ? (
        <EmptyHistory>No Bids</EmptyHistory>
      ) : (
        <HistoryUL>
          {waitingHistory &&
            loading.map(() => (
              <HistoryList>
                <LoadingHistoryCard />
              </HistoryList>
            ))}
          {history.map((log, i) => (
            <HistoryList key={i}>
              <HistoryCard log={log} />
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
