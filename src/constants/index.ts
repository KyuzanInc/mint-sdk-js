export const BACKEND_URL =
  'https://asia-northeast1-annapurna-production.cloudfunctions.net/'

export const PROFILE_DOMAIN = { name: 'ProfileServices' }
export const PROFILE_TYPES = {
  Profile: [
    { name: 'walletAddress', type: 'string' },
    { name: 'avatarImageId', type: 'string' },
    { name: 'displayName', type: 'string' },
    { name: 'bio', type: 'string' },
    { name: 'twitterAccountName', type: 'string' },
    { name: 'instagramAccountName', type: 'string' },
    { name: 'homepageUrl', type: 'string' },
  ],
}
