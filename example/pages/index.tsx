import { useEffect, useState } from 'react'
import { AnnapurnaSDK } from '@kyuzan/annapurna-sdk-js'
import { BigNumber } from '@ethersproject/bignumber'
import styled from '@emotion/styled'
import { Item } from '../components/Item'
import { OwnItem } from '../components/OwnItem'
import { DEMO_ACCESS_KEY, DEMO_FORTMATIC_KEY } from '../constants'

const Page = () => {
  const [sdk, setSdk] = useState<AnnapurnaSDK>()
  const [txStatus, setTxStatus] = useState('')
  const [ownItems, setOwnItems] = useState<JSX.Element[]>([])
  const [bidsItems, setBidsItems] = useState<JSX.Element[]>([])
  const [items, setItems] = useState<JSX.Element[]>([])
  const [walletInfo, setWalletInfo] = useState<{
    address: string
    balance: BigNumber | undefined
  }>({ address: '', balance: undefined })
  useEffect(() => {
    const init = async () => {
      const sdk = await AnnapurnaSDK.initialize(DEMO_ACCESS_KEY, 4, {
        fortmatic: {
          key: DEMO_FORTMATIC_KEY,
        },
      })
      setSdk(sdk)
      if (await sdk.isWalletConnect()) {
        setWalletInfo(await sdk.getWalletInfo())
      }

      const items = await sdk.getItems()
      const itemEls = items.map((item) => {
        return (
          <Item
            onClickBid={async (itemId: string, ether: number) => {
              const txReceipt = await sdk.sendTxBid(itemId, ether)
              setTxStatus(`処理中: ${txReceipt.hash}`)
              try {
                await sdk.waitForTransaction(txReceipt.hash)
                setTxStatus(`成功: ${txReceipt.hash}`)
              } catch (err) {
                setTxStatus(`失敗: ${txReceipt.hash}`)
              }
            }}
            item={item}
            onClickBuy={async (itemId: string) => {
              const txReceipt = await sdk.sendTxBuyItem(itemId)
              setTxStatus(`処理中: ${txReceipt.hash}`)
              try {
                await sdk.waitForTransaction(txReceipt.hash)
                setTxStatus(`成功: ${txReceipt.hash}`)
              } catch (err) {
                setTxStatus(`失敗: ${txReceipt.hash}`)
              }
            }}
          />
        )
      })
      setItems(itemEls)
    }
    init()
  }, [])

  useEffect(() => {
    const fn = async () => {
      if (!sdk) return
      if (!(await sdk.isLoggedIn())) return
      const walletInfo = await sdk.getWalletInfo()
      const itemEls = (
        await sdk.getTokensByAddress(walletInfo.address)
      ).map((token) => <OwnItem item={token} />)
      setOwnItems(itemEls)

      const bidedItems = (
        await sdk.getItemsByBidderAddress(walletInfo.address)
      ).map((i) => {
        return (
          <Item
            onClickBid={async (itemId: string, ether: number) => {
              const txReceipt = await sdk.sendTxBid(itemId, ether)
              setTxStatus(`処理中: ${txReceipt.hash}`)
              try {
                await sdk.waitForTransaction(txReceipt.hash)
                setTxStatus(`成功: ${txReceipt.hash}`)
              } catch (err) {
                setTxStatus(`失敗: ${txReceipt.hash}`)
              }
            }}
            item={i}
            onClickBuy={async (itemId: string) => {
              const txReceipt = await sdk.sendTxBuyItem(itemId)
              setTxStatus(`処理中: ${txReceipt.hash}`)
              try {
                await sdk.waitForTransaction(txReceipt.hash)
                setTxStatus(`成功: ${txReceipt.hash}`)
              } catch (err) {
                setTxStatus(`失敗: ${txReceipt.hash}`)
              }
            }}
          />
        )
      })
      setBidsItems(bidedItems)
    }
    fn()
  }, [sdk, walletInfo.address])
  return (
    <Container>
      {walletInfo.address ? (
        <p>
          address: {walletInfo.address}
          balance: {AnnapurnaSDK.formatEther(walletInfo.balance!)}
        </p>
      ) : (
        <Button
          onClick={async () => {
            await sdk!.connectWallet()
            setWalletInfo(await sdk!.getWalletInfo())
          }}
        >
          Connect
        </Button>
      )}
      <Button
        onClick={async () => {
          sdk!.disconnectWallet()
        }}
      >
        DisConnect
      </Button>
      <h2># On Sale アイテム</h2>
      <p>Tx Status: {txStatus}</p>
      <Items>{items}</Items>
      <h2># 自分のアイテム</h2>
      <Section>{ownItems}</Section>
      <h2># Bid中のアイテム</h2>
      <Section>{bidsItems}</Section>
    </Container>
  )
}

export default Page

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

const Section = styled.div`
  width: 720px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Button = styled.div`
  cursor: pointer;
  padding: 24px 32px;
  border: solid 1px #333;
  margin: 16px 0;
`
