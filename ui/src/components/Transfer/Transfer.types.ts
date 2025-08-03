import { AnyAction, Dispatch } from 'redux'
import { TransferTokenRequestAction } from '../../modules/wallet/actions'

export type Props = {
  address: string
  balance: string | null
  isLoadingBalance: boolean
  isTransferring: boolean
  transferError: string | null
  onTransfer: (to: string, amount: string) => void
}

export type MapStateProps = Pick<Props, 'address' | 'balance' | 'isLoadingBalance' | 'isTransferring' | 'transferError'>
export type MapDispatchProps = Pick<Props, 'onTransfer'>
export type MapDispatch = Dispatch<TransferTokenRequestAction | AnyAction>
