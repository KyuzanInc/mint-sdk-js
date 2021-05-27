import { DEMO_FORTMATIC_KEY, DEMO_ACCESS_KEY } from './../constants'
import { MintSDK } from '@kyuzan/mint-sdk-js'

let sdk: MintSDK | undefined = undefined
export const getSdk = () => {
  if (typeof window === 'undefined') return null

  if (typeof sdk === 'undefined') {
    sdk = new MintSDK(DEMO_ACCESS_KEY, [4, 80001], {
      fortmatic: {
        key: DEMO_FORTMATIC_KEY,
      },
    })
  }

  return sdk
}
