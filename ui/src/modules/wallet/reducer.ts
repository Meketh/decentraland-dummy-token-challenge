import { AnyAction } from 'redux'
import {
  CONNECT_WALLET_REQUEST,
  CONNECT_WALLET_SUCCESS,
  CONNECT_WALLET_FAILURE,
  WALLET_DISCONNECTED,
  LOAD_BALANCE_REQUEST,
  LOAD_BALANCE_SUCCESS,
  LOAD_BALANCE_FAILURE,
  TRANSFER_TOKEN_REQUEST,
  TRANSFER_TOKEN_SUCCESS,
  TRANSFER_TOKEN_FAILURE,
  ConnectWalletSuccessAction,
  ConnectWalletFailureAction,
  LoadBalanceSuccessAction,
  LoadBalanceFailureAction,
  TransferTokenFailureAction
} from './actions'
import { WalletState } from './types'

const INITIAL_STATE: WalletState = {
  address: null,
  isConnecting: false,
  error: null,

  balance: null,
  isLoadingBalance: false,
  balanceError: null,

  isTransferring: false,
  transferError: null
}

export function walletReducer(state: WalletState = INITIAL_STATE, action: AnyAction): WalletState {
  switch (action.type) {
    // Wallet Connection
    case CONNECT_WALLET_REQUEST: {
      return { ...state, isConnecting: true, error: null }
    }
    case CONNECT_WALLET_SUCCESS: {
      const { address } = action.payload as ConnectWalletSuccessAction['payload']
      return { ...state, isConnecting: false, address, error: null }
    }
    case CONNECT_WALLET_FAILURE: {
      const { error } = action.payload as ConnectWalletFailureAction['payload']
      return { ...state, isConnecting: false, error }
    }
    case WALLET_DISCONNECTED: {
      return { ...INITIAL_STATE }
    }

    // Balance
    case LOAD_BALANCE_REQUEST: {
      return { ...state, isLoadingBalance: true, balanceError: null }
    }
    case LOAD_BALANCE_SUCCESS: {
      const { balance } = action.payload as LoadBalanceSuccessAction['payload']
      return { ...state, isLoadingBalance: false, balance, balanceError: null }
    }
    case LOAD_BALANCE_FAILURE: {
      const { error } = action.payload as LoadBalanceFailureAction['payload']
      return { ...state, isLoadingBalance: false, balanceError: error }
    }

    // Transfer
    case TRANSFER_TOKEN_REQUEST: {
      return { ...state, isTransferring: true, transferError: null }
    }
    case TRANSFER_TOKEN_SUCCESS: {
      return { ...state, isTransferring: false, transferError: null }
    }
    case TRANSFER_TOKEN_FAILURE: {
      const { error } = action.payload as TransferTokenFailureAction['payload']
      return { ...state, isTransferring: false, transferError: error }
    }

    default:
      return state
  }
}
