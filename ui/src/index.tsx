import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { store } from './modules/store'
import { router } from './services/router'
import 'decentraland-ui/lib/styles.css'
import './index.css'

render(
  <Provider store={store}>
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
  </Provider>,
  document.getElementById('root')
)
