import { useRouter } from 'next/router'
import React, { useCallback, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/getStore'
import { getItemActionCreator } from '../../redux/item'
import { Presentation } from './presentation'

export const Container: React.VFC = () => {
  const router = useRouter()
  const { itemId } = router.query
  const dispatch = useAppDispatch()

  const item = useAppSelector((state: { app: { item: { data: any } } }) => {
    return state.app.item.data
  })

  const getItem = useCallback(() => {
    if (typeof itemId === 'string') {
      dispatch(getItemActionCreator(itemId) as any)
    }
  }, [itemId])

  useEffect(() => {
    getItem()
  }, [itemId])

  return <Presentation item={item} />
}
