import { BigNumber } from 'ethers'
import { AnnapurnaSDK } from '.'
// import axios from 'axios'

// jest.mock('axios')

test('should initialize', async () => {
  // AxiosのMock
  const sdk = await AnnapurnaSDK.initialize(
    'test',
    'testToken',
    4,
    {
      fortmatic: { key: 'test' },
    },
    {
      backendUrl: 'http://localhost:5500/annapurna-production/us-central1/',
      jsonRPCUrl: 'http://127.0.0.1:8545/',
    }
  )
  console.log(await sdk.getItemLogs('2'))
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
