import React, { ReactNode } from 'react'
import Link from 'next/link'

type Props = {
  children?: ReactNode
}

const Layout = ({ children }: Props) => {
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
