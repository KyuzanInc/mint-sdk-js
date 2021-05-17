import { Item } from '@kyuzan/mint-sdk-js'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getSdk } from '../../sdk'

type ItemsInfo = {
  live: Item[]
  ended: Item[]
}

export type ItemsState = {
  data: ItemsInfo
  meta: {
    waitingItemAction: boolean
    initialized: boolean
    error: string | undefined
  }
}

export const initialItemsState: ItemsState = {
  data: {
    live: [],
    ended: [],
  },
  meta: {
    waitingItemAction: false,
    error: undefined,
    initialized: false,
  },
}

// AsyncAction

export const getItemsActionCreator = createAsyncThunk<
  ItemsInfo,
  void,
  {
    rejectValue: string
  }
>('app/items/get', async (_, thunkApi) => {
  try {
    const [live, ended] = await Promise.all([
      getSdk()?.getItems({
        onSale: 'true',
        perPage: 1000,
        networkId: [4, 80001],
        page: 1,
        sort: { sortBy: 'endAt', order: 'desc' },
      }),
      getSdk()?.getItems({
        onSale: 'false',
        networkId: [4, 80001],
        perPage: 1000,
        page: 1,
        sort: { sortBy: 'endAt', order: 'desc' },
      }),
    ])
    return {
      live: live ?? [],
      ended: ended ?? [],
    }
  } catch (err) {
    console.error(err)
    return thunkApi.rejectWithValue('Itemを取得できませんでした')
  }
})

// slice

export const itemsSlice = createSlice({
  name: 'items',
  initialState: initialItemsState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getItemsActionCreator.pending, (state) => {
      state.meta.waitingItemAction = true
    })
    builder.addCase(getItemsActionCreator.fulfilled, (state, { payload }) => {
      state.data = {
        live: payload.live,
        ended: payload.ended,
      }
      state.meta.waitingItemAction = false
    })
    builder.addCase(getItemsActionCreator.rejected, (state, { payload }) => {
      state.meta.error = payload
      state.meta.waitingItemAction = false
    })
  },
})
