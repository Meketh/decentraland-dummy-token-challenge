import { connect } from 'react-redux'
import { transferTokenRequest } from '../../modules/wallet/actions'
import {
  getAddress,
  getBalance,
  isLoadingBalance,
  isTransferring,
  getTransferError,
} from '../../modules/wallet/selectors'
import { RootState } from '../../modules/types'
import { MapDispatch, MapDispatchProps, MapStateProps } from './Transfer.types'
import Transfer from './Transfer'

const mapState = (state: RootState): MapStateProps => ({
  address: getAddress(state),
  balance: getBalance(state),
  isLoadingBalance: isLoadingBalance(state),
  isTransferring: isTransferring(state),
  transferError: getTransferError(state),
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onTransfer: (to: string, amount: string) => dispatch(transferTokenRequest(to, amount)),
})

export default connect(mapState, mapDispatch)(Transfer)
