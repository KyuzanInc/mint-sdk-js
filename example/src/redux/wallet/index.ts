import { MintSDK, CurrencyUnit, NetworkId } from '@kyuzan/mint-sdk-js'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getSdk } from '../../sdk'

// State

type FormattedWalletInfo = {
  currencyUnit: CurrencyUnit
  balance: string
  address: string
}

export type WalletState = {
  data: {
    walletInfo: FormattedWalletInfo | undefined
    connectedNetwork: NetworkId
  }
  meta: {
    waitingWalletAction: boolean
    initialized: boolean
    error: string | undefined
  }
}

export const initialState: WalletState = {
  data: {
    walletInfo: undefined,
    connectedNetwork: 4,
  },
  meta: {
    waitingWalletAction: false,
    error: undefined,
    initialized: false,
  },
}

// AsyncAction

export const initialWalletActionCreator = createAsyncThunk(
  'app/wallet/init',
  async () => {
    if (await getSdk().isWalletConnect()) {
      const walletInfo = await getSdk().getWalletInfo()
      const connectingNetworkId = await getSdk().getConnectedNetworkId()
      return {
        balance: MintSDK.formatEther(walletInfo.balance),
        currencyUnit: walletInfo.unit,
        address: walletInfo.address,
        connectingNetworkId,
      }
    } else {
      return undefined
    }
  }
)

export const connectWalletActionCreator = createAsyncThunk<
  FormattedWalletInfo & { connectingNetworkId: NetworkId },
  void,
  {
    rejectValue: string
  }
>('app/wallet/connect', async (_, thunkApi) => {
  try {
    await getSdk().connectWallet()
    const walletInfo = await getSdk().getWalletInfo()
    const connectingNetworkId =
      (await getSdk().getConnectedNetworkId()) as NetworkId
    return {
      balance: MintSDK.formatEther(walletInfo.balance),
      currencyUnit: walletInfo.unit,
      address: walletInfo.address,
      connectingNetworkId,
    }
  } catch (err) {
    return thunkApi.rejectWithValue('ウォレットの接続に失敗しました')
  }
})

// slice

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    updateWalletInfo: (
      state,
      { payload }: PayloadAction<FormattedWalletInfo | undefined>
    ) => {
      if (typeof payload === 'undefined') {
        state.data.walletInfo = undefined
      } else {
        state.data.walletInfo = {
          balance: payload.balance,
          currencyUnit: payload.currencyUnit,
          address: payload.address,
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      initialWalletActionCreator.fulfilled,
      (state, { payload }) => {
        state.meta.initialized = true
        if (typeof payload === 'undefined') {
          state.data.walletInfo = undefined
        } else {
          state.data.walletInfo = {
            balance: payload.balance,
            currencyUnit: payload.currencyUnit,
            address: payload.address,
          }
          state.data.connectedNetwork = payload.connectingNetworkId as NetworkId
        }
      }
    )
    builder.addCase(connectWalletActionCreator.pending, (state) => {
      state.meta.waitingWalletAction = true
    })
    builder.addCase(
      connectWalletActionCreator.fulfilled,
      (state, { payload }) => {
        state.data.walletInfo = {
          balance: payload.balance,
          currencyUnit: payload.currencyUnit,
          address: payload.address,
        }
        state.data.connectedNetwork = payload.connectingNetworkId
        state.meta.waitingWalletAction = false
      }
    )
    builder.addCase(
      connectWalletActionCreator.rejected,
      (state, { payload }) => {
        state.meta.error = payload
        state.meta.waitingWalletAction = false
      }
    )
  },
})
