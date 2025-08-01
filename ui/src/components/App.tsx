import React from 'react'
import { Button, Card, Center, Footer, Header, Navbar, Page } from 'decentraland-ui'
import { useConnectWallet, useWalletAddress, useTokenBalance } from '../hooks/useWallet'
import './App.css'

export const App: React.FC = () => {
  const connectWallet = useConnectWallet()
  const { data: address } = useWalletAddress()
  const { data: balance, isLoading: isLoadingBalance } = useTokenBalance()
  const isConnected = !!address

  return (
    <>
      <Navbar activePage="Wallet" />
      <Page className="App">
        <Center>
          {!isConnected ? (
            <>
              <Button primary onClick={() => connectWallet.mutate()} loading={connectWallet.isPending}>
                Connect
              </Button>
              {connectWallet.error ? <p className="error">{connectWallet.error.message}</p> : null}
            </>
          ) : (
            <Card>
              <Header>Wallet</Header>
              <p>
                <strong>Address:</strong>
                {` ${address.slice(0, 6)}...${address.slice(-4)}`}
              </p>
              {isLoadingBalance ? (
                <p>Loading balance...</p>
              ) : balance ? (
                <p>
                  <strong>Balance:</strong>
                  {` ${balance} `}
                  <strong>DUMMY</strong>
                </p>
              ) : null}
            </Card>
          )}
        </Center>
      </Page>
      <Footer />
    </>
  )
}
