import { ResponseItem, ResponseTokenERC721 } from '@kyuzan/mint-sdk-js'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getSdk } from '../../sdk'

export type MyItemsState = {
  data: {
    bidedItems: ResponseItem[]
    ownItems: ResponseTokenERC721[]
  }
  meta: {
    bidedItemsLoading: boolean
    ownItemsLoading: boolean
    error: string | undefined
  }
}

export const initialMyItemsState: MyItemsState = {
  data: {
    bidedItems: [],
    ownItems: [],
  },
  meta: {
    bidedItemsLoading: false,
    ownItemsLoading: false,
    error: undefined,
  },
}

// AsyncAction
export const getBidedActionCreator = createAsyncThunk<
  ResponseItem[],
  { bidderAddress: string },
  {
    rejectValue: string
  }
>('app/myItems/bidedItems/get', async ({ bidderAddress }, thunkApi) => {
  try {
    return await getSdk().getItemsByBidderAddress(bidderAddress)
  } catch (err) {
    return thunkApi.rejectWithValue('Itemを取得できませんでした')
  }
})

export const getOwnTokensActionCreator = createAsyncThunk<
  ResponseTokenERC721[],
  { walletAddress: string },
  {
    rejectValue: string
  }
>('app/myItems/ownItems/get', async ({ walletAddress }, thunkApi) => {
  try {
    return await getSdk().getTokensByAddress(walletAddress)
  } catch (err) {
    return thunkApi.rejectWithValue('Itemを取得できませんでした')
  }
})

// slice
export const myItemsSlice = createSlice({
  name: 'myItems',
  initialState: initialMyItemsState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBidedActionCreator.fulfilled, (state, { payload }) => {
      state.data.bidedItems = payload
      state.meta.bidedItemsLoading = false
    })
    builder.addCase(getBidedActionCreator.pending, (state) => {
      state.meta.bidedItemsLoading = true
      state.meta.error = undefined
    })
    builder.addCase(getBidedActionCreator.rejected, (state, { payload }) => {
      state.meta.bidedItemsLoading = false
      state.meta.error = payload
    })

    builder.addCase(
      getOwnTokensActionCreator.fulfilled,
      (state, { payload }) => {
        state.data.ownItems = payload
        state.meta.ownItemsLoading = false
      }
    )
    builder.addCase(getOwnTokensActionCreator.pending, (state) => {
      state.meta.ownItemsLoading = true
      state.meta.error = undefined
    })
    builder.addCase(
      getOwnTokensActionCreator.rejected,
      (state, { payload }) => {
        state.meta.ownItemsLoading = false
        state.meta.error = payload
      }
    )
  },
})
