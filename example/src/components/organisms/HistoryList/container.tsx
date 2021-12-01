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

  const item = useAppSelector((state) => {
    return state.app.item.data
  })

  const waitingHistory = useAppSelector((state) => {
    return state.app.history.meta.waitingHistoryAction
  })

  useEffect(() => {
    item?.bids.forEach((h) => {
      if (typeof accounts[h.bidder] === 'undefined') {
        dispatch(
          getAccountInfoActionCreator({
            walletAddress: h.bidder,
          }) as any
        )
      }
    })
  }, [item?.bids, accounts])
  return (
    <Presentation
      loading={waitingHistory}
      history={
        item
          ? item?.bids.map((h) => {
              const accountInfo = accounts[h.bidder]
              if (typeof accountInfo === 'undefined') {
                return h
              } else {
                return {
                  ...h,
                  avatarImgUrl: accountInfo['avatarImgUrl'],
                }
              }
            })
          : []
      }
    />
  )
}
