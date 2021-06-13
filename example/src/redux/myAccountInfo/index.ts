import { AccountInfo } from '@kyuzan/mint-sdk-js'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getSdk } from '../../sdk'

export type MyAccountInfoState = {
  data: {
    accountInfo: AccountInfo
  }
  meta: {
    loading: boolean
    error: string | undefined
  }
}

export const initialMyAccountInfoState: MyAccountInfoState = {
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
  },
  meta: {
    error: undefined,
    loading: false,
  },
}

// AsyncAction
export const getAccountInfoActionCreator = createAsyncThunk<
  AccountInfo | undefined,
  { walletAddress: string },
  {
    rejectValue: string
  }
>('app/myAccountInfo/get', async (arg, thunkApi) => {
  try {
    const data = await getSdk()?.getAccountInfo({
      walletAddress: arg.walletAddress,
    })
    return data
  } catch (err) {
    console.error(err)
    return thunkApi.rejectWithValue(`Account情報を取得できませんでした`)
  }
})

// Slice
export const myAccountInfoSlice = createSlice({
  name: 'myAccountInfo',
  initialState: initialMyAccountInfoState,
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
          avatarImgUrl: '',
          avatarImgId: '',
          displayName: '',
          bio: '',
          twitterAccountName: '',
          instagramAccountName: '',
          homepageUrl: '',
        }
      }
    )
  },
})
