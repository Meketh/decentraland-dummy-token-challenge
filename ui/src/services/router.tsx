import { createBrowserRouter } from 'react-router-dom'
import { App } from '../components/App'
import { Wallet } from '../components/Wallet'
import { Transfer } from '../components/Transfer'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Wallet /> },
      { path: 'transfer', element: <Transfer /> },
      { path: 'pending', element: <div>Pending</div> }
    ]
  }
])
