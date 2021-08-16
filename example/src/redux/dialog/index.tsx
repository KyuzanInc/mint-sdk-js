import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type DialogState = {
  data: {
    content:
      | undefined
      | {
          confirmText?: string
          title: string
          content: React.ReactNode
        }
  }
  //   meta: {}
}

export const initialDialogState: DialogState = {
  data: {
    content: undefined,
  },
}

// AsyncAction

// Slice
export const dialogSlice = createSlice({
  name: 'dialog',
  initialState: initialDialogState,
  reducers: {
    showDialog: (
      state,
      { payload }: PayloadAction<DialogState['data']['content']>
    ) => {
      state.data.content = payload
    },
    hideDialog: (state) => {
      state.data.content = undefined
    },
  },
})
