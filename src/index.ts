import { hoo } from './Hoo'
class AnnapurnaSDK {
  private constructor() {
    console.log('aaaa')
  }

  public initialize() {
    console.log(hoo)

    return new Promise((resolve) => setTimeout(resolve, 2000))
  }
}

export default AnnapurnaSDK
