import { BigNumber } from 'ethers'
import { MintSDK } from '.'
// import axios from 'axios'

// jest.mock('axios')

// TODO: SendTx*系のテスト実施。エラーハンドリングの部分

test('should parse ether', () => {
  const result = MintSDK.parseEther('3.2')
  expect(result.toString()).toEqual('3200000000000000000')
})

test('should format wei', () => {
  const result = MintSDK.formatEther(BigNumber.from(1000000000000000))
  expect(result).toEqual('0.001')
})
