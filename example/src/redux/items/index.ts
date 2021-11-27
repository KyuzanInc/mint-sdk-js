import { Item } from '@kyuzan/mint-sdk-js'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getSdk } from '../../sdk'

export type ItemsState = {
  data: {
    live: Item[]
    ended: Item[]
  }
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
  {
    live: Item[]
    ended: Item[]
  },
  void,
  {
    rejectValue: string
  }
>('app/items/get', async (_, thunkApi) => {
  try {
    const items = await getSdk().getItems()
    return {
      live: items,
      ended: [],
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
