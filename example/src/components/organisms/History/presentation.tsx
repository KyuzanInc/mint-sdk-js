import { ItemLog, NetworkId } from '@kyuzan/mint-sdk-js'
import styled from '@emotion/styled'
import React from 'react'
import { color, font } from '../../../style'
import { HistoryCard } from '../../molecules/HistoryCard'

type Props = {
  loading: boolean
  history: ItemLog[]
  networkId: NetworkId
}

export const Presentation: React.VFC<Props> = ({
  loading,
  history,
  networkId,
}) => {
  return (
    <History>
      <Label>History</Label>
      {!loading && history.length === 0 ? (
        <EmptyHistory>No Bids</EmptyHistory>
      ) : (
        <HistoryUL>
          {loading &&
            new Array(6).fill(1).map((_, i) => (
              <HistoryList key={i}>
                <HistoryCard networkId={networkId} loading={true} />
              </HistoryList>
            ))}
          {history.map((log, i) => (
            <HistoryList key={i}>
              <HistoryCard loading={false} log={log} networkId={networkId} />
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
