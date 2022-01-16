class BaseError extends Error {
  constructor(e?: string) {
    super(e)
    // ↓この2行を足す
    this.name = new.target.name
    Object.setPrototypeOf(this, new.target.prototype)
  }
}

/**
 * ユーザーのウォレットが接続しているネットワークが正しくない
 * The network connected to the wallet is not correct.
 */
export class WrongNetworkError extends BaseError {}
