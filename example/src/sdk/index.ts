import { DEMO_FORTMATIC_KEY, DEMO_ACCESS_KEY } from './../constants'
import { MintSDK } from '@kyuzan/mint-sdk-js'

let sdk: MintSDK | undefined = undefined
export const getSdk = () => {
  if (typeof window === 'undefined') return null

  if (typeof sdk === 'undefined') {
    sdk = new MintSDK(
      'bd81509b-d657-4a36-9fbf-e839b00f03fe',
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
