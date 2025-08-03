import { AnyAction, Dispatch } from 'redux'
import { ConnectWalletRequestAction } from '../../modules/wallet/actions'

export type Props = {
  formattedAddress: string
  isConnected: boolean
  isConnecting: boolean
  error: string | null
  balance: string | null
  isLoadingBalance: boolean
  balanceError: string | null
  onConnect: () => void
}

export type MapStateProps = Pick<
  Props,
  'formattedAddress' | 'isConnected' | 'isConnecting' | 'error' | 'balance' | 'isLoadingBalance' | 'balanceError'
>
export type MapDispatchProps = Pick<Props, 'onConnect'>
export type MapDispatch = Dispatch<ConnectWalletRequestAction | AnyAction>
