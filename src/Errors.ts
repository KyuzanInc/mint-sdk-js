class BaseError extends Error {
  constructor(e?: string) {
    super(e)
    // ↓この2行を足す
    this.name = new.target.name
    Object.setPrototypeOf(this, new.target.prototype)
  }
}

/**
 * ネットワークが正しくない
 */
export class WrongNetworkError extends BaseError {}
