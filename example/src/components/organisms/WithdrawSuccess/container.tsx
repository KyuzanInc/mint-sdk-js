import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/getStore'
import { getItemActionCreator } from '../../../redux/item'
import { Presentation } from './presentation'

export const Container: React.VFC = () => {
  const router = useRouter()
  const { itemId } = router.query
  const dispatch = useAppDispatch()
  const [shareUrl, setShareUrl] = useState('')

  useEffect(() => {
    setShareUrl(`${window?.location.origin}/items/${itemId}`)
  }, [itemId])

  const item = useAppSelector((state: { app: { item: { data: any } } }) => {
    return state.app.item.data
  })

  const bidHash = useAppSelector(
    (state: { app: { transaction: { meta: { bidHash: string } } } }) =>
      state.app.transaction.meta.bidHash
  )

  const getItem = useCallback(() => {
    if (typeof itemId === 'string') {
      dispatch(getItemActionCreator(itemId) as any)
    }
  }, [itemId])

  useEffect(() => {
    getItem()
  }, [itemId])

  return <Presentation item={item} bidHash={bidHash} shareUrl={shareUrl} />
}
