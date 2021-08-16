import React from 'react'
import { NextPage } from 'next'
import { MyPageEditAccountInfo } from '../../../components/organisms/MyPageEditAccountInfo'
import styled from '@emotion/styled'

const Page: NextPage = () => {
  return (
    <Container>
      <MyPageEditAccountInfo />
    </Container>
  )
}

export default Page

const Container = styled.div`
  padding: 72px;
`
