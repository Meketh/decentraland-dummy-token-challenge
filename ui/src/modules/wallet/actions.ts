// Connect Wallet
export const CONNECT_WALLET_REQUEST = '[Request] Connect Wallet'
export const CONNECT_WALLET_SUCCESS = '[Success] Connect Wallet'
export const CONNECT_WALLET_FAILURE = '[Failure] Connect Wallet'
export const WALLET_DISCONNECTED = 'Wallet Disconnected'

// Load Balance
export const LOAD_BALANCE_REQUEST = '[Request] Load Balance'
export const LOAD_BALANCE_SUCCESS = '[Success] Load Balance'
export const LOAD_BALANCE_FAILURE = '[Failure] Load Balance'

// Transfer Token
export const TRANSFER_TOKEN_REQUEST = '[Request] Transfer Token'
export const TRANSFER_TOKEN_SUCCESS = '[Success] Transfer Token'
export const TRANSFER_TOKEN_FAILURE = '[Failure] Transfer Token'

// Connect Wallet Actions
export function connectWalletRequest() {
  return { type: CONNECT_WALLET_REQUEST, payload: {} }
}

export function connectWalletSuccess(address: string) {
  return { type: CONNECT_WALLET_SUCCESS, payload: { address } }
}

export function connectWalletFailure(error: string) {
  return { type: CONNECT_WALLET_FAILURE, payload: { error } }
}

export function walletDisconnected() {
  return { type: WALLET_DISCONNECTED, payload: {} }
}

// Load Balance Actions
export function loadBalanceRequest() {
  return { type: LOAD_BALANCE_REQUEST, payload: {} }
}

export function loadBalanceSuccess(balance: string) {
  return { type: LOAD_BALANCE_SUCCESS, payload: { balance } }
}

export function loadBalanceFailure(error: string) {
  return { type: LOAD_BALANCE_FAILURE, payload: { error } }
}

// Transfer Token Actions
export function transferTokenRequest(to: string, amount: string) {
  return { type: TRANSFER_TOKEN_REQUEST, payload: { to, amount } }
}

export function transferTokenSuccess() {
  return { type: TRANSFER_TOKEN_SUCCESS, payload: {} }
}

export function transferTokenFailure(error: string) {
  return { type: TRANSFER_TOKEN_FAILURE, payload: { error } }
}

// Action Types
export type ConnectWalletRequestAction = ReturnType<typeof connectWalletRequest>
export type ConnectWalletSuccessAction = ReturnType<typeof connectWalletSuccess>
export type ConnectWalletFailureAction = ReturnType<typeof connectWalletFailure>
export type WalletDisconnectedAction = ReturnType<typeof walletDisconnected>

export type LoadBalanceRequestAction = ReturnType<typeof loadBalanceRequest>
export type LoadBalanceSuccessAction = ReturnType<typeof loadBalanceSuccess>
export type LoadBalanceFailureAction = ReturnType<typeof loadBalanceFailure>

export type TransferTokenRequestAction = ReturnType<typeof transferTokenRequest>
export type TransferTokenSuccessAction = ReturnType<typeof transferTokenSuccess>
export type TransferTokenFailureAction = ReturnType<typeof transferTokenFailure>
