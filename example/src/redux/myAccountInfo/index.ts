import { WalletAddressProfile } from '@kyuzan/mint-sdk-js'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getSdk } from '../../sdk'

export type MyAccountInfoState = {
  data: {
    accountInfo: {
      profile: WalletAddressProfile
      avatarImageUrl: string | undefined
    }
  }
  meta: {
    loading: boolean
    error: string | undefined
  }
}

export const initialMyAccountInfoState: MyAccountInfoState = {
  data: {
    accountInfo: {
      profile: {
        walletAddress: '',
        avatarImageId: '',
        displayName: '',
        bio: '',
        twitterAccountName: '',
        instagramAccountName: '',
        homepageUrl: '',
      },
      avatarImageUrl: undefined,
    },
  },
  meta: {
    error: undefined,
    loading: false,
  },
}

// AsyncAction
export const getAccountInfoActionCreator = createAsyncThunk<
  { profile: WalletAddressProfile; avatarImageUrl: string } | null,
  { walletAddress: string },
  {
    rejectValue: string
  }
>('app/myAccountInfo/get', async (arg, thunkApi) => {
  try {
    return await getSdk().getAccountInfo({
      walletAddress: arg.walletAddress,
    })
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
        state.data.accountInfo =
          payload || initialMyAccountInfoState.data.accountInfo
      }
    )
  },
})
