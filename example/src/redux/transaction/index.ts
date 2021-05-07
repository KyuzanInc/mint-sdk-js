import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { push } from 'connected-next-router'
import { getSdk } from '../../sdk'

export type TransactionState = {
  meta: {
    bidding: boolean
    error: string | undefined
  }
}

export const initialTransactionState: TransactionState = {
  meta: {
    bidding: false,
    error: undefined,
  },
}

// AsyncAction

export const bidActionCreator = createAsyncThunk<
  void,
  { itemId: string; bidPrice: number },
  {
    rejectValue: string
  }
>('app/transaction/bid', async ({ itemId, bidPrice }, thunkApi) => {
  try {
    const tx = await getSdk()!.sendTxBid(itemId, bidPrice)
    await tx.wait()
    // TODO: サクセス画面に飛ばす
    thunkApi.dispatch(push('/me'))
  } catch (err) {
    return thunkApi.rejectWithValue('入札に失敗しました')
  }
})

// slice

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState: initialTransactionState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(bidActionCreator.fulfilled, (state) => {
      state.meta.bidding = false
    })
    builder.addCase(bidActionCreator.pending, (state) => {
      state.meta.error = undefined
      state.meta.bidding = true
    })
    builder.addCase(bidActionCreator.rejected, (state, { payload }) => {
      state.meta.error = payload
      state.meta.bidding = false
    })
  },
})
