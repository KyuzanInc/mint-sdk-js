import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import {
  AnnapurnaSDK,
  BigNumber,
  Item as ItemType,
} from '@kyuzan/annapurna-sdk-js'
import { GetServerSideProps, NextPage } from 'next'
import { Item } from '../components/Item'
import { DEMO_ACCESS_KEY, DEMO_FORTMATIC_KEY } from '../constants'

type Props = {
  itemId: string
}

const Page: NextPage<Props> = ({ itemId }) => {
  const [itemData, setItemData] = useState<ItemType>()
  const [txStatus, setTxStatus] = useState('')
  const [sdk, setSdk] = useState<AnnapurnaSDK>()
  const [logs, setLogs] = useState<React.ReactNode>([])
  const [walletInfo, setWalletInfo] = useState<{
    address: string
    balance: BigNumber | undefined
  }>({ address: '', balance: undefined })
  useEffect(() => {
    const init = async () => {
      const sdk = await AnnapurnaSDK.initialize(
        // 旧で動くのを確認してから
        '4bdaee8f-8e23-4913-9858-7a10dd7be877', // new
        // '35a9d66d-8d2f-43a1-af12-aa976de4c614',
        4,
        {
          fortmatic: {
            key: DEMO_FORTMATIC_KEY,
          },
        },
        {
          backendUrl:
            'http://localhost:5500/annapurna-development/asia-northeast1/',
          // 'https://asia-northeast1-annapurna-development.cloudfunctions.net/',
        }
      )
      setSdk(sdk)
      const item = await sdk.getItemById(itemId)
      setItemData(item)
      const logs = await sdk.getItemLogs(itemId)
      setLogs(
        logs.map((l) => {
          return (
            <div>
              <p>-----</p>
              <p>type: {l.type}</p>
              <p>account: {l.accountAddress}</p>
            </div>
          )
        })
      )
      if (await sdk.isWalletConnect()) {
        setWalletInfo(await sdk.getWalletInfo())
      }
    }
    init()
  }, [])
  const itemEl = itemData && (
    <Item
      onClickWithdraw={async (itemId: string) => {
        const txReceipt = await sdk!.sendTxMakeSuccessfulBid(itemId)
        setTxStatus(`処理中: ${txReceipt.hash}`)
        try {
          await sdk!.waitForTransaction(txReceipt.hash)
          setTxStatus(`成功: ${txReceipt.hash}`)
        } catch (err) {
          setTxStatus(`失敗: ${txReceipt.hash}`)
        }
      }}
      userAddress={walletInfo.address}
      item={itemData}
      onClickBid={async (itemId: string, ether: number) => {
        const txReceipt = await sdk!.sendTxBid(itemId, ether)
        setTxStatus(`処理中: ${txReceipt.hash}`)
        try {
          await sdk!.waitForTransaction(txReceipt.hash)
          setTxStatus(`成功: ${txReceipt.hash}`)
        } catch (err) {
          setTxStatus(`失敗: ${txReceipt.hash}`)
        }
      }}
      onClickBuy={async (itemId: string) => {
        const txReceipt = await sdk!.sendTxBuyItem(itemId)
        setTxStatus(`処理中: ${txReceipt.hash}`)
        try {
          await sdk!.waitForTransaction(txReceipt.hash)
          setTxStatus(`成功: ${txReceipt.hash}`)
        } catch (err) {
          setTxStatus(`失敗: ${txReceipt.hash}`)
        }
      }}
    />
  )
  return (
    <>
      <Container>
        <p>Tx Status: {txStatus}</p>
        <Items>{itemEl}</Items>
        {logs}
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
  margin: 0 auto;
  display: flex;
`
