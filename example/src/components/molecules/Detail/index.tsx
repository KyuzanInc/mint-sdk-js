import React, { useCallback, useState } from 'react'
import { Item } from '@kyuzan/mint-sdk-js'
import { LiveStatus } from './active'
import { EndedStatus } from './ended'

type Props = {
  item?: Item
}

export const StatusDetail: React.FC<Props> = ({ item }) => {
  const endDate = item?.endAt ?? new Date()
  const initialState = endDate < new Date()
  const [isEnded, setIsEnded] = useState(initialState)
  const updateTime = useCallback(() => {
    setIsEnded(true)
  }, [])
  return (
    <>
      {!isEnded && <LiveStatus item={item} onComplete={updateTime} />}
      {isEnded && <EndedStatus item={item} />}
    </>
  )
}
