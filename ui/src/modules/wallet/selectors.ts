import { createSelector } from 'reselect'
import { RootState } from '../types'

export const getWallet = (state: RootState) => state.wallet

export const getAddress = (state: RootState) => getWallet(state).address || ''
export const getFormattedAddress = createSelector([getAddress], address => address && `${address.slice(0, 6)}...${address.slice(-4)}`)
export const isConnected = createSelector([getAddress], address => !!address)
export const isConnecting = (state: RootState) => getWallet(state).isConnecting
export const getError = (state: RootState) => getWallet(state).error

export const getBalance = (state: RootState) => getWallet(state).balance
export const isLoadingBalance = (state: RootState) => getWallet(state).isLoadingBalance
export const getBalanceError = (state: RootState) => getWallet(state).balanceError

export const isTransferring = (state: RootState) => getWallet(state).isTransferring
export const getTransferError = (state: RootState) => getWallet(state).transferError
