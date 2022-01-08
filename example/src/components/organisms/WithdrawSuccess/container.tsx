import React, { useCallback, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/getStore'
import { getItemActionCreator } from '../../../redux/item'
import { Presentation } from './presentation'

export const Container: React.VFC = () => {
  const dispatch = useAppDispatch()
  const [shareUrl, setShareUrl] = useState('')

  const item = useAppSelector((state) => {
    return state.app.item.data
  })

  const bidHash = useAppSelector(
    (state: { app: { transaction: { meta: { bidHash: string } } } }) =>
      state.app.transaction.meta.bidHash
  )

  const itemId = useAppSelector(
    (state) => state.app.transaction.meta.successItemId
  )

  useEffect(() => {
    setShareUrl(`${window?.location.origin}/items/${item?.id}`)
  }, [item])

  const getItem = useCallback(async () => {
    if (typeof itemId === 'string') {
      await dispatch(getItemActionCreator(itemId) as any)
    }
  }, [itemId])

  useEffect(() => {
    getItem()
  }, [itemId])

  if (!item) return null

  return <Presentation item={item} bidHash={bidHash} shareUrl={shareUrl} />
}
