import { createBrowserRouter } from 'react-router-dom'
import { App } from '../components/App'
import { Wallet } from '../components/Wallet'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Wallet /> },
      { path: 'transfer', element: <div>Transfer</div> },
      { path: 'pending', element: <div>Pending</div> }
    ]
  }
])
