import React from 'react'
import { action } from '@storybook/addon-actions'
import { Presentation } from './presentation'

export const Basic: React.VFC = () => (
  <Presentation
    onSubmit={action('onSubmit')}
    onSelectImg={action('onSelectImg')}
    submitting={false}
    uploadingImg={false}
    loading={false}
    avatarImgUrl={''}
    displayName={''}
    bio={''}
    twitterAccountName={''}
    instagramAccountName={''}
    homepageUrl={''}
  />
)

export const Loading: React.VFC = () => (
  <Presentation
    onSubmit={action('onSubmit')}
    onSelectImg={action('onSelectImg')}
    submitting={false}
    uploadingImg={false}
    loading={true}
    avatarImgUrl={''}
    displayName={''}
    bio={''}
    twitterAccountName={''}
    instagramAccountName={''}
    homepageUrl={''}
  />
)

export default {
  title: 'organism/MyPageEditAccountInfo',
}
