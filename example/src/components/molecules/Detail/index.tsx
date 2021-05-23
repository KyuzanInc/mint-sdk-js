import React, { useCallback, useState } from 'react'
import { LiveStatus } from './active'
import { EndedStatus } from './ended'

type Props = {
  endAt: Date
  price: number
}

export const StatusDetail: React.FC<Props> = ({ endAt, price }) => {
  const endDate = endAt ?? new Date()
  const initialState = endDate < new Date()
  const [isEnded, setIsEnded] = useState(initialState)
  const updateTime = useCallback(() => {
    setIsEnded(true)
  }, [])
  return (
    <>
      {!isEnded && (
        <LiveStatus endAt={endDate} price={price} onComplete={updateTime} />
      )}
      {isEnded && <EndedStatus endAt={endAt} price={price} />}
    </>
  )
}
