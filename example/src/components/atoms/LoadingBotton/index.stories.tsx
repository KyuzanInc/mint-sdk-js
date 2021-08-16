import { action } from '@storybook/addon-actions'
import React from 'react'
import { PrimaryLoadingButton } from '.'

export const Basic: React.VFC = () => {
  return (
    <PrimaryLoadingButton
      isLoading={false}
      label={'button text'}
      onClick={action('onClick')}
    />
  )
}

export const Loading: React.VFC = () => {
  return (
    <PrimaryLoadingButton
      isLoading={true}
      label={'button text'}
      onClick={action('onClick')}
    />
  )
}

export const Disabled: React.VFC = () => {
  return (
    <PrimaryLoadingButton
      isLoading={false}
      label={'button text'}
      onClick={action('onClick')}
      disabled={true}
    />
  )
}

export const Submit: React.VFC = () => {
  return (
    <PrimaryLoadingButton
      isLoading={false}
      label={'button text'}
      onClick={action('onClick')}
    />
  )
}

export default {
  title: 'atoms/LoadingButton',
}
