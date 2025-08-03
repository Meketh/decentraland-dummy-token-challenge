import type { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { Button, Header, Card } from 'decentraland-ui'
import { Props } from './Wallet.types'

const Wallet: FC<Props> = ({ formattedAddress, isConnected, isConnecting, error, balance, isLoadingBalance, balanceError, onConnect }) => {
  if (!isConnected) {
    return (
      <>
        <Button primary onClick={onConnect} loading={isConnecting}>
          Connect
        </Button>
        {error ? <p className="p-4! text-warn! font-bold">{error}</p> : null}
      </>
    )
  }

  return (
    <Card className="p-4!">
      <Header>Wallet</Header>
      <p className="gap-2 flex">
        <strong>Address:</strong>
        {formattedAddress}
      </p>
      {isLoadingBalance ? (
        <p>Loading balance...</p>
      ) : balanceError ? (
        <p className="text-warn! font-bold">Error loading balance: {balanceError}</p>
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

export default Wallet
