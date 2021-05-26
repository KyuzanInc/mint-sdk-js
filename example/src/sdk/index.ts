import { DEMO_FORTMATIC_KEY } from './../constants'
import { MintSDK } from '@kyuzan/mint-sdk-js'

let sdk: MintSDK | undefined = undefined
export const getSdk = () => {
  if (typeof window === 'undefined') return null

  if (typeof sdk === 'undefined') {
    sdk = new MintSDK('d3fae7e8-1f5f-4c36-b774-03c082f54b7c', [4, 80001], {
      fortmatic: {
        key: DEMO_FORTMATIC_KEY,
      },
    })
  }

  return sdk
}
