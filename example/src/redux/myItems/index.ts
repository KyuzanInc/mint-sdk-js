import { Item, Token } from '@kyuzan/mint-sdk-js'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export type MyItemsState = {
  data: {
    bidedItems: Item[]
    ownItems: Token[]
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
  Item[],
  { bidderAddress: string },
  {
    rejectValue: string
  }
>('app/myItems/bidedItems/get', async (_, thunkApi) => {
  try {
    // TODO
    // const items = await getSdk().getItemsByBidderAddress(bidderAddress)
    return []
  } catch (err) {
    return thunkApi.rejectWithValue('Itemを取得できませんでした')
  }
})

export const getOwnItemsActionCreator = createAsyncThunk<
  Token[],
  { walletAddress: string },
  {
    rejectValue: string
  }
>('app/myItems/ownItems/get', async (_, thunkApi) => {
  try {
    // TODO
    // const items = await getSdk().getTokensByAddress(walletAddress)
    return []
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
      getOwnItemsActionCreator.fulfilled,
      (state, { payload }) => {
        state.data.ownItems = payload
        state.meta.ownItemsLoading = false
      }
    )
    builder.addCase(getOwnItemsActionCreator.pending, (state) => {
      state.meta.ownItemsLoading = true
      state.meta.error = undefined
    })
    builder.addCase(getOwnItemsActionCreator.rejected, (state, { payload }) => {
      state.meta.ownItemsLoading = false
      state.meta.error = payload
    })
  },
})
