import { AccountInfo } from '@kyuzan/mint-sdk-js'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getSdk } from '../../sdk'

export type AccountInfoState = {
  data: {
    accountInfo: AccountInfo
  }
  meta: {
    loading: boolean
    error: string | undefined
  }
}

export const initialAccountInfoState: AccountInfoState = {
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

// Slice
export const accountInfoSlice = createSlice({
  name: 'accountInfo',
  initialState: initialAccountInfoState,
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
  },
})
