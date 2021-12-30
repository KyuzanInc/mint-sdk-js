import { NetworkId as APINetworkId } from '../../apiClientV2/api'

export type NetworkId = typeof APINetworkId[keyof typeof APINetworkId]
