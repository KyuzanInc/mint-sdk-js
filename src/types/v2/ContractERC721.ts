import { ContractERC721 as APIContractERC721 } from '../../apiClient/api'
import { ChainType } from './ChainType'
import { NetworkId } from './NetworkId'
import { TokenStandardType } from './TokenStandardType'

export type ContractERC721 = Omit<
  APIContractERC721,
  'chainType' | 'networkId' | 'tokenStandardType'
> & {
  chainType: ChainType
  networkId: NetworkId
  tokenStandardType: TokenStandardType
}
