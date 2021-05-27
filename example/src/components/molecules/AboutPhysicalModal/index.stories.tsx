import { action } from '@storybook/addon-actions'
import React from 'react'
import { AboutPhysicalModal } from '.'

export const Basic: React.VFC = () => (
  <AboutPhysicalModal isOpen={true} closeModal={action('close')} />
)

export default {
  title: 'molecules/AboutPhysicalModal',
}
