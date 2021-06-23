import React, { useState } from 'react'
import { Dialog } from '.'

export const Basic: React.VFC = () => {
  const [open, setOpen] = useState(true)
  return (
    <Dialog
      isOpen={open}
      handleConfirm={() => setOpen(false)}
      title={'ネットワークを変更してください'}
      content={
        'オークションに入札するためにはRinkebyネットワークに変更してください'
      }
    />
  )
}

export const ConfirmText: React.VFC = () => {
  const [open, setOpen] = useState(true)
  return (
    <Dialog
      isOpen={open}
      handleConfirm={() => setOpen(false)}
      confirmText={'接続する'}
      title={'ネットワークを変更してください'}
      content={
        'オークションに入札するためにはRinkebyネットワークに変更してください'
      }
    />
  )
}

export default {
  title: 'organism/Dialog',
}
