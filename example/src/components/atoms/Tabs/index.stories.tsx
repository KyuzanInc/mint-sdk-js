import React, { useState } from 'react'
import { Tabs } from '.'

export const Basic: React.VFC = () => {
  const [value, setValue] = useState('tab1')
  return (
    <Tabs
      items={[
        { label: 'タブ　1', value: 'tab1' },
        { label: 'タブ　2', value: 'tab2' },
      ]}
      value={value}
      onChange={setValue}
    />
  )
}

export default {
  title: 'atoms/Tab',
}
