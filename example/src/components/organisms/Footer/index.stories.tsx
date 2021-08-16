import React from 'react'
import { Footer } from '.'

export const Basic: React.VFC = () => <Footer />

export const AllLink: React.VFC = () => (
  <Footer
    termsOfUse={'dummy'}
    specifiedCommercialCode={'dummy'}
    privacyPolicy={'dummy'}
    FAQ={'dummy'}
  />
)

export default {
  title: 'organism/Footer',
}
