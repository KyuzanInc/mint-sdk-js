import { WalletAddressProfile } from '@kyuzan/mint-sdk-js'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { push } from 'connected-next-router'
import { getSdk } from '../../sdk'

export type MyAccountInfoEditState = {
  data: {
    accountInfo: WalletAddressProfile
    avatarImageUrl: string | undefined
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

export const initialMyAccountInfoEditState: MyAccountInfoEditState = {
  data: {
    accountInfo: {
      walletAddress: '',
      avatarImageId: '',
      displayName: '',
      bio: '',
      twitterAccountName: '',
      instagramAccountName: '',
      homepageUrl: '',
    },
    avatarImageUrl: undefined,
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
export const getAccountInfoActionCreator = createAsyncThunk<
  WalletAddressProfile | null,
  { walletAddress: string },
  {
    rejectValue: string
  }
>('app/myAccountInfo/get', async (arg, thunkApi) => {
  try {
    const data = await getSdk().getAccountInfo({
      walletAddress: arg.walletAddress,
    })
    return data?.profile || null
  } catch (err) {
    return thunkApi.rejectWithValue(`Account情報を取得できませんでした`)
  }
})

export const uploadAvatarActionCreator = createAsyncThunk<
  | {
      imgId: string
      uploadedImgUrl: string
    }
  | undefined,
  { file: File },
  {
    rejectValue: string
  }
>('app/myAccountInfo/uploadAvatar', async (arg, thunkApi) => {
  try {
    return await getSdk().uploadAccountInfoAvatar({
      file: arg.file,
    })
  } catch (err) {
    console.error(err)
    return thunkApi.rejectWithValue(`画像のアップロードに失敗しました`)
  }
})

export const updateAccountInfoActionCreator = createAsyncThunk<
  void,
  {
    avatarImageId: string
    displayName: string
    bio: string
    twitterAccountName: string
    instagramAccountName: string
    homepageUrl: string
  },
  {
    rejectValue: string
  }
>(
  'app/myAccountInfo/update',
  async (
    arg: {
      avatarImageId: string
      displayName: string
      bio: string
      twitterAccountName: string
      instagramAccountName: string
      homepageUrl: string
    },
    thunkApi
  ) => {
    try {
      await getSdk().updateAccountInfo(arg)
      thunkApi.dispatch(push('/me'))
    } catch (err) {
      console.error(err)
      return thunkApi.rejectWithValue(`アップデートに失敗しました`)
    }
  }
)

// Slice
export const myAccountInfoEditSlice = createSlice({
  name: 'myAccountInfoEdit',
  initialState: initialMyAccountInfoEditState,
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
        state.data.accountInfo = payload || {
          walletAddress: '',
          avatarImageId: '',
          displayName: '',
          bio: '',
          twitterAccountName: '',
          instagramAccountName: '',
          homepageUrl: '',
        }
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
        state.data.uploadedImgId = payload?.imgId || ''
        state.data.uploadedSignedUrl = payload?.uploadedImgUrl || ''
        state.data.avatarImageUrl = payload?.uploadedImgUrl || ''
        state.data.accountInfo.avatarImageId = payload?.imgId || ''
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
      state = initialMyAccountInfoEditState
    })
  },
})
