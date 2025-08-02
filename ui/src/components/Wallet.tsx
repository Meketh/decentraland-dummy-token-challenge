import type { FC } from 'react'
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
  )
}
