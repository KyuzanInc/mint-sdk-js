import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { Header } from '../../components/Header'
import { AnnapurnaSDK } from '@kyuzan/annapurna-sdk-js'
import isBefore from 'date-fns/isBefore'
import isAfter from 'date-fns/isAfter'
import { GetServerSideProps, NextPage } from 'next'
import { Item } from '../components/Item'

type Props = {
  itemId: string
}

const Page: NextPage<Props> = ({ itemId }) => {
  const [items, setItems] = useState([])
  const [value, setValue] = useState([])
  useEffect(async () => {
    const sdk = await AnnapurnaSDK.initialize(
      'eb29cf8b-e159-4da4-aec1-b550ca36626f',
      4,
      {
        fortmatic: {
          key: 'pk_test_7459BD51DE1FC406',
        },
      }
    )

    const item = await sdk.getItemById(itemId)
    const isFixedPrice = item.tradeType === 'fixedPrice'
    const isBought = isFixedPrice && item.buyerAddress!.length !== 0
    const isBeforeAuction = isBefore(new Date(), item.startAt as Date)
    const isAfterAuction = isAfter(new Date(), item.endAt as Date)
    const onAuction = !isBeforeAuction && !isAfterAuction
    const currentBidderAddress = item.currentBidderAddress!
    const logs = await sdk.getItemLogs(itemId)
    console.log(logs)

    const logEls = logs.map((l) => {
      return (
        <div>
          <p>-----</p>
          <p>type: {l.type}</p>
          <p>account: {l.accountAddress}</p>
        </div>
      )
    })
    setItems(<Item item={item} />)
  }, [])
  return (
    <>
      <Header />
      <Container>
        <Items>{items}</Items>
      </Container>
    </>
  )
}

export default Page

export const getServerSideProps: GetServerSideProps<
  Props,
  { itemId: string }
> = async (req) => {
  return {
    props: {
      itemId: req.params!.itemId,
    },
  }
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Items = styled.div`
  width: 720px;
  margin: 0 auto;
  display: flex;
`
