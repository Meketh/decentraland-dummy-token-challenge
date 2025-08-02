import type { FC } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { Logo, Center, Page, Footer } from 'decentraland-ui'
import { useWalletAddress } from '../services/wallet'

export const App: FC = () => {
  const { data: address } = useWalletAddress()
  const isConnected = !!address

  return (
    <>
      <nav className="p-4! flex! items-center gap-8  [&_a]:text-inactive! [&_a.active]:text-active!">
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
