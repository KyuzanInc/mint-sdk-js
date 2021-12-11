import styled from '@emotion/styled'
import React from 'react'
import { LiveAuctionList } from '../components/organisms/AuctionList/active'
import { LoadingList } from '../components/organisms/AuctionList/loading'
import { useAppSelector, wrapper } from '../redux/getStore'
import { getItemsActionCreator } from '../redux/items'
import { color, media } from '../style'
import CommonMeta from '../components/atoms/CommonMeta'
import { getSdk } from '../sdk'
import { Stripe, StripeElements } from '@kyuzan/mint-sdk-js'

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const host = context.req.headers.host
    const baseUrl = `https://${host}`
    const currentPath = context.req.url ?? ''
    await context.store.dispatch(getItemsActionCreator() as any)
    return {
      props: {
        baseUrl,
        currentPath,
      },
    }
  }
)

const Page = ({
  baseUrl,
  currentPath,
}: {
  baseUrl: string
  currentPath: string
}) => {
  const items = useAppSelector((state) => {
    return state.app.items.data
  })

  const waitingItems = useAppSelector((state) => {
    return state.app.items.meta.waitingItemAction
  })

  const [stripeInstance, setStripeInstance] = React.useState<null | Stripe>(null)
  const [stripeElements, setStripeElements] = React.useState<null | StripeElements>(null)
  return (
    <Container>
      <CommonMeta
        url={`${currentPath}/${baseUrl}`}
        title={'トップ'}
        ogpImagePath={`${baseUrl}/images/ogp/ogp.png`}
      />
      <button onClick={async () => {
        const sdk = getSdk()
        const { paymentIntentClientSecret, stripe } = await sdk.createStripePaymentIntent('HapHy1gIKF22aIJC8PXx')
        setStripeInstance(stripe)
        const appearance = {
          theme: 'stripe',
        } as const
        const elements = stripe!.elements({ appearance, clientSecret: paymentIntentClientSecret });
        setStripeElements(elements)
        const paymentElement = elements!.create("payment");
        paymentElement.mount("#payment-element");

      }}>Buy Credit Card</button>
      <form id="payment-form" onSubmit={async () => {
        console.log('')
          const { error } = await stripeInstance!.confirmPayment({
            elements: stripeElements!,
            confirmParams: {
              // Make sure to change this to your payment completion page
              return_url: "http://localhost:3000/",
            },
          });
          console.error(error)
      }}>
        <div id="payment-element">
        </div>
        <button id="submit">
          <div className="spinner hidden" id="spinner"></div>
          <span id="button-text">Pay now</span>
        </button>
        <div id="payment-message" className="hidden"></div>
      </form>
      <InnerContainer>
        {waitingItems && <LoadingList />}
        {!waitingItems && <LiveAuctionList items={items.live} />}
        {/* {!waitingItems && <EndedAuctionList items={[]} />} */}
      </InnerContainer>
    </Container>
  )
}

export default Page

const Container = styled.div`
  background: ${color.background.bague};
  max-width: 840px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 144px 0 0 0;
  margin: auto;
  ${media.mdsp`
    padding: 144px 16px 0;
  `}
`

const InnerContainer = styled.div`
  width: 100%;
  min-height: 100vh;
`
