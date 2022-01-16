/**
 *
 */
export const itemsPhysicalOrderStatusList = [
  /**
   * Awaiting input from enduser about shipping info
   *  エンドユーザーからの住所登録待ち
   */
  'shippingInfoIsBlank',
  /**
   * Awaiting action from MINT team.
   * Mint管理者側の配送アクション待ち
   */
  'wip', // Mint管理者側の配送アクション待ち
  /**
   * Shipped
   * 出荷済み
   */
  'shipped',
] as const
export type ItemsPhysicalOrderStatus =
  typeof itemsPhysicalOrderStatusList[number]
