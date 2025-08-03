import type { FC } from 'react'
import { useState } from 'react'
import { Modal, Close, Field, Loader, Button } from 'decentraland-ui'
import { NavLink } from 'react-router-dom'
import { Props } from './Transfer.types'

const Transfer: FC<Props> = ({ address, balance, isLoadingBalance, isTransferring, transferError, onTransfer }) => {
  const [recipient, setRecipient] = useState('')
  const [recipientError, setRecipientError] = useState('')

  const [amount, setAmount] = useState('')
  const [amountError, setAmountError] = useState('')

  const currentBalance = +(balance || '0')
  const validateForm = () => validateAddress() && validateAmount()

  const validateAddress = () => {
    const trimmedRecipient = recipient.trim()
    if (!trimmedRecipient) {
      setRecipientError('Recipient address is required')
    } else if (!/^0x[a-fA-F0-9]{40}$/.test(trimmedRecipient)) {
      setRecipientError('Invalid Ethereum address format')
    } else if (recipient.toLowerCase() === address?.toLowerCase()) {
      setRecipientError('Cannot transfer to your own address')
    } else {
      setRecipientError('')
      return true
    }
  }

  const validateAmount = () => {
    if (!amount.trim()) return setAmountError('Amount is required')
    const numAmount = +amount
    if (isNaN(numAmount) || numAmount <= 0) {
      setAmountError('Amount must be a positive number')
    } else if (!isLoadingBalance && numAmount > currentBalance) {
      setAmountError('Insufficient balance')
    } else {
      setAmountError('')
      return true
    }
  }

  const send = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    onTransfer(recipient.trim(), amount.trim())
  }

  const setMax = () => {
    setAmount(balance || '0')
    setAmountError('')
  }

  return (
    <Modal
      size="small"
      open={true}
      closeIcon={
        <NavLink to="/">
          <Close />
        </NavLink>
      }
    >
      <Modal.Header className="text-center">Transfer</Modal.Header>

      <Modal.Content>
        <div className="mb-4!">
          <p className="text-center">Send tokens to an account</p>
          <p>
            <strong>Your Balance:</strong>
            {` ${currentBalance} `}
            <strong>DUMMY</strong>
          </p>
        </div>

        <div className="flex gap-4 items-center justify-between">
          <Field
            id="amount"
            type="number"
            label="Amount"
            className="flex-1"
            placeholder="0.0"
            value={amount}
            onChange={e => (setAmount(e.target.value), setAmountError(''))}
            error={!!amountError}
            message={amountError}
            onBlur={validateAmount}
          />

          <Button type="button" size="small" disabled={!balance || isTransferring} onClick={setMax}>
            Max
          </Button>
        </div>

        <Field
          id="recipient"
          type="address"
          label="Address"
          placeholder="0x..."
          value={recipient}
          onChange={e => (setRecipient(e.target.value), setRecipientError(''))}
          error={!!recipientError}
          message={recipientError}
          onBlur={validateAddress}
        />

        {transferError && <p className="text-warn! font-bold">Transfer failed: {transferError}</p>}
      </Modal.Content>

      <Modal.Actions>
        <Button primary onClick={send} loading={isTransferring} disabled={!recipient || !amount || isTransferring || isLoadingBalance}>
          {isTransferring ? <Loader active inline size="tiny" /> : 'Send'}
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default Transfer
