import { DEMO_FORTMATIC_KEY, DEMO_ACCESS_KEY } from './../constants'
import { MintSDK } from '@kyuzan/mint-sdk-js'

let sdk: MintSDK | undefined = undefined
export const getSdk = () => {
  if (typeof window === 'undefined') return null

  if (typeof sdk === 'undefined') {
    sdk = new MintSDK(
      '4bdaee8f-8e23-4913-9858-7a10dd7be877',
      [4, 80001],
      {
        fortmatic: {
          key: DEMO_FORTMATIC_KEY,
        },
      },
      {
        backendUrl:
          'http://localhost:5500/annapurna-development/asia-northeast1',
      }
    )
  }

  return sdk
}
