import React, { useEffect } from 'react'
import { getAccountInfoActionCreator } from '../../../redux/accountInfo'
import { useAppDispatch, useAppSelector } from '../../../redux/getStore'
import { Presentation } from './presentation'

type Props = {
  //
}

export const Container: React.VFC<Props> = () => {
  const dispatch = useAppDispatch()
  const accounts = useAppSelector(
    (state) => state.app.accountInfo.data.accountInfoMap
  )
  const histories = useAppSelector((state) => {
    return state.app.history.data
  })

  const item = useAppSelector((state) => {
    return state.app.item.data
  })

  const waitingHistory = useAppSelector((state) => {
    return state.app.history.meta.waitingHistoryAction
  })

  useEffect(() => {
    histories.forEach((h) => {
      if (typeof accounts[h.accountAddress] === 'undefined') {
        dispatch(
          getAccountInfoActionCreator({
            walletAddress: h.accountAddress,
          }) as any
        )
      }
    })
  }, [histories, accounts])
  return (
    <Presentation
      loading={waitingHistory}
      history={histories.map((h) => {
        const accountInfo = accounts[h.accountAddress]
        if (typeof accountInfo === 'undefined') {
          return h
        } else {
          return {
            ...h,
            avatarImgUrl: accountInfo['avatarImgUrl'],
          }
        }
      })}
      networkId={item?.networkId ?? 1}
    />
  )
}
