import { DEMO_ACCESS_KEY, DEMO_FORTMATIC_KEY } from './../../constants'
import { AnnapurnaSDK } from '@kyuzan/annapurna-sdk-js'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type SdkState = {
  data: {
    sdk: AnnapurnaSDK
  }
  meta: {
    loading: boolean
  }
}

const sdk = new AnnapurnaSDK(DEMO_ACCESS_KEY, [4, 80001], {
  fortmatic: {
    key: DEMO_FORTMATIC_KEY,
  },
})

export const initialState: SdkState = {
  data: {
    sdk: sdk,
  },
  meta: {
    loading: false,
  },
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    incrementCounter: (state, action: PayloadAction<number>) => ({
      ...state,
      count: state.count + action.payload,
    }),
    decrementCounter: (state, action: PayloadAction<number>) => ({
      ...state,
      count: state.count - action.payload,
    }),
  },
})

export default counterSlice
