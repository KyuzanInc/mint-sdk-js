import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import React from 'react'

const bounceTransition = {
  y: {
    duration: 1,
    yoyo: Infinity,
    ease: 'easeIn',
  },
  backgroundColor: {
    duration: 0,
    yoyo: Infinity,
    ease: 'easeOut',
    repeatDelay: 1,
  },
}

// const springType = {
//   type: 'spring',
//   bounce: 0.25,
// }

export const SuccessAnimation: React.VFC = () => {
  return (
    <Container>
      <Ball
        transition={bounceTransition}
        animate={{
          y: ['0em', '12.8em'],
          //backgroundColor: ["#9b59b6", "#f1c40f"],
        }}
      />
    </Container>
  )
}

const Ball = styled(motion.div)`
  width: 4em;
  height: 4em;
  border-radius: 50%;
  background-color: #00cec9;
  border: 2px solid #252525;
`

const Container = styled.div`
  align-items: center;
  justify-content: space-around;
  padding: 44px 42px;
`
