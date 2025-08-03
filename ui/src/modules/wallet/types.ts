import type { Eip1193Compatible } from 'web3'

export type WalletState = {
  address: string | null
  isConnecting: boolean
  error: string | null

  balance: string | null
  isLoadingBalance: boolean
  balanceError: string | null

  isTransferring: boolean
  transferError: string | null
}

export type WindowWithEthereum = Window & {
  ethereum: Eip1193Compatible
}
