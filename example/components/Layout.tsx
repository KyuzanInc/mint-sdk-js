import React, { ReactNode, useEffect } from 'react'
import { useAppDispatch } from '../redux/getStore'
import { initialWalletActionCreator } from '../redux/wallet'

type Props = {
  children?: ReactNode
}

const Layout = ({ children }: Props) => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(initialWalletActionCreator() as any)
  }, [])
  return (
    <div>
      <header>
        <nav>logo</nav>
      </header>
      {children}
      <footer>
        <hr />
        <span>I'm here to stay (Footer)</span>
      </footer>
    </div>
  )
}

export default Layout
