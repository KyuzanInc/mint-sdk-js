class Hoo {
  constructor() {
    console.log('aaaa')
  }
}

export const hoo = '1'
;(() => {
  console.log(hoo)
})()

export default Hoo
