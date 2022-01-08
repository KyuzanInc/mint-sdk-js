import { ItemLog } from '@kyuzan/mint-sdk-js'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export type HistoryState = {
  data: ItemLog[]
  meta: {
    waitingHistoryAction: boolean
    initialized: boolean
    error: string | undefined
  }
}

export const initialHistoryState: HistoryState = {
  data: [],
  meta: {
    waitingHistoryAction: false,
    error: undefined,
    initialized: false,
  },
}

// AsyncAction
export const initialHistoryActionCreator = createAsyncThunk(
  'app/history/init',
  async (_: string) => {
    // TODO
    // const history = await getSdk().getItemLogs(itemId)
    return []
  }
)

export const getHistoryActionCreator = createAsyncThunk<
  ItemLog[],
  string,
  {
    rejectValue: string
  }
>('app/history/get', async (itemId, thunkApi) => {
  try {
    // TODO
    // const history = await getSdk().getItemLogs(itemId)
    return []
  } catch (err) {
    return thunkApi.rejectWithValue(
      `ItemId:${itemId}のHistoryを取得できませんでした`
    )
  }
})

export const historySlice = createSlice({
  name: 'history',
  initialState: initialHistoryState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      initialHistoryActionCreator.fulfilled,
      (state, { payload }) => {
        if (typeof payload === 'undefined') {
          state.data = []
        } else {
          // TODO
          state.data = []
        }
      }
    )
    builder.addCase(getHistoryActionCreator.pending, (state) => {
      state.meta.waitingHistoryAction = true
    })
    builder.addCase(getHistoryActionCreator.fulfilled, (state, { payload }) => {
      state.data = payload.map((i) => ({
        ...i,
        createAt: new Date(i.createAt),
      }))
      state.meta.waitingHistoryAction = false
    })
    builder.addCase(getHistoryActionCreator.rejected, (state, { payload }) => {
      state.meta.error = payload
      state.meta.waitingHistoryAction = false
    })
  },
})
