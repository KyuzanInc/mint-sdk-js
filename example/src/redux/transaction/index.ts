import { sleep } from './../../util/sleep'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { push } from 'connected-next-router'
import { getSdk } from '../../sdk'

export type TransactionState = {
  meta: {
    bidding: boolean
    error: string | undefined
    withdrawingItemId: string | undefined
  }
}

export const initialTransactionState: TransactionState = {
  meta: {
    bidding: false,
    withdrawingItemId: undefined,
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
    // すぐ遷移するとキャッシュの関係で反映されない
    await sleep(6000)
    // TODO: サクセス画面に飛ばす
    thunkApi.dispatch(push('/me'))
  } catch (err) {
    return thunkApi.rejectWithValue('入札に失敗しました')
  }
})

export const withDrawItemActionCreator = createAsyncThunk<
  void,
  { itemId: string },
  {
    rejectValue: string
  }
>('app/myItems/withdraw', async ({ itemId }, thunkApi) => {
  try {
    const tx = await getSdk()!.sendTxMakeSuccessfulBid(itemId, 'unknown')
    await tx.wait()
    // すぐ遷移するとキャッシュの関係で反映されない
    await sleep(6000)
    // TODO: おめでとう画面に遷移させる
  } catch (err) {
    return thunkApi.rejectWithValue('引き出しに失敗しました')
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
    builder.addCase(withDrawItemActionCreator.fulfilled, (state) => {
      state.meta.withdrawingItemId = undefined
    })
    builder.addCase(withDrawItemActionCreator.pending, (state, action) => {
      state.meta.withdrawingItemId = action.meta.arg.itemId
      state.meta.error = undefined
    })
    builder.addCase(
      withDrawItemActionCreator.rejected,
      (state, { payload }) => {
        state.meta.withdrawingItemId = undefined
        state.meta.error = payload
      }
    )
  },
})
