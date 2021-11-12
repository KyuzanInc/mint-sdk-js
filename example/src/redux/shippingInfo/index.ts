import { ItemShippingInfo } from '@kyuzan/mint-sdk-js'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { push } from 'connected-next-router'
import { getSdk } from '../../sdk'
import { StoreState } from '../getStore'

export type ShippingInfoState = {
  data: {
    shippingInfo: Record<string, ItemShippingInfo>
  }
  meta: {
    error: string | undefined
    loading: boolean
    loadingShippingInfo: boolean
  }
}

export const initialShippingInfoState: ShippingInfoState = {
  data: {
    shippingInfo: {},
  },
  meta: {
    loading: false,
    loadingShippingInfo: false,
    error: undefined,
  },
}

// AsyncAction

export const getShippingInfoActionCreator = createAsyncThunk<
  ItemShippingInfo,
  {
    itemId: string
  },
  {
    rejectValue: string
    state: StoreState
  }
>('app/shippingInfo/get', async ({ itemId }, thunkApi) => {
  try {
    const state = thunkApi.getState()
    if (state.app.shippingInfo.data.shippingInfo[itemId]) {
      return state.app.shippingInfo.data.shippingInfo[itemId]
    }
    const data = await getSdk().getItemShippingInfo({ itemId })
    return data.data
  } catch (err) {
    return thunkApi.rejectWithValue('失敗しました')
  }
})

export const submitShippingInfoActionCreator = createAsyncThunk<
  void,
  {
    itemId: string
    data: {
      firstName: string
      lastName: string
      postalCode: string
      prefecture: string
      city: string
      address1: string
      address2: string
      tel: string
      email: string
      memo: string
    }
  },
  {
    rejectValue: string
  }
>('app/shippingInfo/submit', async ({ itemId, data }, thunkApi) => {
  try {
    await getSdk().registerItemShippingInfo({
      itemId,
      shippingInfo: {
        ...data,
        name: `${data.lastName} ${data.firstName}`,
      },
    })
    thunkApi.dispatch(push('/me/shipping_info_success'))
  } catch (err) {
    return thunkApi.rejectWithValue('失敗しました')
  }
})

// slice

export const shippingInfoSlice = createSlice({
  name: 'shippingInfo',
  initialState: initialShippingInfoState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(submitShippingInfoActionCreator.fulfilled, (state) => {
      state.meta.loading = false
    })
    builder.addCase(submitShippingInfoActionCreator.pending, (state) => {
      state.meta.error = undefined
      state.meta.loading = true
    })
    builder.addCase(
      submitShippingInfoActionCreator.rejected,
      (state, { payload }) => {
        state.meta.error = payload
        state.meta.loading = false
      }
    )
    builder.addCase(getShippingInfoActionCreator.fulfilled, (state, action) => {
      state.meta.loadingShippingInfo = false
      state.data.shippingInfo = {
        ...state.data.shippingInfo,
        [action.meta.arg.itemId]: action.payload,
      }
    })
    builder.addCase(getShippingInfoActionCreator.pending, (state) => {
      state.meta.error = undefined
      state.meta.loadingShippingInfo = true
    })
    builder.addCase(
      getShippingInfoActionCreator.rejected,
      (state, { payload }) => {
        state.meta.error = payload
        state.meta.loadingShippingInfo = false
      }
    )
  },
})
