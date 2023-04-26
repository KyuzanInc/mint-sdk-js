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
export const PROFILE_TYPES_WITH_EMAIL = {
  Profile: [
    { name: 'walletAddress', type: 'string' },
    { name: 'avatarImageId', type: 'string' },
    { name: 'displayName', type: 'string' },
    { name: 'bio', type: 'string' },
    { name: 'twitterAccountName', type: 'string' },
    { name: 'instagramAccountName', type: 'string' },
    { name: 'homepageUrl', type: 'string' },
    { name: 'emailAddress', type: 'string' },
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

export const REGISTER_WALLET_DOMAIN = {
  name: 'Register Wallet',
  version: '1',
}
export const REGISTER_WALLET_TYPES = {
  WalletAddress: [
    {
      name: 'walletAddress',
      type: 'string',
    },
    {
      name: 'walletId',
      type: 'string',
    },
    {
      name: 'requestTimestamp',
      type: 'uint256',
    },
  ],
}

export const REGISTER_SHIPPING_INFO_DOMAIN = {
  name: 'Register Shipping Info',
  version: '1',
}
export const REGISTER_SHIPPING_INFO_TYPES = {
  ShippingInformation: [
    {
      name: 'address1',
      type: 'string',
    },
    {
      name: 'firstName',
      type: 'string',
    },
    {
      name: 'lastName',
      type: 'string',
    },
    {
      name: 'city',
      type: 'string',
    },
    {
      name: 'state',
      type: 'string',
    },
    {
      name: 'email',
      type: 'string',
    },
    {
      name: 'postalCode',
      type: 'string',
    },
    {
      name: 'phoneNumber',
      type: 'string',
    },
    {
      name: 'country',
      type: 'string',
    },
    {
      name: 'address2',
      type: 'string',
    },
    {
      name: 'address3',
      type: 'string',
    },
    {
      name: 'requestTimestamp',
      type: 'uint256',
    },
  ],
}
