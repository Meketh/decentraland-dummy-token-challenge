import type { FC } from 'react'
import { useState } from 'react'
import { Button, Header, Card, Field, Input, Form, Loader } from 'decentraland-ui'
import { useWalletAddress, useTokenBalance, useTransferToken } from '../services/wallet'

export const Transfer: FC = () => {
  const { data: address } = useWalletAddress()
  const { data: balance } = useTokenBalance()
  const transferToken = useTransferToken()

  const [recipient, setRecipient] = useState('')
  const [recipientError, setRecipientError] = useState('')

  const [amount, setAmount] = useState('')
  const [amountError, setAmountError] = useState('')

  const currentBalance = parseFloat(balance || '0')
  const validateForm = () => validateAddress() && validateAmount()

  const validateAddress = () => {
    if (!recipient.trim()) {
      setRecipientError('Recipient address is required')
    } else if (!/^0x[a-fA-F0-9]{40}$/.test(recipient.trim())) {
      setRecipientError('Invalid Ethereum address format')
    } else if (recipient.toLowerCase() === address?.toLowerCase()) {
      setRecipientError('Cannot transfer to your own address')
    } else return true
  }

  const validateAmount = () => {
    if (!amount.trim()) {
      return setAmountError('Amount is required')
    }
    const numAmount = parseFloat(amount)
    if (isNaN(numAmount) || numAmount <= 0) {
      setAmountError('Amount must be a positive number')
    } else if (numAmount > currentBalance) {
      setAmountError('Insufficient balance')
    } else return true
  }

  const transfer = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      await transferToken.mutateAsync({ to: recipient.trim(), amount: amount.trim() })
      clear()
    } catch (error) {
      console.error('Transfer failed:', error)
    }
  }

  const clear = () => {
    setRecipient('')
    setRecipientError('')
    setAmount('')
    setAmountError('')
  }

  return (
    <Card className="p-4! w-auto!">
      <Header>Transfer DUMMY Tokens</Header>

      <div className="mb-4!">
        <p>
          <strong>Your Balance:</strong>
          {` ${balance || '0'} DUMMY`}
        </p>
      </div>

      <Form onSubmit={transfer}>
        <Field
          id="recipient"
          label="Recipient Address"
          error={!!recipientError}
          message={recipientError}
          input={
            <Input
              type="text"
              placeholder="0x..."
              value={recipient}
              onChange={e => setRecipient(e.target.value)}
              error={!!recipientError}
              onBlur={validateForm}
            />
          }
        />

        <div className="flex gap-4 w-full items-center">
          <Field
            id="amount"
            label="Amount"
            error={!!amountError}
            message={amountError}
            input={
              <Input
                type="number"
                placeholder="0.0"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                error={!!amountError}
                className="flex-1"
                onBlur={validateForm}
              />
            }
          ></Field>
          <Button type="button" size="small" onClick={() => setAmount(balance || '0')} disabled={!balance || transferToken.isPending}>
            Max
          </Button>
        </div>

        <div className="flex justify-evenly">
          <Button type="submit" primary loading={transferToken.isPending} disabled={!recipient || !amount || transferToken.isPending}>
            {transferToken.isPending ? <Loader active inline size="tiny" /> : 'Transfer'}
          </Button>

          <Button type="button" onClick={clear} disabled={transferToken.isPending}>
            Clear
          </Button>
        </div>

        {transferToken.error && <p className="text-warn! font-bold">Transfer failed: {transferToken.error.message}</p>}
        {transferToken.isSuccess && <p className="text-success! font-bold">Transfer successful! Transaction hash: {transferToken.data}</p>}
      </Form>
    </Card>
  )
}
