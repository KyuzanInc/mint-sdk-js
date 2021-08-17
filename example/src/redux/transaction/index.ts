import { sleep } from './../../util/sleep'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getSdk } from '../../sdk'

export type Status = 'bid' | 'success'

export type TransactionState = {
  meta: {
    bidding: boolean
    status: Status
    bidHash: string
    error: string | undefined
    withdrawingItemId: string | undefined
  }
}

export const initialTransactionState: TransactionState = {
  meta: {
    bidding: false,
    status: 'bid',
    bidHash: '',
    withdrawingItemId: undefined,
    error: undefined,
  },
}

// AsyncAction

export const bidActionCreator = createAsyncThunk<
  string,
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
    return tx.hash
  } catch (err) {
    console.error(err)
    return thunkApi.rejectWithValue('入札に失敗しました')
  }
})

export const withDrawItemActionCreator = createAsyncThunk<
  string,
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
    return tx.hash
  } catch (err) {
    return thunkApi.rejectWithValue('引き出しに失敗しました')
  }
})

// slice

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState: initialTransactionState,
  reducers: {
    changeStatus: (state, action) => {
      state.meta.status = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(bidActionCreator.fulfilled, (state, { payload }) => {
      state.meta.bidding = false
      state.meta.status = 'success'
      state.meta.bidHash = payload
    })
    builder.addCase(bidActionCreator.pending, (state) => {
      state.meta.error = undefined
      state.meta.bidding = true
    })
    builder.addCase(bidActionCreator.rejected, (state, { payload }) => {
      state.meta.error = payload
      state.meta.bidding = false
    })
    builder.addCase(
      withDrawItemActionCreator.fulfilled,
      (state, { payload }) => {
        state.meta.withdrawingItemId = undefined
        state.meta.bidHash = payload
      }
    )
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
