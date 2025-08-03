import { type TransactionResponse, BrowserProvider, Contract, formatUnits, parseUnits } from 'ethers'
import { call, put, takeEvery, select } from 'redux-saga/effects'
import { isErrorWithMessage } from '../utils'
import * as actions from './actions'
import { WindowWithEthereum } from './types'
import { getAddress } from './selectors'
import { router } from '../../services/router'

const TOKEN_ADDRESS = import.meta.env.VITE_TOKEN_ADDRESS
if (!TOKEN_ADDRESS) console.error(`Missing env variable VITE_TOKEN_ADDRESS`)

const TOKEN_ABI = [
  'function symbol() view returns (string)',
  'function balanceOf(address) view returns (uint)',
  'function transfer(address to, uint amount)'
]
type TokenContract = Contract & {
  symbol(): Promise<string>
  balanceOf(address: string): Promise<bigint>
  transfer(to: string, amount: bigint): Promise<TransactionResponse>
}

const { ethereum } = window as unknown as WindowWithEthereum
let provider: BrowserProvider
let token: TokenContract
function* initializeProvider() {
  try {
    if (!ethereum) checkProvider()
    provider = new BrowserProvider(ethereum)
    token = new Contract(TOKEN_ADDRESS, TOKEN_ABI, provider) as TokenContract

    // Check if already connected
    const [address]: string[] = yield call([provider, 'send'], 'eth_accounts', [])
    if (address) yield put(actions.connectWalletSuccess(address))
  } catch (error) {
    yield put(actions.connectWalletFailure(isErrorWithMessage(error) ? error.message : 'Unknown error'))
    console.error('Failed to initialize provider:', error)
  }
}

function checkProvider() {
  if (!provider) throw new Error('Wallet provider missing!')
}

export function* walletSaga() {
  yield takeEvery(actions.CONNECT_WALLET_REQUEST, handleConnectWalletRequest)
  yield takeEvery([actions.CONNECT_WALLET_SUCCESS, actions.TRANSFER_TOKEN_SUCCESS, actions.LOAD_BALANCE_REQUEST], handleLoadBalanceRequest)
  yield takeEvery(actions.TRANSFER_TOKEN_REQUEST, handleTransferTokenRequest)
  yield call(initializeProvider)
}

function* handleConnectWalletRequest() {
  try {
    checkProvider()
    yield call([provider, 'send'], 'eth_requestAccounts', [])

    // Handled by accountsChanged event listener on the store
    // const signer = (yield call([provider, 'getSigner'])) as Awaited<ReturnType<typeof provider.getSigner>>
    // const address = (yield call([signer, 'getAddress'])) as Awaited<ReturnType<typeof signer.getAddress>>
    // yield put(actions.connectWalletSuccess(address))
  } catch (error) {
    yield put(actions.connectWalletFailure(isErrorWithMessage(error) ? error.message : 'Unknown error'))
  }
}

function* handleLoadBalanceRequest() {
  try {
    checkProvider()
    const address: string = yield select(getAddress)
    if (!address) throw new Error('Wallet not connected')

    const balance = (yield call([token, 'balanceOf'], address)) as Awaited<ReturnType<typeof token.balanceOf>>

    yield put(actions.loadBalanceSuccess(formatUnits(balance, 4)))
  } catch (error) {
    yield put(actions.loadBalanceFailure(isErrorWithMessage(error) ? error.message : 'Failed to load balance'))
  }
}

function* handleTransferTokenRequest({ payload: { to, amount } }: actions.TransferTokenRequestAction) {
  try {
    checkProvider()
    const address: string = yield select(getAddress)
    if (!address) throw new Error('Wallet not connected')

    const signer = (yield call([provider, 'getSigner'])) as Awaited<ReturnType<typeof provider.getSigner>>
    const tokenWithSigner = token.connect(signer) as TokenContract

    const tx = (yield call([tokenWithSigner, 'transfer'], to, parseUnits(amount, 4))) as Awaited<
      ReturnType<typeof tokenWithSigner.transfer>
    >
    yield call([tx, 'wait'])

    yield put(actions.transferTokenSuccess())
    router.navigate('/')
  } catch (error) {
    let reason = isErrorWithMessage(error) ? error.message : 'Transfer failed'
    if (reason.includes('User denied transaction signature')) reason = 'User denied transaction signature'
    yield put(actions.transferTokenFailure(reason))
  }
}
