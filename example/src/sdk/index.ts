import { DEMO_FORTMATIC_KEY } from './../constants'
import { MintSDK } from '@kyuzan/mint-sdk-js'

let sdk: MintSDK
export const getSdk = () => {
  if (typeof sdk === 'undefined') {
    sdk = new MintSDK(
      'acf126b7-adbe-4a76-884d-3c95105c2e43',
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
