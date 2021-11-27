import { Token } from '@kyuzan/mint-sdk-js'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export type AccountTokesState = {
  data: {
    tokens: Record<string, Token[]>
  }
  meta: {
    loading: Record<string, boolean>
    error: string | undefined
  }
}

export const initialAccountTokensState: AccountTokesState = {
  data: {
    tokens: {},
  },
  meta: {
    loading: {},
    error: undefined,
  },
}

// AsyncAction
export const getTokensActionCreator = createAsyncThunk<
  { tokens: Token[]; walletAddress: string },
  { walletAddress: string },
  {
    rejectValue: string
  }
>('app/accountTokens/get', async ({ walletAddress }, thunkApi) => {
  try {
    // TODO
    // const tokens = await getSdk().getTokensByAddress(walletAddress)
    return { tokens: [], walletAddress }
  } catch (err) {
    return thunkApi.rejectWithValue('Tokenを取得できませんでした')
  }
})

// slice
export const accountTokensSlice = createSlice({
  name: 'accountTokens',
  initialState: initialAccountTokensState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTokensActionCreator.fulfilled, (state, { payload }) => {
      state.data.tokens[payload.walletAddress] = payload.tokens
      state.meta.loading[payload.walletAddress] = false
    })
    builder.addCase(getTokensActionCreator.pending, (state, action) => {
      state.meta.loading[action.meta.arg.walletAddress] = true
      state.meta.error = undefined
    })
    builder.addCase(
      getTokensActionCreator.rejected,
      (state, { meta, payload }) => {
        state.meta.loading[meta.arg.walletAddress] = false
        state.meta.error = payload
      }
    )
  },
})
