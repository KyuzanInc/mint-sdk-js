import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export type MyAccountInfoState = {
  data: {
    // TODO
    accountInfo: {
      avatarImgUrl: string
      avatarImgId: string
      displayName: string
      bio: string
      twitterAccountName: string
      instagramAccountName: string
      homepageUrl: string
    }
  }
  meta: {
    loading: boolean
    error: string | undefined
  }
}

export const initialMyAccountInfoState: MyAccountInfoState = {
  data: {
    accountInfo: {
      avatarImgUrl: '',
      avatarImgId: '',
      displayName: '',
      bio: '',
      twitterAccountName: '',
      instagramAccountName: '',
      homepageUrl: '',
    },
  },
  meta: {
    error: undefined,
    loading: false,
  },
}

// AsyncAction
export const getAccountInfoActionCreator = createAsyncThunk<
  undefined,
  { walletAddress: string },
  {
    rejectValue: string
  }
>('app/myAccountInfo/get', async (arg, thunkApi) => {
  try {
    // TODO
    // const data = await getSdk().getAccountInfo({
    //   walletAddress: arg.walletAddress,
    // })
    return undefined
  } catch (err) {
    console.error(err)
    return thunkApi.rejectWithValue(`Account情報を取得できませんでした`)
  }
})

// Slice
export const myAccountInfoSlice = createSlice({
  name: 'myAccountInfo',
  initialState: initialMyAccountInfoState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAccountInfoActionCreator.pending, (state) => {
      state.meta.loading = true
    })
    builder.addCase(
      getAccountInfoActionCreator.rejected,
      (state, { payload }) => {
        state.meta.loading = false
        state.meta.error = payload
      }
    )

    builder.addCase(
      getAccountInfoActionCreator.fulfilled,
      (state, { payload }) => {
        state.meta.loading = false
        state.data.accountInfo = payload || {
          avatarImgUrl: '',
          avatarImgId: '',
          displayName: '',
          bio: '',
          twitterAccountName: '',
          instagramAccountName: '',
          homepageUrl: '',
        }
      }
    )
  },
})
