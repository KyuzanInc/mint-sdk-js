import React, { useCallback, useState } from 'react'
import { LiveStatus } from './active'
import { EndedStatus } from './ended'

type Props = {
  endAt: Date
  price: number
  unit: string
}

export const StatusDetail: React.FC<Props> = ({ endAt, price, unit }) => {
  const endDate = endAt ?? new Date()
  const initialState = endDate < new Date()
  const [isEnded, setIsEnded] = useState(initialState)
  const updateTime = useCallback(() => {
    setIsEnded(true)
  }, [])
  return (
    <>
      {!isEnded && (
        <LiveStatus
          endAt={endDate}
          price={price}
          unit={unit}
          onComplete={updateTime}
        />
      )}
      {isEnded && <EndedStatus endAt={endAt} unit={unit} price={price} />}
    </>
  )
}
