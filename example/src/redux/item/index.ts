import { Item } from '@kyuzan/mint-sdk-js'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getSdk } from '../../sdk'

export type ItemState = {
  data: Item | null
  meta: {
    waitingItemAction: boolean
    initialized: boolean
    error: string | undefined
  }
}

export const initialItemState: ItemState = {
  data: null,
  meta: {
    waitingItemAction: false,
    error: undefined,
    initialized: false,
  },
}

// AsyncAction
export const getItemActionCreator = createAsyncThunk<
  Item,
  string,
  {
    rejectValue: string
  }
>('app/item/get', async (itemId, thunkApi) => {
  try {
    const item = await getSdk().getItemById(itemId)
    return item
  } catch (err) {
    return thunkApi.rejectWithValue(
      `ItemId:${itemId}のItemを取得できませんでした`
    )
  }
})

// slice

export const itemSlice = createSlice({
  name: 'item',
  initialState: initialItemState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getItemActionCreator.pending, (state) => {
      state.meta.waitingItemAction = true
    })
    builder.addCase(getItemActionCreator.fulfilled, (state, { payload }) => {
      state.data = payload
      state.meta.waitingItemAction = false
    })
    builder.addCase(getItemActionCreator.rejected, (state, { payload }) => {
      state.meta.error = payload
      state.meta.waitingItemAction = false
    })
  },
})
