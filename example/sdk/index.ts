import { DEMO_ACCESS_KEY, DEMO_FORTMATIC_KEY } from './../constants'
import { AnnapurnaSDK } from '@kyuzan/annapurna-sdk-js'
export const getSdk = () => {
  if (typeof window === 'undefined') return null
  return new AnnapurnaSDK(DEMO_ACCESS_KEY, [4], {
    fortmatic: {
      key: DEMO_FORTMATIC_KEY,
    },
  })
}
