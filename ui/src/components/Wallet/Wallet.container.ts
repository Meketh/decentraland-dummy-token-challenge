import { connect } from 'react-redux'
import { connectWalletRequest } from '../../modules/wallet/actions'
import {
  getFormattedAddress,
  isConnected,
  isConnecting,
  getError,
  getBalance,
  isLoadingBalance,
  getBalanceError
} from '../../modules/wallet/selectors'
import { RootState } from '../../modules/types'
import { MapDispatch, MapDispatchProps, MapStateProps } from './Wallet.types'
import Wallet from './Wallet'

const mapState = (state: RootState): MapStateProps => ({
  formattedAddress: getFormattedAddress(state),
  isConnected: isConnected(state),
  isConnecting: isConnecting(state),
  error: getError(state),
  balance: getBalance(state),
  isLoadingBalance: isLoadingBalance(state),
  balanceError: getBalanceError(state)
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onConnect: () => dispatch(connectWalletRequest())
})

export default connect(mapState, mapDispatch)(Wallet)
