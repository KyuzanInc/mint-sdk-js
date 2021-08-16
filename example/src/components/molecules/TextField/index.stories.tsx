import React from 'react'
import { TextAreaField, TextField } from '.'

export const Text: React.VFC = () => (
  <TextField
    label={'DisplayName'}
    registerReturnVal={{} as any}
    placeHolder={'kyuzan'}
  />
)

export const TextArea: React.VFC = () => (
  <TextAreaField
    label={'DisplayName'}
    registerReturnVal={{} as any}
    placeHolder={'kyuzan'}
  />
)

export default {
  title: 'molecules/TextField',
}
