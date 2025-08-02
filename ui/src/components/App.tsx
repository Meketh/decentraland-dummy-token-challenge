import type { FC } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { Logo, Center, Page, Footer } from 'decentraland-ui'
import { useWalletAddress } from '../services/wallet'
import './App.css'

export const App: FC = () => {
  const { data: address } = useWalletAddress()
  const isConnected = !!address

  return (
    <>
      <nav>
        <Logo />
        {isConnected ? (
          <>
            <NavLink to="/">Wallet</NavLink>
            <NavLink to="/transfer">Transfer</NavLink>
            <NavLink to="/pending">Pending</NavLink>
          </>
        ) : null}
      </nav>

      <Page>
        <Center>
          <Outlet />
        </Center>
      </Page>
      <Footer />
    </>
  )
}
