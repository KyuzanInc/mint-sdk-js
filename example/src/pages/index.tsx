import styled from '@emotion/styled'
import React from 'react'
import { Card } from '../components/atoms/Card'
import { ActiveCard } from '../components/organisms/Card/ActiveCard'
import { EndedCard } from '../components/organisms/Card/EndedCard'

const Page = () => {
  return (
  <Container>
    <Card title={'NIKE AIR JORDAN 1 MID “HYPER ROYAL”'} onClick={()=>{}}></Card>
    <ActiveCard title={'NIKE AIR JORDAN 1 MID “HYPER ROYAL”'} onClick={()=>{}} />
    <EndedCard title={'NIKE AIR JORDAN 1 MID “HYPER ROYAL”'} onClick={()=>{}} />
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
  padding-top: 72px;
  overflow-y: scroll;
`
