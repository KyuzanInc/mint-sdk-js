export const BACKEND_URL =
  'https://asia-northeast1-mint-v2-production.cloudfunctions.net/'

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

export const GET_SHIPPING_INFO_DOMAIN = {
  name: 'Get Shipping Info',
  version: '1',
}
export const GET_SHIPPING_INFO_TYPES = {
  WalletAddress: [
    {
      name: 'walletAddress',
      type: 'string',
    },
    {
      name: 'requestTimestamp',
      type: 'uint256',
    },
  ],
}
