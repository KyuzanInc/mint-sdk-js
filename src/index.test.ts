import { BigNumber } from 'ethers'
import { AnnapurnaSDK } from '.'
// import axios from 'axios'

// jest.mock('axios')

test('should initialize', async () => {
  // AxiosのMock
  const sdk = await AnnapurnaSDK.initialize(
    'testToken',
    4,
    {
      fortmatic: { key: 'pk_test_7459BD51DE1FC406' },
    },
    {
      backendUrl: 'http://localhost:5500/annapurna-production/us-central1/',
      jsonRPCUrl: 'http://127.0.0.1:8545/',
    }
  )
  console.log(
    await sdk.getItemsByBidderAddress(
      '0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec'
    )
  )
  expect(0).toEqual(0)
})

test('should parse ether', () => {
  const result = AnnapurnaSDK.parseEther('3.2')
  expect(result.toString()).toEqual('3200000000000000000')
})

test('should format wei', () => {
  const result = AnnapurnaSDK.formatEther(BigNumber.from(1000000000000000))
  expect(result).toEqual('0.001')
})
