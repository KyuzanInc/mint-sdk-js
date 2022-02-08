import { NetworkId as APINetworkId } from '../../apiClient/api'

export type NetworkId = typeof APINetworkId[keyof typeof APINetworkId]
