import type { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { Button, Header, Card } from 'decentraland-ui'
import { useConnectWallet, useWalletAddress, useTokenBalance } from '../services/wallet'

export const Wallet: FC = () => {
  const connectWallet = useConnectWallet()
  const { data: address } = useWalletAddress()
  const { data: balance, isLoading: isLoadingBalance } = useTokenBalance()
  const isConnected = !!address

  if (!isConnected) {
    return (
      <>
        <Button primary onClick={() => connectWallet.mutate()} loading={connectWallet.isPending}>
          Connect
        </Button>
        {connectWallet.error ? <p className="p-4! text-warn! font-bold">{connectWallet.error.message}</p> : null}
      </>
    )
  }

  return (
    <Card className="p-4!">
      <Header>Wallet</Header>
      <p className="gap-2 flex">
        <strong>Address:</strong>
        {`${address.slice(0, 6)}...${address.slice(-4)}`}
      </p>
      {isLoadingBalance ? (
        <p>Loading balance...</p>
      ) : (
        <p className="gap-2 flex uppercase">
          <strong>Balance:</strong>
          {balance}
          <strong>DUMMY</strong>
          <NavLink to="transfer">Transfer</NavLink>
        </p>
      )}
    </Card>
  )
}
