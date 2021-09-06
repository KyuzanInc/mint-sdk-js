import { sleep } from './../../util/sleep'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getSdk } from '../../sdk'

export type Status = null | 'bidSuccess' | 'buySuccess'

export type TransactionState = {
  meta: {
    bidding: boolean
    status: Status
    bidHash: string
    error: string | undefined
    withdrawingItemId: string | undefined
    successItemId: string | undefined
  }
}

export const initialTransactionState: TransactionState = {
  meta: {
    bidding: false,
    status: null,
    bidHash: '',
    withdrawingItemId: undefined,
    successItemId: undefined,
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
  { itemId: string; inJapan: boolean },
  {
    rejectValue: string
  }
>('app/myItems/withdraw', async ({ itemId, inJapan }, thunkApi) => {
  try {
    const tx = await getSdk()!.sendTxMakeSuccessfulBid(
      itemId,
      inJapan ? 'jp' : 'unknown'
    )
    await tx.wait()
    // すぐ遷移するとキャッシュの関係で反映されない
    await sleep(6000)
    // TODO: おめでとう画面に遷移させる
    return tx.hash
  } catch (err) {
    return thunkApi.rejectWithValue('引き出しに失敗しました')
  }
})

export const buyFixedPriceItemActionCreator = createAsyncThunk<
  string,
  { itemId: string; inJapan: boolean },
  {
    rejectValue: string
  }
>('app/myItems/buyFixedPrice', async ({ itemId, inJapan }, thunkApi) => {
  try {
    const tx = await getSdk()!.sendTxBuyItem(itemId, inJapan ? 'jp' : 'unknown')
    await tx.wait()
    // すぐ遷移するとキャッシュの関係で反映されない
    await sleep(6000)
    // TODO: おめでとう画面に遷移させる
    return tx.hash
  } catch (err) {
    return thunkApi.rejectWithValue('取引に失敗しました')
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
    reset: (state) => {
      state.meta = initialTransactionState.meta
    },
  },
  extraReducers: (builder) => {
    builder.addCase(bidActionCreator.fulfilled, (state, { payload }) => {
      state.meta.bidding = false
      state.meta.status = 'bidSuccess'
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
      buyFixedPriceItemActionCreator.fulfilled,
      (state, { meta, payload }) => {
        state.meta.bidding = false
        state.meta.status = 'buySuccess'
        state.meta.bidHash = payload
        state.meta.successItemId = meta.arg.itemId
      }
    )
    builder.addCase(buyFixedPriceItemActionCreator.pending, (state) => {
      state.meta.error = undefined
      state.meta.bidding = true
    })
    builder.addCase(
      buyFixedPriceItemActionCreator.rejected,
      (state, { payload }) => {
        state.meta.error = payload
        state.meta.bidding = false
      }
    )
    builder.addCase(
      withDrawItemActionCreator.fulfilled,
      (state, { meta, payload }) => {
        state.meta.withdrawingItemId = undefined
        state.meta.bidHash = payload
        state.meta.successItemId = meta.arg.itemId
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
