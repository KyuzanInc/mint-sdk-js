import styled from '@emotion/styled'
import React from 'react'
import { Card } from '../components/atoms/Card'

const Page = () => {
  return (
  <Container>
    <Card title={'NIKE AIR JORDAN 1 MID “HYPER ROYAL”'} onClick={()=>{}}></Card>
  </Container>)
}

export default Page

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 72px;
`
