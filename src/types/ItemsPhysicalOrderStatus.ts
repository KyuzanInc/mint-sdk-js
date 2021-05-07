/**
 *
 */
export const itemsPhysicalOrderStatusList = [
  'addressIsBlank', // エンドユーザーからの住所登録待ち
  'wip', // Mint管理者側の配送アクション待ち
  'shipped', // 出荷済み
] as const
export type ItemsPhysicalOrderStatus = typeof itemsPhysicalOrderStatusList[number]
