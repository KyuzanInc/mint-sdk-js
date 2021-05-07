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
export const initialItemActionCreator = createAsyncThunk(
  'app/items/init',
  async () => {
    if (getSdk()) {
      const items = await getSdk()?.getItems()
      const now = new Date()
      const live = items?.filter((item) => item.endAt && now < item.endAt) ?? []
      const ended =
        items?.filter((item) => item.endAt && now >= item.endAt) ?? []
      return {
        live,
        ended,
      }
    } else {
      return {
        live: [],
        ended: [],
      }
    }
  }
)

export const getItemsActionCreator = createAsyncThunk<
  ItemsInfo,
  void,
  {
    rejectValue: string
  }
>('app/items/get', async (_, thunkApi) => {
  try {
    const items = await getSdk()!.getItems()
    const now = new Date()
    const live = items?.filter((item) => item.endAt && now < item.endAt) ?? []
    const ended = items?.filter((item) => item.endAt && now >= item.endAt) ?? []
    return {
      live,
      ended,
    }
  } catch (err) {
    return thunkApi.rejectWithValue('Itemを取得できませんでした')
  }
})

// slice

export const itemsSlice = createSlice({
  name: 'items',
  initialState: initialItemsState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      initialItemActionCreator.fulfilled,
      (state, { payload }) => {
        if (typeof payload === 'undefined') {
          state.data = {
            live: [],
            ended: [],
          }
        } else {
          state.data = {
            live: payload.live,
            ended: payload.ended,
          }
        }
      }
    )
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
