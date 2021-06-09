import { useRouter } from 'next/router'
import React, { ChangeEvent, useCallback, useEffect } from 'react'
import {
  getAccountInfoActionCreator,
  updateAccountInfoActionCreator,
  uploadAvatarActionCreator,
} from '../../../redux/accountInfoEdit'
import { useAppDispatch, useAppSelector } from '../../../redux/getStore'
import { Presentation } from './presentation'

export const Container: React.VFC = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const accountInfoLoading = useAppSelector(
    (state) => state.app.accountInfoEdit.meta.loading
  )
  const accountInfo = useAppSelector(
    (state) => state.app.accountInfoEdit.data.accountInfo
  )
  const uploadedImgUrl = useAppSelector(
    (state) => state.app.accountInfoEdit.data.uploadedSignedUrl
  )
  const uploadedImgId = useAppSelector(
    (state) => state.app.accountInfoEdit.data.uploadedImgId
  )
  const onSubmit = useCallback(
    (data: {
      displayName: string
      bio: string
      twitterAccountName: string
      instagramAccountName: string
      homepageUrl: string
    }) => {
      dispatch(
        updateAccountInfoActionCreator({
          avatarImgId: uploadedImgId || accountInfo.avatarImgId,
          displayName: data.displayName,
          bio: data.bio,
          twitterAccountName: data.twitterAccountName,
          instagramAccountName: data.instagramAccountName,
          homepageUrl: data.homepageUrl,
        }) as any
      )
    },
    [uploadedImgId, accountInfo.accountInfo]
  )
  const uploadingImg = useAppSelector(
    (state) => state.app.accountInfoEdit.meta.imgUploading
  )
  const submitting = useAppSelector(
    (state) => state.app.accountInfoEdit.meta.submitting
  )
  const onSelectImage = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return
    dispatch(uploadAvatarActionCreator({ file: e.target.files[0] }) as any)
  }, [])

  const walletInfo = useAppSelector((state) => state.app.wallet.data.walletInfo)
  useEffect(() => {
    if (typeof walletInfo?.address === 'undefined') {
      router.push('/me')
    } else {
      dispatch(
        getAccountInfoActionCreator({
          walletAddress: walletInfo.address,
        }) as any
      )
    }
  }, [walletInfo?.address])
  return (
    <Presentation
      onSubmit={onSubmit}
      onSelectImg={onSelectImage}
      submitting={submitting}
      uploadingImg={uploadingImg}
      loading={accountInfoLoading}
      avatarImgUrl={uploadedImgUrl ?? accountInfo.avatarImgUrl}
      displayName={accountInfo.displayName}
      bio={accountInfo.bio}
      twitterAccountName={accountInfo.twitterAccountName}
      instagramAccountName={accountInfo.instagramAccountName}
      homepageUrl={accountInfo.homepageUrl}
    />
  )
}
