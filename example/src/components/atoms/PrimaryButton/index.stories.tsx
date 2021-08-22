import { action } from '@storybook/addon-actions'
import React from 'react'
import { PrimaryButton } from '.'

export const Basic: React.VFC = () => {
  return <PrimaryButton label={'button text'} onClick={action('onClick')} />
}

export const WithIcon: React.VFC = () => {
  return (
    <PrimaryButton
      label={'button text'}
      iconPathFront={'/images/icons/calendar.svg'}
      onClick={action('onClick')}
    />
  )
}

export const Disabled: React.VFC = () => {
  return (
    <PrimaryButton
      label={'button text'}
      onClick={action('onClick')}
      disabled={true}
    />
  )
}

export const Loading: React.VFC = () => {
  return (
    <PrimaryButton
      label={'button text'}
      isLoading={true}
      onClick={action('onClick')}
    />
  )
}

export default {
  title: 'atoms/PrimaryButton',
}
