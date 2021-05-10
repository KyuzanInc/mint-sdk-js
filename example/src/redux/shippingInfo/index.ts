import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { push } from 'connected-next-router'
import { getSdk } from '../../sdk'

export type ShippingInfoState = {
  meta: {
    error: string | undefined
    loading: boolean
  }
}

export const initialShippingInfoState: ShippingInfoState = {
  meta: {
    loading: false,
    error: undefined,
  },
}

// AsyncAction

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
    await getSdk()!.registerItemShippingInfo({
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
  },
})
