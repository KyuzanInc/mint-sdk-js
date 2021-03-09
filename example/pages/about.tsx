import Link from 'next/link'
import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { AnnapurnaSDK } from '@kyuzan/annapurna-sdk-js'

const AboutPage = () => {
  const [sdk, setSdk] = useState<AnnapurnaSDK>()
  useEffect(() => {
    const init = async () => {
      console.log(AnnapurnaSDK.parseEther('1').toString())
      const sdk = await AnnapurnaSDK.initialize(
        'eb29cf8b-e159-4da4-aec1-b550ca36626f',
        4,
        {
          fortmatic: {
            key: 'pk_test_7459BD51DE1FC406',
          },
        }
      )
      setSdk(sdk)
    }
    init()
  }, [])
  return (
    <Layout title="About | Next.js + TypeScript Example">
      <h1>About</h1>
      <p>This is the about page</p>
      <p>
        <Link href="/">
          <a>Go home</a>
        </Link>
      </p>
    </Layout>
  )
}

export default AboutPage
