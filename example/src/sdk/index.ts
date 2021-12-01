import { MintSDK } from '@kyuzan/mint-sdk-js'

let sdk: MintSDK | undefined = undefined
export const getSdk = () => {
  if (typeof sdk === 'undefined') {
    sdk = new MintSDK(
      process.env.NEXT_PUBLIC_MINT_SDK_KEY as string,
      {
        fortmatic: {
          key: process.env.NEXT_PUBLIC_MINT_FORTMATIC_KEY as string,
        },
      },
      {
        backendUrl: process.env.NEXT_PUBLIC_MINT_BACKEND_URL as string,
      }
    )
  }

  return sdk
}
