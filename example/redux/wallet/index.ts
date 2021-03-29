import { WalletInfo } from '@kyuzan/annapurna-sdk-js'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getSdk } from '../../sdk'

// State

export type WalletState = {
  data: {
    walletInfo: WalletInfo | undefined
  }
  meta: {
    loading: boolean
    initialized: boolean
    error: string | undefined
  }
}

export const initialState: WalletState = {
  data: {
    walletInfo: undefined,
  },
  meta: {
    loading: false,
    error: undefined,
    initialized: false,
  },
}

// AsyncAction

export const initialWalletActionCreator = createAsyncThunk(
  'app/wallet/init',
  async () => {
    if (await getSdk()!.isWalletConnect()) {
      return await getSdk()!.getWalletInfo()
    } else {
      return undefined
    }
  }
)

export const connectWalletActionCreator = createAsyncThunk<
  WalletInfo,
  void,
  {
    rejectValue: string
  }
>('app/wallet/connect', async (_, thunkApi) => {
  try {
    await getSdk()!.connectWallet()
    return await getSdk()!.getWalletInfo()
  } catch (err) {
    return thunkApi.rejectWithValue('ウォレットの接続に失敗しました')
  }
})

// slice

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    updateWalletInfo: (state, action: PayloadAction<WalletInfo>) => {
      state.data.walletInfo = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      initialWalletActionCreator.fulfilled,
      (state, { payload }) => {
        state.data.walletInfo = payload
      }
    )
    builder.addCase(
      connectWalletActionCreator.fulfilled,
      (state, { payload }) => {
        state.data.walletInfo = payload
      }
    )
    builder.addCase(
      connectWalletActionCreator.rejected,
      (state, { payload }) => {
        state.meta.error = payload
      }
    )
  },
})
