import { AccountInfo } from '@kyuzan/mint-sdk-js'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { push } from 'connected-next-router'
import { getSdk } from '../../sdk'

export type AccountInfoEditState = {
  data: {
    accountInfo: AccountInfo
    uploadedImgId: string | undefined
    uploadedSignedUrl: string | undefined
  }
  meta: {
    loading: boolean
    imgUploading: boolean
    submitting: boolean
    error: string | undefined
  }
}

export const initialAccountInfoEditState: AccountInfoEditState = {
  data: {
    accountInfo: {
      avatarImgUrl: '',
      avatarImgId: '',
      displayName: '',
      bio: '',
      twitterAccountName: '',
      instagramAccountName: '',
      homepageUrl: '',
    },
    uploadedImgId: undefined,
    uploadedSignedUrl: undefined,
  },
  meta: {
    error: undefined,
    imgUploading: false,
    submitting: false,
    loading: false,
  },
}

// AsyncAction
export const getAccountInfoActionCreator = createAsyncThunk(
  'app/accountInfo/get',
  async (arg: { walletAddress: string }, thunkApi) => {
    try {
      const data = await getSdk()?.getAccountInfo({
        walletAddress: arg.walletAddress,
      })
      return data
    } catch (err) {
      console.error(err)
      return thunkApi.rejectWithValue(`Account情報を取得できませんでした`)
    }
  }
)

export const uploadAvatarActionCreator = createAsyncThunk(
  'app/accountInfo/uploadAvatar',
  async (arg: { file: File }, thunkApi) => {
    try {
      return await getSdk()?.uploadAccountInfoAvatar({
        file: arg.file,
      })
    } catch (err) {
      console.error(err)
      return thunkApi.rejectWithValue(`画像のアップロードに失敗しました`)
    }
  }
)

export const updateAccountInfoActionCreator = createAsyncThunk(
  'app/accountInfo/update',
  async (
    arg: {
      avatarImgId: string
      displayName: string
      bio: string
      twitterAccountName: string
      instagramAccountName: string
      homepageUrl: string
    },
    thunkApi
  ) => {
    try {
      await getSdk()?.updateAccountInfo(arg)
      thunkApi.dispatch(push('/me'))
    } catch (err) {
      console.error(err)
      return thunkApi.rejectWithValue(`アップデートに失敗しました`)
    }
  }
)

// Slice
export const accountInfoEditSlice = createSlice({
  name: 'accountInfoEdit',
  initialState: initialAccountInfoEditState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAccountInfoActionCreator.pending, (state) => {
      state.meta.loading = true
    })
    builder.addCase(
      getAccountInfoActionCreator.rejected,
      (state, { payload }) => {
        state.meta.loading = false
        state.meta.error = payload
      }
    )
    builder.addCase(
      getAccountInfoActionCreator.fulfilled,
      (state, { payload }) => {
        state.meta.loading = false
        state.data.accountInfo = payload
      }
    )

    builder.addCase(uploadAvatarActionCreator.pending, (state) => {
      state.meta.imgUploading = true
    })
    builder.addCase(
      uploadAvatarActionCreator.rejected,
      (state, { payload }) => {
        state.meta.imgUploading = false
        state.meta.error = payload
      }
    )
    builder.addCase(
      uploadAvatarActionCreator.fulfilled,
      (state, { payload }) => {
        state.meta.imgUploading = false
        state.data.uploadedImgId = payload.imgId
        state.data.uploadedSignedUrl = payload.uploadedImgUrl
        state.data.accountInfo.avatarImgUrl = payload.uploadedImgUrl
        state.data.accountInfo.avatarImgId = payload.imgId
      }
    )

    builder.addCase(updateAccountInfoActionCreator.pending, (state) => {
      state.meta.submitting = true
    })
    builder.addCase(
      updateAccountInfoActionCreator.rejected,
      (state, { payload }) => {
        state.meta.submitting = false
        state.meta.error = payload
      }
    )
    builder.addCase(updateAccountInfoActionCreator.fulfilled, (state) => {
      state.meta.submitting = false
      state = initialAccountInfoEditState
    })
  },
})
