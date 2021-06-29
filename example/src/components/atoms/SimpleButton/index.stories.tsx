import { action } from '@storybook/addon-actions'
import React from 'react'
import { SimpleButton } from '.'

export const Basic: React.VFC = () => {
  return (
    <SimpleButton
      label={'button text'}
      iconPath={'/images/icons/calendar.svg'}
      onClick={action('onClick')}
    />
  )
}

export const NoIcon: React.VFC = () => {
  return <SimpleButton label={'button text'} onClick={action('onClick')} />
}

export const Disabled: React.VFC = () => {
  return (
    <SimpleButton
      label={'button text'}
      onClick={action('onClick')}
      disabled={true}
    />
  )
}

export default {
  title: 'atoms/SimpleButton',
}
