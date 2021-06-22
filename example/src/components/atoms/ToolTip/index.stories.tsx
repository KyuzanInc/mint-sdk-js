import React from 'react'
import { ToolTip } from '.'

export const Basic: React.VFC = () => {
  return (
    <ToolTip
      title={'タイトル'}
      description={
        'アイテムがまだ発行処理中の可能性があります。Etherscanで取引トランザクションをご確認ください'
      }
    >
      test
    </ToolTip>
  )
}

export const NoTitle: React.VFC = () => {
  return (
    <ToolTip
      description={
        'アイテムがまだ発行処理中の可能性があります。Etherscanで取引トランザクションをご確認ください'
      }
    >
      test
    </ToolTip>
  )
}

export default {
  title: 'atoms/ToolTip',
}
