import { DEMO_ACCESS_KEY, DEMO_FORTMATIC_KEY } from './../constants'
import { AnnapurnaSDK } from '@kyuzan/annapurna-sdk-js'

let sdk: AnnapurnaSDK | undefined = undefined
export const getSdk = () => {
  if (typeof window === 'undefined') return null

  if (typeof sdk === 'undefined') {
    sdk = new AnnapurnaSDK(DEMO_ACCESS_KEY, [4], {
      fortmatic: {
        key: DEMO_FORTMATIC_KEY,
      },
    })
  }

  return sdk
}
