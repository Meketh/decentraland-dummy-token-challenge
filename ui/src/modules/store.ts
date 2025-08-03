import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import { reducer } from './reducer'
import { sagas } from './sagas'
import { connectWalletSuccess, walletDisconnected } from './wallet/actions'
import { WindowWithEthereum } from './wallet/types'

const sagaMiddleware = createSagaMiddleware()
const loggerMiddleware = createLogger({ collapsed: () => true })
const middleware = applyMiddleware(sagaMiddleware, loggerMiddleware)

const store = createStore(reducer, middleware)
sagaMiddleware.run(sagas)
export { store }

const { ethereum } = window as unknown as WindowWithEthereum
if (ethereum) {
  ethereum.removeAllListeners?.('accountsChanged')
  ethereum.on('accountsChanged', ([address]) => store.dispatch(address ? connectWalletSuccess(address) : walletDisconnected()))
}
