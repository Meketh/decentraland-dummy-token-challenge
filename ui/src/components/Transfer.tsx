import type { FC } from 'react'
import { useState } from 'react'
import { Modal, Close, Field, Loader, Button } from 'decentraland-ui'
import { useWalletAddress, useTokenBalance, useTransferToken } from '../services/wallet'
import { NavLink } from 'react-router-dom'
import { router } from '../services/router'

export const Transfer: FC = () => {
  const { data: address } = useWalletAddress()
  const { data: balance, isLoading: isLoadingBalance } = useTokenBalance()
  const transferToken = useTransferToken()

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

  const send = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      await transferToken.mutateAsync({ to: recipient.trim(), amount: amount.trim() })
      router.navigate('/')
    } catch (error) {
      console.error('Transfer failed:', error)
    }
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
            {` ${balance || '0'} DUMMY`}
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

          <Button type="button" size="small" disabled={!balance || transferToken.isPending} onClick={setMax}>
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
      </Modal.Content>

      <Modal.Actions>
        <Button
          primary
          onClick={send}
          loading={transferToken.isPending}
          disabled={!recipient || !amount || transferToken.isPending || isLoadingBalance}
        >
          {transferToken.isPending ? <Loader active inline size="tiny" /> : 'Send'}
        </Button>
      </Modal.Actions>
    </Modal>
  )
}
// {transferToken.error && <p className="text-warn! font-bold">Transfer failed: {transferToken.error.message}</p>}
// {transferToken.isSuccess && <p className="text-success! font-bold">Transfer successful! Transaction hash: {transferToken.data}</p>}
