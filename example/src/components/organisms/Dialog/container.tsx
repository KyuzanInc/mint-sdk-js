import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { dialogSlice } from '../../../redux/dialog'
import { useAppSelector } from '../../../redux/getStore'
import { Presentation } from './presentation'

export const Container: React.VFC = () => {
  const dialogContent = useAppSelector((state) => state.ui.dialog.data.content)
  const dispatch = useDispatch()
  const hideDialog = useCallback(() => {
    dispatch(dialogSlice.actions.hideDialog())
  }, [])

  return (
    <Presentation
      isOpen={typeof dialogContent !== 'undefined'}
      title={dialogContent?.title ?? ''}
      content={dialogContent?.content ?? ''}
      confirmText={dialogContent?.confirmText}
      handleConfirm={hideDialog}
    />
  )
}
