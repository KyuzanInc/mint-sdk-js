import SDK from '../src'

test('should parse ether', () => {
  const result = SDK.parseEther('3.2')
  expect(result.toString()).toEqual('3200000000000000000')
})
