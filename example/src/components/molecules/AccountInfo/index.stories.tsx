import { action } from '@storybook/addon-actions'
import React from 'react'
import { AccountInfo } from '.'

export const Basic: React.VFC = () => (
  <AccountInfo
    profileUrl={undefined}
    displayName={'timocy jp'}
    bio={`The Louvre after hours A collector & creator of the playful, sophisticated, and exquisite. Believer that art should never be taken too seriously, unless it's David Bowie... that guy is legend.`}
    isShowEditButton={false}
    onEdit={undefined}
    walletAddress={'0x99A00d5430Eb9ee2B8eB9385b72aB17Fb1b15f2B'}
    instagramAccountName={'tra'}
    twitterAccountName={'test'}
    siteUrl={'https://example.com'}
    loading={false}
  />
)

export const Editable: React.VFC = () => (
  <AccountInfo
    profileUrl={undefined}
    displayName={'timocy jp'}
    bio={`The Louvre after hours A collector & creator of the playful, sophisticated, and exquisite. Believer that art should never be taken too seriously, unless it's David Bowie... that guy is legend.`}
    isShowEditButton={true}
    onEdit={action('onEdit')}
    walletAddress={'0x99A00d5430Eb9ee2B8eB9385b72aB17Fb1b15f2B'}
    instagramAccountName={'tra'}
    twitterAccountName={'test'}
    siteUrl={'https://example.com'}
    loading={false}
  />
)

export const Loading: React.VFC = () => (
  <AccountInfo
    profileUrl={undefined}
    displayName={undefined}
    bio={undefined}
    isShowEditButton={true}
    onEdit={action('onEdit')}
    walletAddress={undefined}
    instagramAccountName={undefined}
    twitterAccountName={undefined}
    siteUrl={undefined}
    loading={true}
  />
)

export default {
  title: 'molecules/AccountInfo',
}
